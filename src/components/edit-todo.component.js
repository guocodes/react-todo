import React, {Component} from "react";
import axios from "axios";
import {Button} from 'semantic-ui-react';


export default class EditTodo extends Component {

    constructor(props) {
        super(props);

        /* this.state={
            todo_description: "",
            todo_responsible: "",
            todo_priority: "",
            todo_completed: false
        } */

        this.state={
            todo:[]
        };

        /* this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);*/
        this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        //this.delete = this.delete.bind(this   ,this.state.todo._id); //DON'T DO THIS!!

    }

    componentDidMount() {  //this.props.match.params.id
        console.log(this.props.match.params.id);
        axios.get("http://localhost:4000/todos/" + this.props.match.params.id).then(res => {
            /* this.setState({
                todo_description: res.data.todo_description,
                todo_responsible: res.data.todo_responsible,
                todo_priority: res.data.todo_priority,
                todo_completed: res.data.todo_completed
            }) */

            this.setState({todo: res.data});
        }).catch(err => {
                console.log(err)
            });
    }

    
    onChange(e) {
        //REMEMBER CANNOT MUTATE STATE DIRECTLY!!!
        const state = this.state.todo;
        state[e.target.name] = e.target.value;
        this.setState({todo:state})
    }

    /* onChangeTodoDescription(e) {
        this.setState({
            todo_description: e.target.value
        });
    }

    onChangeTodoResponsible(e) {
        this.setState({
            todo_responsible:e.target.value
        });
    }

    onChangeTodoPriority(e) {
        this.setState({
            todo_priority: e.target.value
        });
    } */

    delete(id){
        console.log(id);
        axios.delete('http://localhost:4000/todos/'+id)
          .then((res) => {
            this.props.history.push("/dashboard")
          });
    } 

    onChangeTodoCompleted(e) {
        //REMEMBER CANNOT MUTATE STATE DIRECTLY!!!
        const state = this.state.todo;
        state[e.target.name] = this.state.todo_completed ? false :true;
        this.setState({todo:state}); 
    } 

    onSubmit(e) {
        e.preventDefault();
        /* const obj = {
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        } */
        
        const obj = this.state.todo;
        console.log(this.state);
        //update the todo item //this.state.todo.id
        axios.post("http://localhost:4000/todos/update/" + this.props.match.params.id, obj).then(res=> console.log(res.data));
    
        
        //axios.post("http://localhost:4000/todos/update/" + this.props.match.params.id, obj).then(res=> console.log(res.data));
        
        //redirect back to the homepage after submitting the form
        this.props.history.push("/dashboard");
    }



    render() {
        return (
            <div>
                <h3>Update Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                    <label>Description: </label>
                    <input  type="text"
                            name="todo_description"
                            className="form-control"
                            value={this.state.todo.todo_description}
                            onChange={this.onChange}
                            />
                    </div>
                    <div className="form-group">
                        <label>Responsible: </label>
                        <input  type="text"
                                name="todo_responsible"
                                className="form-control"
                                value={this.state.todo.todo_responsible}
                                onChange={this.onChange}
                                />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="todo_priority"
                                    id="priorityLow"
                                    value="Low"
                                    checked={this.state.todo.todo_priority==='Low'}
                                    onChange={this.onChange}
                                    />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="todo_priority"
                                    id="priorityMedium"
                                    value="Medium"
                                    checked={this.state.todo.todo_priority==='Medium'}
                                    onChange={this.onChange}
                                    />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="todo_priority"
                                    id="priorityHigh"
                                    value="High"
                                    checked={this.state.todo.todo_priority==='High'}
                                    onChange={this.onChange}
                                    />
                            <label className="form-check-label">High</label>
                        </div>
                        <div className="form-check">
                            <input  type="checkbox"
                                    className="form-check-input"
                                    id="completedCheckbox"
                                    name="todo_completed"
                                    onChange={this.onChangeTodoCompleted}
                                    checked={this.state.todo.todo_completed}
                                    value={this.state.todo.todo_completed}
                            />
                            <label className="form-check-label" htmlFor="completedCheckbox">
                                Completed
                            </label>
                        </div>

                        <br/>
                        <div className="form-group">
                                <input type="submit" value="Update Todo" className="btn btn-primary" />
                        </div>
                    </div>
                </form> 
                <Button color="red" onClick={this.delete.bind(this, this.state.todo._id)}>Delete</Button>
            </div>
        )
    }
}



