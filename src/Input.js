import React from 'react';
import axios from 'axios'

class Input extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      newTitle: '',
      newDescription: ''
    };
  }

  createTask = (e) => {
    axios.post('http://localhost:3000/tasks',  {title: this.state.newTitle, done: false, description:this.state.newDescription})
    .then(response => {
    })
    .catch(error => console.log(error))   
  }
 
  handleChangeItem = (e) => {
    this.setState({newTitle: e.target.value});
  }

  handleChangeDescr = (e) => {
    this.setState({newDescription: e.target.value});
  }

	render(){
  
		return  (
      <div className="row justify-content-center">

        <div className="row justify-content-center input-group mb-3 sticky-input form-back">
          <form className="col-10" onSubmit={this.createTask}>
            <div className="input-group mb-3">
              <input  
                type="text" name="fname" className="form-control" 
                placeholder="Type item here"  
                aria-describedby="button-addon2"  
                value={this.state.newTitle}
                onChange={this.handleChangeItem} autoFocus={true}/>
              <div className="input-group-append">
                <input type="submit" value="Submit" id="taskAddBtn" className="btn btn-outline-secondary" disabled={!this.state.newTitle.length}/>  
              </div> 
            </div>  
            <textarea className="form-control" id="exampleFormControlTextarea1" 
               placeholder="Type item description here" rows="3" 
               value={this.state.newDescription}
               onChange={this.handleChangeDescr}>
            </textarea>
          </form>
        </div>
      </div>      
		);
	}
}

export default Input