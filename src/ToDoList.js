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
    //this.deleteTask = this.deleteTask.bind(this);
    //this.getTask = this.getTask.bind(this);
  }
  
  /*
  changeCheckboxColor(id){   
    var element = document.getElementById(id);
    if(element.classList.contains("btn-secondary")){
    element.classList.remove("btn-secondary")
    element.classList.add("btn-danger");
    }
    else if (element.classList.contains("btn-danger")) {
      element.classList.remove("btn-danger")
      element.classList.add("btn-secondary");
    }
  }
  */

  getTask(){
    axios.get('http://localhost:3000/api/v1/tasks')
    /*
    .then(response => {
      this.setState({tasks: response.data})
    })
    .catch(error => console.log(error))
    console.log(this.state.tasks[0]);
    
    .then(function (response) {
    // handle success
      console.log(response);
     // this.state.tasks=response.data;
      this.setState({tasks: this.state.tasks});
      console.log(this.state.tasks[0]);
      

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
      */
    .then(response => {
      for (let i = 0; i < response.data.length; i++) {
        this.state.tasks.push({id: response.data[i].id, title: response.data[i].title, checked: response.data[i].checked});
        //console.log("task: "+response.data[i].id+" "+response.data[i].title+" "+response.data[i].checked);
        //console.log("test: "+this.state.tasks[i].id);
        console.log("test: "+JSON.stringify(this.state.tasks[i]));
      }
      this.setState({tasks: this.state.tasks});
    });
  }

  componentDidMount() {
   this.getTask();
  }
 // componentWillMount() {
 //  this.getTask();
 // }

  createTask = (e) => {
    console.log("Title: "+ this.state.newItem);
    axios.post('http://localhost:3000/api/v1/tasks', {task: this.state.newItem})
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
    axios.put(`http://localhost:3000/api/v1/tasks/${id}`, {task: {checked: e.target.checked}})
    .then(response => {
      const taskIndex = this.state.tasks.findIndex(x => x.id === response.data.id)
      const tasks = update(this.state.tasks, {
        [taskIndex]: {$set: response.data}
      })
      this.setState({
        tasks: tasks
      })
    })
    .catch(error => console.log(error))      
  }

  deleteTask = (id) => {
    axios.delete(`http://localhost:3000/api/v1/tasks/${id}`)
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
                <li className="row align-items-start" key={this.item.id}>
                  <div className = " d-flex justify-content-start">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                         <input type="checkbox" onChange={(e) => this.updateTask(e, item.id)} checked={item.checked}/>
                        </div>
                      </div>
                      <input type="text" className="form-control" aria-label="Text input with checkbox" value={this.item.value}/>
                    </div>    
                    <button className="btn btn-secondary mb-3" onClick={(e) => this.deleteTask(item.id)}>X</button>
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