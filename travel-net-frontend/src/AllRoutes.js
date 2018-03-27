import React from 'react';
import { Route, Switch} from "react-router-dom";

import SignUp from './users/SignUp'
import SignIn from './users/SignIn'
import Splash from './containers/Splash'
import About from './containers/About'
import LoggedInRoutes from "./LoggedInRoutes";
import AddMoreUserInfo from './users/AddMoreUserInfo';

const AllRoutes = (props) => {
  return(
    <React.Fragment>
      <Switch>
          <Route exact path='/' component={Splash}/>
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/signin" component={SignIn}/>
          <Route exact path="/addbio" component={AddMoreUserInfo}/>
          <LoggedInRoutes />
      </Switch>
    </React.Fragment>
  )
}

export default AllRoutes
