import React, { Component } from 'react';
// import  { StyleRoot } from 'radium';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {
  constructor(props) {
    super(props);
    console.log("[App.js] constructor",props);
  }

  componentWillMount() {
    console.log("[App.js] component will mount");
  }

  componentDidMount() {
    console.log("[App.js] component did mount");
  }

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
      },
      {
        id: 'wdsfd2',
        name: 'Sammy',
        age: 23
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
    console.log("[App.js] inside render")
    let persons = null;

    if(this.state.showPersons) {
      persons = <Persons 
            persons={this.state.persons} 
            clicked={this.deletePersonHandler} 
            changed={this.nameChangedHandler} />
    }

    return (
        <div className={classes.App}>
          <Cockpit 
            showPersons={this.state.showPersons}
            persons={this.state.persons} 
            clicked={this.togglePersonHandler}/>
          {persons}
        </div>
    );
  }
}

export default App;
