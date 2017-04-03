import React, {Component} from 'react';

class Delete extends Component {
  state = {
    check: false,
    doubleCheck: false
  }
  onClick = () => {
    this.setState({check: true})
  }
  confirm = () => {
    this.setState({doubleCheck: true})
    console.log('send delete request here');
  }
  deny = () => {
    this.setState({check: false})
  }
  render() {
    return (
      <span className="deleteOuter">
        {
          this.state.doubleCheck == true
          ? <span>
              - deleted</span>
          : <span>
            -
            <span onClick={this.onClick}>
              {
                this.state.check == true
                ? <span>are you sure?</span>
                : 'delete?'
              }
            </span>
            {
              this.state.check == true
              ? <span>
                  <span onClick={this.confirm}>
                    -
                    <span className='delCon'>yes</span>
                  </span>
                  <span onClick={this.deny}>
                    -
                    <span className='delCon'>no</span>
                  </span>
                </span>
              : ''
            }
          </span>
        }
      </span>
    )
  }
}

export default Delete;