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

  render(){
    return(
        <div lassName="App">
              <div class="container-fluid">
                <div class="jumbotron jumbotron-fluid">
                    <div class="container">
                      <h1 class="display-4">To Do List</h1>
                      <p class="lead">Add new items into your to-do list</p>
                    </div>
                  </div>
                <div class="row justify-content-center">
                    <div class="col-8">
                        <div class="row justify-content-center">
                          <input
                          id="taskInput"
                          type="text"
                          placeholder="Type item here"
                          value={this.state.newItem}
                          onChange={e => this.updateInput("newItem", e.target.value)}/>
                          <button 
                          id="taskAddBtn"
                          class="btn btn-secondary" 
                          onClick={() => this.addItem()}
                          disabled={!this.state.newItem.length}>add
                          </button>
                        </div>
                        <div class ="row justify-content-center">
                          <ul>
                          {this.state.list.map(item => {
                            return (

                              <li class="row align-items-start" key={item.id}>
                                <div class="input-group mb-3">
                                  <div class="input-group-prepend">
                                    <input type="checkbox"/>
                                  </div>
                                  <input type="text" class="form-control" placeholder="task" value={item.value} aria-describedby="basic-addon2"/>
                                  <button 
                                    tabindex={item.id} 
                                    class="btn btn-secondary"
                                    onClick={() => this.deleteItem(item.id)}>X</button>
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

  //function App() {
  //return (
    
 // );
//}

export default App;
