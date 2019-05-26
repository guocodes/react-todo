import React, {Component} from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import { Button } from 'semantic-ui-react'

 //className is for the css
const Todo = props => (
    <tr>
        <td className ={props.todo.todo_completed ? 'completed' : ""}>{props.todo.todo_description}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_responsible}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>
        {props.todo.todo_priority}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>
            <Link to={"/edit/" + props.todo._id}>Edit</Link>
        </td>

    </tr>
)

export default class CompletedList extends Component {

    constructor(props) {
        super(props);
        this.state = {todos:[]};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos/').then(res => {
            const a = res.data.filter((todo) => todo.todo_completed===true);
            //console.log(a);
            this.setState({todos:a});
            //console.log(this.state);
        }).catch(err =>
            console.log(err));

    }

    componentDidUpdate() {
        // INFINITE LOOP WHICH HURTS PERFORMANCE!!! LOOK AT DOCUMENTATION
        axios.get('http://localhost:4000/todos/').then(res => {
            const a = res.data.filter((todo) => todo.todo_completed===true);
            this.setState({todos:a});
        }).catch(err =>
            console.log(err));
    }

    todoList() {
        return this.state.todos.map(function(currentTodo, i) {
            return <Todo todo = {currentTodo} key={i} />  //todo is a prop
        });
    } 


    render() {
        return (
            <div>
                <h3>Todos List</h3>
                <table className="table table-striped" style={{marginTop:20}}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.todoList()}
                    </tbody>
                </table>
            </div>
        )
    }
}