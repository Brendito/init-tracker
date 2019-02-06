import React from 'react';
import ac from './img/ac.png';

const AC = (props) => {
    return ( <div id={props.id}><img src={ac}/><span>{props.ac}</span></div> );
}

export default AC ;