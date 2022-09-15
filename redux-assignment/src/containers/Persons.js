import React, { Component } from 'react';
import {connect} from 'react-redux';

import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';

class Persons extends Component {
    render () {
        return (
            <div>
                <AddPerson personAdded={this.props.addPersonHandler} />
                {this.props.persons.map(person => (
                    <Person 
                        key={person.id}
                        name={person.name} 
                        age={person.age} 
                        clicked={() => this.props.deletePersonHandler(person.id)}/>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        persons: state.persons
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        addPersonHandler: (name, age) => dispatch({type: "ADD_PERSON", name:name, age:age}),
        deletePersonHandler: (id) => dispatch({type: "DELETE_PERSON", deleteId: id})
    }
    

}


export default connect(mapStateToProps, mapDispatchToProps)(Persons);