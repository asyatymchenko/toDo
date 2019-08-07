import React from 'react';
import Header from './Header'
import ToDoList from './ToDoList'

class Container extends React.Component{
  render(){
    return  (
             <div className="App">
              <div className="container-fluid">
                <Header/>
                <div className="row justify-content-center">
                    <div className="col-8">
                      <ToDoList/>
                    </div>
                </div>              
              </div>
            </div>         
    );
  }
}

export default Container
