import React, { Component } from 'react';

class SearchFilter extends Component {
    constructor(props){
        super(props)
    }
    
    render() {
        return (
            <div style={{ margin: 12 }}>
                <input
                    id="outlined-basic"
                    name="searchStudent"
                    label="Найти студента"
                    variant="outlined"
                    size="small"
                    value={this.props.searchStudent}
                    onChange={this.props.search}
                />
            </div>
        );
    }
}

export default SearchFilter;