import React, { Component } from 'react';
import Navbar from './Component/Layout/Navbar';
import Home  from './Component/Home/index';
import {Router,Route,Switch} from 'react-router-dom';
import history from './Config/history';
import PageNotFound from './Component/PageNotFound';
import Dashboard from './Component/Dashboard/Index';
import EditPainting from './Component/Paintings/Edit';
import UserRoute from './Routes/UserRoute';
import Users from './Component/Users/Index';
import Profile from './Component/Users/Profile';
class App extends Component {
  render() {
    return (
     <Router history={history}>
        <Route component={RouteComponent} />
     </Router>
    );
  }
}
const MainComponent=()=>{
  return (
    <div className="App">
      <Navbar />
      <Home />
    </div>
  );  
}
const RouteComponent=({location})=>{
return( <Switch>
    <Route location={location} exact path="/" component={MainComponent} />   
    <UserRoute location={location} exact path="/dashboard" component={Dashboard} />   
    <UserRoute location={location} exact path="/profiles" component={Users} />  
    <UserRoute location={location} exact path="/profiles/:username" component={Profile} />  
    <UserRoute location={location} exact path="/paintings/edit/:painting_id" component={EditPainting} />                       
    <Route location={location} path="*" component={PageNotFound} />
</Switch>  )   
}

export default App;
