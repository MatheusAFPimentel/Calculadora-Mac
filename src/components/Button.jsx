import React from "react"
import './Button.css'

export default props => {
    let classes = 'button '
    classes += props.operation ? 'operation' : ''
    classes += props.double ? 'double' : ''
    classes += props.triple ? 'triple' : ''

    return (
        <button
            onClick={e => props.click && props.click(props.label)/*primeiro props.click, testa se existe ou não essa operação*/} 
            className={classes}>
            {props.label}
        </button>
    )
}