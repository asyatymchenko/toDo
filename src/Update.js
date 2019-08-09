
import React from 'react';
import axios from 'axios'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Update extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      oldTitle: '',
      newTitle: '',
      oldDescription: '',
      newDescription: ''
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
      newTitle:'',
      newDescription: ''
    }));
  }

   getTask(id){
   // console.log("get id modal : "+id);
    axios.get(`http://localhost:3000/tasks/${id}`)
    .then(response => {
      this.setState({oldTitle: response.data.title, oldDescription: response.data.description});
      //console.log(this.state.title, this.state.description);
      console.log("update data: "+this.props.id+" "+this.state.oldTitle+" "+this.state.oldDescription);
    });
  }

  componentDidMount() {
    console.log("update id: "+this.props.id);
   this.getTask(this.props.id);
  }

  handleChangeTitle = (e) => {
    this.setState({newTitle: e.target.value});
  }

  handleChangeDescr = (e) => {
    this.setState({newDescription: e.target.value});
  }

  render() {
    return (
      <div>
        <Button outline color="secondary"  onClick={this.toggle} >{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} aria-labelledby="contained-modal-title-vcenter"
      centered>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>

           <div className="input-group mb-3">     
              <input  
              type="text" name="fname" className="form-control" 
              placeholder={this.state.oldTitle}  
              aria-describedby="button-addon2"  
              defaultValue={this.state.oldTitle}
              onChange={this.handleChangeTitle} autoFocus={true}/>
            </div>
            <div className="input-group mb-3">
              <textarea className="form-control" id="exampleFormControlTextarea1" 
              placeholder={this.state.oldDescription} 
              defaultValue={this.state.oldDescription}
              onChange={this.handleChangeDescr} rows="3" ></textarea>
            </div>
          
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle} disabled={!this.state.newTitle.length}>Submit</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Update;