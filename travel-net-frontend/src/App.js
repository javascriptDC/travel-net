
// packages
import React from 'react';
// import { Route, Switch} from "react-router-dom";
import {connect} from 'react-redux'

// styles
import './App.css';
// import image from './images/small-world.jpeg'

//components
import NavBar from './NavBar'
// import SignUp from './users/SignUp'
// import SignIn from './users/SignIn'
import FriendsMenu from './containers/FriendsMenu'
// import Home from './containers/Home'
// import Splash from './containers/Splash'
import ChatroomContainer from './friends/ChatroomContainer'
// import FriendsChat from './friends/FriendsChat'
import AllRoutes from './AllRoutes'
class App extends React.Component {

  state = {
    friendId: ''
  }

  toggleChat = (id) => {
    this.setState({
      friendId: this.state.friendId === id ? null : id
    })
  }

  // toggleMenu = (id) => {
  //   this.setState({
  //     friendId: this.state.friendId === id ? null : id
  //   })
  // }

  // showOnMap = (id) => {
  //   console.log(id)
  // }

  render() {
    // let sectionStyle = {
    //     margin: 0,
    //     height: "100vh",
    //     backgroundSize: "cover",
    //     backgroundImage: `url(${image})`
    //   }

    return(
        <div className="add-padding">
          <NavBar/>
          <div className="ui grid">
            {this.props.friends ?
              <div className="two wide column">
                <FriendsMenu friendId={this.state.friendId} toggleChat={this.toggleChat} />
              </div>
            : null }
            {this.state.friendId ?
              <div className="sticky-side-chat">
                <ChatroomContainer friendId={this.state.friendId}/>
              </div>
              : null }
              <AllRoutes/>
        </div>
       </div>
    )
  }
}
// <NavBar/>
// <div id="add-padding" className="ui grid">
//   <div className="two wide column">
//     {this.props.friends ?
//     <FriendsMenu toggleChat={this.toggleChat}/>
//     : null }
//   </div>
// <div id="main-container" className="twelve wide column">
//   <Switch>
//     <Route exact path='/' component={Home}/>
//     <Route exact path="/signup" component={SignUp}/>
//     <Route exact path="/signin" component={SignIn}/>
//     <AppRoutes />
//   </Switch>
// </div>
// </div>
//

const mapStateToProps = (state) => {
  return {friends: state.users.friends}
}

export default connect(mapStateToProps, null, null, {
  pure: false})(App)
