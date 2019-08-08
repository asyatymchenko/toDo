import React from 'react';
import axios from 'axios'
//import update from 'immutability-helper'
import Modal from './Modal'

class ToDoItem extends React.Component{
constructor(props) {
    super(props);
    this.state = {
      status: false,
      title: ""
    };
  }

  getTask(id){
    axios.get(`http://localhost:3000/tasks/${id}`)
    .then(response => {
      this.setState({status: response.data.done});
    });
  }

  componentDidMount() {
   this.getTask(this.props.id);
  }

  updateTask = (e, id) => {
    var checked = e.target.checked;
   // console.log("to_do_ITEM_PUT(id) "+checked);
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
                   <input type="checkbox" onChange={(e) => this.updateTask(e, this.props.id)} checked={this.state.status}/>
                  </div>
                </div>
               <input type="button" className="form-control" data-toggle="modal" data-target="#myModal" value={this.props.title}/>
              </div>    
              <button className="btn btn-secondary mb-3" onClick={(e) => this.deleteTask(this.props.id)} id={this.props.id}>X</button>
            </div> 

          
            <Modal/>
          </div>
        </li>     
    );
  }
}

export default ToDoItem