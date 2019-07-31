import React from 'react';
import App from "./App"
import ToDo from './ToDo'

class ToDoList extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      newItem: "",
      list: []
    };
  }
//incorporating local storage 
  componentDidMount() {
    this.hydrateStateWithLocalStorage();

    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
    document.addEventListener('keydown', this.handleKeyPress.bind(this));
  }

  handleKeyPress(event) {
    if (event.keyCode === 13) {
      document.getElementById("taskAddBtn").click();
      }
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
  }

  hydrateStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);

        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
  }

  saveStateToLocalStorage() {
    // for every item in React state
    for (let key in this.state) {
      // save to localStorage
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  updateInput(key, value) {
    // update react state
    this.setState({ [key]: value });
  }

  addItem() {
    // create a new item with unique id
    const newItem = {
      id: 1 + Math.random(),
      value: this.state.newItem.slice()
 
    };

    // copy current list of items
    const list = [...this.state.list];

    // add the new item to the list
    list.push(newItem);

    // update state with new list, reset the new item input
    this.setState({
      list,
      newItem: ""
    });
  }

  deleteItem(id) {
    // copy current list of items
    const list = [...this.state.list];
    // filter out the item being deleted
    const updatedList = list.filter(item => item.id !== id);

    this.setState({ list: updatedList });
  }


	render(){
		return  (
			<div className="row justify-content-center">
       	<div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Type item here"  
              aria-describedby="button-addon2"  
              value={this.props.item}
              onChange={e => this.updateInput("newItem", e.target.value)}/>
         	<div className="input-group-append">
	          <button className="btn btn-outline-secondary" type="button" id="taskAddBtn"
	            	onClick={() => this.addItem()}
	            	disabled={!this.state.newItem.length}>Add
	          </button>
          </div>
        </div>

        <div className ="row justify-content-center">
            <ul className="p-4">
	              {this.state.list.map(item => {
	              return (
	                <li className="row align-items-start" key={this.props.id}>
		                 	<div className = " d-flex justify-content-start">
		                  		<ToDo id={item.id} value={item.value}/>
		                    	<button id = {item.id} className="btn btn-secondary mb-3" onClick={() => this.deleteItem(item.id)}>X</button>
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