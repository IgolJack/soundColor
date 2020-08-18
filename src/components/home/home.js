import React, {Component} from 'react'
import {Link} from "react-router-dom"

const title = "ДОм"

export default class Home extends Component {

    render() {
        return (
            <Link className='SectionNavigation-Item Section' to='/profile'>
                <span className='Section-Title'>{title}</span>
            </Link>
        )
    }
}