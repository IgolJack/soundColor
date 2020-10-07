import React from "react";
import SearchFilter from './SearchFilter'
import PropertyFilter from './PropertyFilter'

class Filter extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            filterName: {},
            searchStudent: "",
        }

        this.onInputChange = this.onInputChange.bind(this)
        this.search = this.search.bind(this)
    }

    componentDidMount() {
        this.setState({
            filterName: this.props.filterName,
            searchStudent: this.props.searchStudent
        })
    }

    onInputChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        
        this.setState({ searchStudent: "" })
        //console.log(have, ", ", value)

        if(value !== ""){
            this.setState({ filterName: {...this.state.filterName, [name]: value}}, () => this.props.updateData("filterName", this.state.filterName));
        }
        else if(name in this.state.filterName && value === ""){
            //console.log("обнуление")
            const { filterName } = this.state;
            delete filterName[`${name}`];
            this.setState({ filterName: filterName }, () => this.props.updateData("filterName", this.state.filterName))            
        }      
    }

    search = event => {
        this.setState({ searchStudent: event.target.value }, () => this.props.updateData("searchStudent", this.state.searchStudent))
        const { filterName } = this.state;
        delete filterName.course;
        delete filterName.lvl;
        delete filterName.missed;
        this.setState({ filterName: filterName }, () => this.props.updateData("filterName", this.state.filterName))

    }
    


    render() {
        return(
           <div>
                <SearchFilter search={this.search}/>
                <PropertyFilter onInputChange={this.onInputChange}/>
            </div>
        );
    }
}

export default Filter