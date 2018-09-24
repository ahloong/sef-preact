import { h, Component } from "preact";
import { Router } from "preact-router";
import Header from "./header";
import Home from "../routes/home";
import Profile from "../routes/profile";
import NotFound from "../routes/404";
import firebase from "./firebase";
import Ticket from "../routes/ticket";
import Payment from "../routes/payment";
// import Home from 'async!../routes/home';
// import Profile from 'async!../routes/profile';

export default class App extends Component {
  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */
  handleRoute = e => {
    this.currentUrl = e.url;
  };

  componentWillMount() {
    firebase.auth().onAuthStateChanged(currentUser => {
      this.setState({ currentUser });
      console.log(currentUser);
    });
  }

  render({}, { currentUser }) {
    return (
      <div id="app">
        <Header currentUser={currentUser} />
        <Router onChange={this.handleRoute}>
          <Home path="/" />
          <Ticket path="/ticket" />
          <Payment path="/payment" />
          <Profile path="/profile/" currentUser={currentUser} />
          <NotFound default />
        </Router>
      </div>
    );
  }
}
