import React from 'react';
import axios from 'axios'
import update from 'immutability-helper'

class ToDoList extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      newItem: '',
      tasks: []
    };
  }

  getTask(){
    axios.get('http://localhost:3000/tasks')
    .then(response => {
      for (let i = 0; i < response.data.length; i++) {
        this.state.tasks.push({id: response.data[i].id, title: response.data[i].title, done: response.data[i].done});
      }
      this.setState({tasks: this.state.tasks});
    });
  }

  componentDidMount() {
   this.getTask();
  }
 
  createTask = (e) => {
    console.log("Title: "+ this.state.newItem);

    axios.post('http://localhost:3000/tasks',  {title: this.state.newItem, done: false})
    .then(response => {
      const tasks = update(this.state.tasks, {
        $splice: [[0, 0, response.data]]
      })
      this.setState({
        tasks: tasks,
       newItem: ''
      })
    })
    .catch(error => console.log(error))   
  }
 
  handleChange = (e) => {
    this.setState({newItem: e.target.value});
  }

  updateTask = (e, id) => {
    var checked = e.target.checked;
    axios.put(`http://localhost:3000/tasks/${id}`, {task: {done: checked}})
    .then(response => {
      const taskIndex = this.state.tasks.findIndex(x => x.id === response.data.id)
      const tasks = update(this.state.tasks, {[taskIndex]: {$set: response.data}
      })
      this.setState({
        tasks: tasks
      })
    })
    .catch(error => console.log(error))   

    this.changeButtonColor(id, checked);
  }

  changeButtonColor(id,checked){   
    var element = document.getElementById(id);
    if(checked){
    element.classList.remove("btn-secondary")
    element.classList.add("btn-danger");
    }
    else if (!checked) {
      element.classList.remove("btn-danger")
      element.classList.add("btn-secondary");
    }
  }

  deleteTask = (id) => {
    axios.delete(`http://localhost:3000/tasks/${id}`)
    .then(response => {
      const taskIndex = this.state.tasks.findIndex(x => x.id === id)
      const tasks = update(this.state.tasks, {
        $splice: [[taskIndex, 1]]
      })
      this.setState({
        tasks: tasks
      })
    })
    .catch(error => console.log(error))
  }

	render(){
  
		return  (
      <div className="row justify-content-center">
        <div className="row justify-content-center input-group mb-3">
          <form className="col-12" onSubmit={this.createTask}>
            <div className="input-group mb-3">
              <input  
                type="text" name="fname" className="form-control" 
                placeholder="Type item here"  
                aria-describedby="button-addon2"  
                value={this.state.newItem}
                onChange={this.handleChange} />
                <div className="input-group-append">
                  <input type="submit" value="Submit" id="taskAddBtn" className="btn btn-outline-secondary"/>  
                </div> 
            </div>  
          </form>
        </div>
        <div className ="row justify-content-center">
          <ul className="p-4">
            {this.state.tasks.map(item => {
              return (
                <li className="row align-items-start" key={item.id}>
                  <div className = " d-flex justify-content-start">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                         <input type="checkbox" onChange={(e) => this.updateTask(e, item.id)} checked={item.done}/>
                        </div>
                      </div>
                      <input type="text" className="form-control" aria-label="Text input with checkbox" value={item.title}/>
                    </div>    
                    <button className="btn btn-secondary mb-3" onClick={(e) => this.deleteTask(item.id)} id={item.id}>X</button>
                  </div> 
                </li>     
              );
            })}
          </ul>
        </div>        
      </div>      
		);
	}
}

export default ToDoList