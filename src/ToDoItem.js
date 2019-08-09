import React from 'react';
import axios from 'axios'
//import update from 'immutability-helper'
import Update from './Update'

class ToDoItem extends React.Component{
constructor(props) {
    super(props);
    this.state = {
      status: false,
      idModal: 0
    };
  }

  getTask(id){
    console.log("get id item : "+id);
    axios.get(`http://localhost:3000/tasks/${id}`)
    .then(response => {
      this.setState({status: response.data.done});
     // console.log("id: "+this.props.id+" status : "+this.state.status);
    });
  }

  componentWillMount() {
   this.getTask(this.props.id);
   this.setState({idModal: (this.props.id + 0,5)})
   //console.log("after create modal id : "+this.props.id);
  // console.log("id: "+this.props.id+" status : "+this.state.status);
  }

  updateTaskDone = (e, id) => {
    var checked = e.target.checked;
    axios.put(`http://localhost:3000/tasks/${id}`, {task: {done: checked}})
    .then(response => {
      this.setState({status: response.data.done});
    })
    .catch(error => console.log(error))   
    this.changeButtonColor(id, checked);
  }

  deleteTask = (id) => {
    console.log("to_do_ITEM_DELETE(id) "+id);
    axios.delete(`http://localhost:3000/tasks/${id}`)
    .then(response => {
     console.log("responce");
      })
      this.setState({
        status: false
      })
   // })
    //.catch(error => console.log(error))
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
        <li className="row align-items-start" key={this.props.id}>
          <div className="container">
            <div className = " d-flex justify-content-start">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                   <input type="checkbox" onChange={(e) => this.updateTaskDone(e, this.props.id)} checked={this.state.status}/>
                  </div>
                </div>
               <Update id = {this.props.id} buttonLabel = {this.props.title}/>
              </div>    
              <button className="btn btn-secondary mb-3" onClick={(e) => this.deleteTask(this.props.id)} id={this.props.id}>X</button>
            </div> 
          </div>
          
         

        </li>     
    );
  }
}

export default ToDoItem