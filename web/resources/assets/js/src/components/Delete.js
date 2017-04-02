import React, {Component} from 'react';

class Delete extends Component {
  state = {
    check : false,
    doubleCheck : false
  }
  onClick = () => {
    let check = true;
    this.setState({check})
  }
  confirm = () => {
    let doubleCheck = true;
    this.setState({doubleCheck})
    console.log('send delete request here');
  }
  deny = () => {
    let check = false;
    this.setState({check})
  }
  render() {
    return (
      <span>
      {
        this.state.doubleCheck == true ? <span> - deleted</span> :
      <span>
         - <span onClick={this.onClick}>
            {this.state.check==true ? 
              <span>are you sure?</span> : 'delete?'
            }
          </span>
          {this.state.check==true ? 
            <span><span onClick={this.confirm}> - yes </span> <span onClick={this.deny}> - no </span></span> : ''
          }
      </span>
    }
    </span>
    )
  }
}


export default Delete;