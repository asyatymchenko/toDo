//import React from 'react';
import React, {Component} from 'react';
import './App.css';

class App extends Component{
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

  changeCheckboxColor(id){
  
       var element = document.getElementById(id);
      element.classList.add("btn-danger");
  }

  render(){
    return(
        <div className="App">
              <div className="container-fluid">
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                      <h1 className="display-4">To Do List</h1>
                      <p className="lead">Add new items into your to-do list</p>
                    </div>
                  </div>
                <div className="row justify-content-center">
                    <div className="col-8">
                        <div className="row justify-content-center">
                          <input
                          id="taskInput"
                          type="text"
                          placeholder="Type item here"
                          value={this.state.newItem}
                          onChange={e => this.updateInput("newItem", e.target.value)}/>
                          <button 
                          id="taskAddBtn"
                          className="btn btn-secondary" 
                          onClick={() => this.addItem()}
                          disabled={!this.state.newItem.length}>add
                          </button>
                        </div>
                        <div className ="row justify-content-center">
                          <ul className="p-4">
                          {this.state.list.map(item => {
                            return (

                              <li className="row align-items-start" key={item.id}>
                                <div className = "container " >
                                  <div className="input-group mb-3">
                                    <input type="checkbox" onClick={() => this.changeCheckboxColor(item.id, this)} />   
                                  <input type="text" className="form-control" placeholder="task" value={item.value} aria-describedby="basic-addon2"/>
                                  <button 
                                    id = {item.id} 
                                    className="btn btn-secondary"
                                    onClick={() => this.deleteItem(item.id)}>X</button>
                                  </div>
                                </div>
                                
                            </li>
                            );
                          })}
                         </ul>
                        </div>
                    </div>
                </div>              
              </div>
        </div>
    );
  }
}

export default App;
