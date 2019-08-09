import React from 'react';
import axios from 'axios'
import update from 'immutability-helper'

class Modal extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      newTitle: '',
      newDescription: ''
    };
  }

 handleChangeTitle = (e) => {
    this.setState({newTitle: e.target.value});
  }

  handleChangeDescr = (e) => {
    this.setState({newDescription: e.target.value});
  }
  
  /*
  updateTask = (e, id) => {
    
    axios.put(`http://localhost:3000/tasks/${id}`, {task: {title: newTitle, description: newDescription, done: false}})
    .then(response => {
     // const taskIndex = this.state.tasks.findIndex(x => x.id === response.data.id)
    //const tasks = update(this.state.tasks, {[taskIndex]: {$set: response.data}
      })
      this.setState({
        newTitle:"",
        newDescription: ""
      //})
    })
    .catch(error => console.log(error))   
  }
  */
/*
updateTaskTest = (e, id) => {
   // console.log("TEST id: "+id);
    //debugger; 
    //var checked = e.target.checked;
   // console.log("to_do_ITEM_PUT(id) "+checked);
    axios.put(`http://localhost:3000/tasks/test/${id}`, {task: {title: "TESTTITLE"}})
    .then(response => {
     // this.setState({status: response.data.done});
    })
    .catch(error => console.log(error))   
    //this.changeButtonColor(id, checked);
  }
*/
  render(){
    return  (
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
                      placeholder={this.props.title}  
                      aria-describedby="button-addon2"  
                      defaultValue={this.state.newTitle}
                      onChange={this.handleChangeTitle} autoFocus={true}/>
                    </div>
                    <div className="input-group mb-3">
                      <textarea className="form-control" id="exampleFormControlTextarea1" 
                      placeholder={this.props.description} 
                      defaultValue={this.state.newDescription}
                      onChange={this.handleChangeDescr} rows="3" ></textarea>
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" 
                    data-dismiss="modal" disabled={!this.state.newTitle.length} 
                    onClick={(e) => this.updateTask(this.props.id)}>Submit</button>
                    <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div> 
    );
  }
}

export default Modal