import React from 'react';
import axios from 'axios'
import update from 'immutability-helper'
import ToDoList from './ToDoList'

class Input extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      newItem: '',
      newDescription: ''
    };
  }

  createTask = (e) => {
    console.log("Title: "+ this.state.newItem);

    axios.post('http://localhost:3000/tasks',  {title: this.state.newItem, done: false, description:this.state.newDescription})
    .then(response => {
      const tasks = update(this.state.tasks, {
        $splice: [[0, 0, response.data]]
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
        <ToDoList />
      </div>      
		);
	}
}

export default Input