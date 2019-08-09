import React from 'react';
import Header from './Header'
import Input from './Input'
import Filter from './Filter'
import ToDoList from './ToDoList'

class Container extends React.Component{

  render(){
    return  (
      <div className="App">
        <div className="container-fluid">
          <Header/>
          <div className="row justify-content-center">
            <div className="col-8">
              <Input/>
              <ToDoList/>
              <Filter/>
            </div>
          </div>              
        </div>
      </div>         
    );
  }
}

export default Container
