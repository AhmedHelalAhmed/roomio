import React, { Component } from "react";
import FontAwesome from "react-fontawesome";

class Search extends Component {

  render() {
    return(
      <div className='searchbarOuter'>
        <form action="submit" onSubmit={this.props.submit}>
          <input 
            className='searchbar'
            type="text"
            placeholder = "search rooms"
            value={this.props.input}
            onChange={this.props.onChange}
            disabled={this.props.disab ? true : false}
          />
          <button type="submit" onClick={this.props.submit}> 
            <FontAwesome name="search" />
          </button>
        </form>
      </div>
    )
  }
}

export default Search;