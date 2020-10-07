import React, { Component } from 'react';

class PropertyFilter extends Component {
    constructor(props){
        super(props)
    }
    
    
    render() {
        return (
            <div>
                
                        
                            <h3>Фильтры</h3>                        
                                <h4>Курс</h4>
                                <select
                                    name="course"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    
                                    onChange={this.props.onInputChange}
                                >
                                    <option value="">Все курсы</option>
                                    <option value="Первый курс">Первый курс</option>
                                    <option value="Второй курс">Второй курс</option>
                                    <option value="Третий курс">Третий курс</option>
                                    <option value="Четвертый курс">Четвертый курс</option>
                                    <option value="Пятый курс">Пятый курс</option>
                                </select>
                           

                            
                                <h4>Уровень</h4>
                                <select

                                    name="lvl"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    
                                    onChange={this.props.onInputChange}
                                >
                                    <option value="">Все уровни</option>
                                    <option value="1">Первый уровень</option>
                                    <option value="2">Второй уровень</option>
                                    <option value="3">Третий уровень</option>
                                    <option value="4">Четвертый уровень</option>
                                    <option value="5">Пятый уровень</option>
                                </select>
                            

                            
                                <input
                                    id="standard-full-width"
                                    label="Пропуски"
                                    helperText="Значение и более"
                                    type="number"
                                    fullWidth
                                    name="missed"
                                    
                                    onChange={this.props.onInputChange}
                                />                        
            </div>
        );
    }
}

export default PropertyFilter;