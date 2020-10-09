import React, { Component } from 'react';
import { Input } from 'antd';

class SearchFilter extends Component {
    
    render() {
        return (
            <div style={{ margin: 12 }}>
                <Input
                    id="outlined-basic"
                    name="searchStudent"
                    placeholder="Найти студента"
                    variant="outlined"
                    size="Large"
                    fullWidth
                    value={this.props.searchStudent}
                    onChange={this.props.search}
                />
            </div>
        );
    }
}

export default SearchFilter;