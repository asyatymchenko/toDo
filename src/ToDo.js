import React from 'react';


class ToDo extends React.Component{
  changeCheckboxColor(id){
  
       var element = document.getElementById(id);
       if(element.classList.contains("btn-secondary")){
        element.classList.remove("btn-secondary")
        element.classList.add("btn-danger");

       }
      else if (element.classList.contains("btn-danger")) {
        element.classList.remove("btn-danger")
        element.classList.add("btn-secondary");
      }
  }
  
  render(){
    return  (
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <div className="input-group-text">
                 <input type="checkbox" onChange={() => this.changeCheckboxColor(this.props.id)}/>
                </div>
              </div>
              <input type="text" className="form-control" aria-label="Text input with checkbox" value={this.props.value}/>
            </div>                        
    );
  }

}

export default ToDo