import React from 'react';
import axios from 'axios'
import update from 'immutability-helper'
import ToDoItem from './ToDoItem'


class ToDoList extends React.Component{
constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
  }
  getTask(){
    axios.get('http://localhost:3000/tasks')
    .then(response => {
      for (let i = 0; i < response.data.length; i++) {
        this.state.tasks.push({id: response.data[i].id, title: response.data[i].title, done: response.data[i].done, description: response.data[i].description});
      }
      this.setState({tasks: this.state.tasks});
    });
  }

  componentDidMount() {
   this.getTask();
  }

render(){
    return  (
      <div className ="col-5 justify-content-center">
        <div >
          <ul className="p-4">
            {this.state.tasks.map(item => {
              return (<ToDoItem id={item.id} title={item.title} done={item.done} description={item.description}/>);})
            }
          </ul>
        </div>
      </div> 
    );
  }
}

export default ToDoList