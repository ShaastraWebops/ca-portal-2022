import React, { useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import LeaderBoard from "./LeaderBoard";
import Login from "./Login";
import Profile from "./Profile";
import Questionaire from "./Questionaire";
import Task from "./Task";
import { ApolloProvider } from "@apollo/client";
import client from "./graphql";
import Logout from "./logout";
import AuthContext from "./utils/context";
import thank from "./thank";
import { Rejected, Selected } from "./Selected";


const App = () => {
  const { role } = useContext(AuthContext);
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
         
          <Route exact path="/profile" component={Profile} />
          {role === "REGISTERED" && (
            <Route exact path="/me" component={thank} />
          )}
          {role === "SELECTED" && <Route exact path="/me" component={Selected} />}
          {role === "REJECTED" && <Route exact path="/me" component={Rejected} />}
          <Route exact path="/questionaire" component={Questionaire} />
          <Route exact path="/leaderboards" component={LeaderBoard} />
          <Route exact path="/tasks" component={Task} />
          <Route exact path="/logout" component={Logout} />
        </Router>
      </div>
    </ApolloProvider>
  );
};

export default App;
