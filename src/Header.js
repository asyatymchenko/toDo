import React from 'react';


class Header extends React.Component{

	render(){
		return  (
			       <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                      <h1 className="display-4">To Do List</h1>
                      <p className="lead">Add new items into your to-do list</p>
                    </div>
                  </div>
		);
	}


}

export default Header