import React from 'react';
import classes from './Cockpit.css';

const cockpit = (props) => {
    let assignedClasses = [];
    let btnClass= null;

    if(props.showPersons) {
        btnClass = classes.Red;
    }
    
    if(props.persons.length <= 2) {
      assignedClasses.push(classes.red);
    }

    if(props.persons.length >=1) {
      assignedClasses.push(classes.bold);
    }

    return (
        <div className={classes.Cockpit}>
            <h1> Hi I am React App </h1>
            <p className={assignedClasses.join(' ')}>This is working</p>
            <button 
                className={btnClass}
                onClick={props.clicked}>
                Switch Name
            </button>
        </div>
    );
}

export default cockpit;