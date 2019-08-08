import React from 'react';
import axios from 'axios'
import update from 'immutability-helper'

class Modal extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      newItem: '',
      newDescription: '',
      tasks: []
    };
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
                      defaultValue={this.state.newItem}
                      onChange={this.handleChange} />
                    </div>
                    <div className="input-group mb-3">
                      <textarea className="form-control" id="exampleFormControlTextarea1" 
                      placeholder={this.props.description}  rows="3" ></textarea>
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Submit</button>
                    <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div> 
    );
  }
}

export default Modal