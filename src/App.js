import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodosList from "./components/todos-list.component";
import CompletedList from "./components/completed_todos.component";
import logo from "./logo.svg";


class App extends Component {
  render() {
    return (
      <Router>
        <div className = "container">
          <nav className = "navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="https://www.google.com/webhp?hl=en&sa=X&ved=0ahUKEwis097v4pzhAhXEdCsKHWOECuIQPAgH">
              <img src={logo} width = "30" height="30" alt="google.com"/> 
            </a>
            <Link to="/" className="navbar-brand">MERN-STACK Todo App</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Todos</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Todo</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/completedlist" className="nav-link">Completed List</Link>   
                </li>
              </ul>
            </div>  
          </nav>
          <Route path="/" exact component = {TodosList}/>
          <Route path = "/edit/:id" component = {EditTodo}/>
          <Route path = "/create" component = {CreateTodo}/>
          <Route path = "/completedlist" component = {CompletedList}/>
        </div>
      </Router>
    );
  }
}

export default App; 


// import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import jwt_decode from "jwt-decode";
// import setAuthToken from "./utils/setAuthToken";

// import { setCurrentUser, logoutUser } from "./actions/authActions";
// import { Provider } from "react-redux";
// import store from "./store";

// import Navbar from "./components/layout/Navbar";
// import Landing from "./components/layout/Landing";
// import Register from "./components/auth/Register";
// import Login from "./components/auth/Login";
// import PrivateRoute from "./components/private-route/PrivateRoute";
// import Dashboard from "./components/dashboard/Dashboard";

// import "./App.css";

// // Check for token to keep user logged in
// if (localStorage.jwtToken) {
//   // Set auth token header auth
//   const token = localStorage.jwtToken;
//   setAuthToken(token);
//   // Decode token and get user info and exp
//   const decoded = jwt_decode(token);
//   // Set user and isAuthenticated
//   store.dispatch(setCurrentUser(decoded));
//   // Check for expired token
//   const currentTime = Date.now() / 1000; // to get in milliseconds
//   if (decoded.exp < currentTime) {
//     // Logout user
//     store.dispatch(logoutUser());

//     // Redirect to login
//     window.location.href = "./login";
//   }
// }
// class App extends Component {
//   render() {
//     return (
//       <Provider store={store}>
//         <Router>
//           <div className="App">
//             <Navbar />
//             <Route exact path="/" component={Landing} />
//             <Route exact path="/register" component={Register} />
//             <Route exact path="/login" component={Login} />
//             <Switch>
//               <PrivateRoute exact path="/dashboard" component={Dashboard} />
//             </Switch>
//           </div>
//         </Router>
//       </Provider>
//     );
//   }
// }
// export default App; 