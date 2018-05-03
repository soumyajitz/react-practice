import React, { Component } from 'react';
// import  { StyleRoot } from 'radium';
import classes from './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      {
        id: 'wdsfd1',
        name: 'Sam',
        age: 26
      },
      {
        id: 'qwert2',
        name: 'Jit',
        age: 27
      }
    ],
    showPersons: false
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];

    console.log("Persons before",persons);
    persons.splice(personIndex, 1);
    console.log("Persons after",persons);
    this.setState({persons: persons});
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = { 
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;
    
    this.setState({
      persons: persons
    }) 
  }

  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;

    this.setState({
      showPersons: !doesShow
    })
  }

  render() {
    let btnClass= null;
    // const style = {
    //   backgroundColor: 'green',
    //   font: 'inherit',
    //   border: '1px solid blue',
    //   padding: '8px',
    //   margin: '2px',
    //   cursor: 'pointer',
    //   // ':hover': {
    //   //   backgroundColor: 'lightgreen',
    //   //   color: 'black'
    //   // }
    // }

    let persons = null;

    if(this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person key={person.id}
              name={person.name} 
              age={person.age} 
              click={() => this.deletePersonHandler(index)}
              changed={(event) => this.nameChangedHandler(event, person.id)}
            />
          })}
        </div> 
      );

      btnClass = classes.Red;
    }

    let assignedClasses = [];

    if(this.state.persons.length <= 2) {
      assignedClasses.push(classes.red);
    }

    if(this.state.persons.length >=1) {
      assignedClasses.push(classes.bold);
    }

    return (
        <div className={classes.App}>
          <h1> Hi I am React App </h1>
          <p className={assignedClasses.join(' ')}>This is working</p>
          <button 
          className={btnClass}
            onClick={this.togglePersonHandler}>
            Switch Name
          </button>

          {persons}
        </div>
    );
  }
}

export default App;
