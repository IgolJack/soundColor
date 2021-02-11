import React, { Component } from "react";
import { Input } from "antd";

class SearchFilter extends Component {
  state = {
    searchStudent: this.props.searchStudent,
  };

  search = (event) => {
    console.log(event.target.name);
    const name = event.target.name;
    this.setState({ searchStudent: event.target.value }, () =>
      this.props.updateData(name, this.state.searchStudent)
    );
  };

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState(this.props);
    }
  }

  render() {
    return (
      <Input
        id="outlined-basic"
        name="searchStudent"
        placeholder="Найти студента"
        variant="outlined"
       
        value={this.state.searchStudent}
        onChange={this.search}
      />
    );
  }
}

export default SearchFilter;
