import React from 'react';
import axios from 'axios'
import update from 'immutability-helper'

class ToDoList extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      newItem: '',
      newDescription: '',
      tasks: []
    };
  }

  getTask(){
    axios.get('http://localhost:3000/tasks')
    .then(response => {
      for (let i = 0; i < response.data.length; i++) {
        this.state.tasks.push({id: response.data[i].id, title: response.data[i].title, done: response.data[i].done, description: response.data[i].description});
      }
      this.setState({tasks: this.state.tasks});
    });
  }

  componentDidMount() {
   this.getTask();
  }
 
  createTask = (e) => {
    console.log("Title: "+ this.state.newItem);

    axios.post('http://localhost:3000/tasks',  {title: this.state.newItem, done: false, description:this.state.newDescription})
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
 
  handleChangeItem = (e) => {
    this.setState({newItem: e.target.value});
  }

  handleChangeDescr = (e) => {
    this.setState({newDescription: e.target.value});
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

	render(){
  
		return  (
      <div className="row justify-content-center">
        <div className="row justify-content-center input-group mb-3 sticky-input">
          
            <form className="col-10" onSubmit={this.createTask}>
              <div className="input-group mb-3">
                <input  
                  type="text" name="fname" className="form-control" 
                  placeholder="Type item here"  
                  aria-describedby="button-addon2"  
                  value={this.state.newItem}
                  onChange={this.handleChangeItem} autofocus="true"/>
                  <div className="input-group-append">
                    <input type="submit" value="Submit" id="taskAddBtn" className="btn btn-outline-secondary"/>  
                  </div> 
              </div>  
               <textarea className="form-control" id="exampleFormControlTextarea1" 
               placeholder="Type item description here" rows="3" 
               value={this.state.newDescription}
               onChange={this.handleChangeDescr}
               ></textarea>
            </form>
        </div>

        <div className ="col-5 justify-content-center">
          <div >
            <ul className="p-4">
              {this.state.tasks.map(item => {
                return (
                  <li className="row align-items-start" key={item.id}>
                    <div className="container">
                      <div className = " d-flex justify-content-start">
                        <div className="input-group mb-3">
                          <div className="input-group-prepend">
                            <div className="input-group-text">
                             <input type="checkbox" onChange={(e) => this.updateTask(e, item.id)} checked={item.done}/>
                            </div>
                          </div>
                         <input type="button" className="form-control" data-toggle="modal" data-target="#myModal" value={item.title}/>
                        </div>    
                        <button className="btn btn-secondary mb-3" onClick={(e) => this.deleteTask(item.id)} id={item.id}>X</button>
                      </div> 

                      <div className="modal" id="myModal">
                        <div className="modal-dialog">
                          <div className="modal-content">   
                            <div className="modal-header">
                              <h4 className="modal-title">Change task description</h4>
                              <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                              <div className="input-group mb-3">
                                <input  
                                type="text" name="fname" className="form-control" 
                                placeholder={item.title}  
                                aria-describedby="button-addon2"  
                                value={this.state.newItem}
                                onChange={this.handleChange} />
                              </div>
                              <div className="input-group mb-3">
                                <textarea className="form-control" id="exampleFormControlTextarea1" 
                                placeholder={item.description}  rows="3" ></textarea>
                              </div>
                            </div>

                            <div className="modal-footer">
                              <button type="button" className="btn btn-secondary" data-dismiss="modal">Submit</button>
                              <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                          </div>
                        </div>
                      </div> 
                    </div>
                  </li>     
                );
              })}
            </ul>
          </div>
        </div>    

        
      </div>      
		);
	}
}

export default ToDoList