import { h, Component } from "preact";
import Button from "preact-material-components/Button";
import Dialog from 'preact-material-components/Dialog';
import 'preact-material-components/Dialog/style.css';
import "preact-material-components/Card/style.css";
import "preact-material-components/List/style.css";
import "preact-material-components/Menu/style.css";
import "preact-material-components/Select/style.css";
import "preact-material-components/Button/style.css";
import "preact-material-components/Theme/style.css";
import TextField from "preact-material-components/TextField";
import "preact-material-components/TextField/style.css";
import style from "./style";
import { route } from "preact-router";
import  firebase  from '../firebase';

export default class Payment extends Component {


  componentDidMount() {
    var user = firebase.auth().currentUser;
    var name, Uid;
    if (user !=null) {
      name = user.displayName;
      Uid = user.uid;
      this.setState ({
        name: name,
        Uid: Uid
      });
    }
    // get all values from previous ticket page
    var params = new URLSearchParams(document.location.search.substring(1));
    var from = params.get("from");
    var to = params.get('to');
    var date = params.get("date");
    var quantity = params.get("quantity");
    var price = params.get('price');
    var time = params.get('time');
    var SID = params.get('SID');
    var total = (price) * (quantity);
    this.setState({
      from : from,
      to : to,
      date : date,
      quantity : quantity,
      price: price,
      time: time,
      total: total,
      SID : SID,
    });
  }

  //adding the values to firebase
  submitpayment = () => {
    if (this.state.SID = 'S01') {
      firebase.database().ref("schedule/S01/ticketnum").transaction(update => {
        return (update) -1;
      });
    }else if (this.state.SID = 'S02') {
      firebase.database().ref("schedule/S02/ticketnum").transaction(update => {
        return (update) -1;
      });
    }else {
      firebase.database().ref("schedule/S03/ticketnum").transaction(update => {
        return (update) -1;
      });
    }
    var uid = this.state.Uid;
    console.log(uid);
    var data = firebase.database().ref('/ticket').push();
    var data2 = firebase.database().ref('user/').child(uid).child('TicID').push();
    data.then((snapshot) => {
      const key1 = snapshot.key;
      data2.set({
        id : key1
      })
      // debugging purpose
      // console.log(key1);
    });
    data.set({
      date: this.state.date,
      depature: this.state.from,
      destination: this.state.to,
      price: this.state.price,
      quantity: this.state.quantity,
      schedule: this.state.SID,
      uid: this.state.Uid
    });
    route("/profile");
  }

  toggleSignInDig = () => {
    this.signoutDig.MDComponent.show();
  };

  render() {
    let login;
    if (this.state.name != null) {
      login = (
        <h2>Ticket for {this.state.name}</h2>
      )
    }else {
      login = (
        <h2></h2>
      )
    }

    let signstate;
    if (this.state.name != null) {
      signstate = (
        <Button raised ripple
        onClick={this.submitpayment}>
          Confirm
        </Button>
      )
    }else {
      signstate = (
        <Button raised ripple
        onClick={this.toggleSignInDig}>
          Next
        </Button>
      )
    }
    return (
      <div>
        {/* container with all the info grab from previous ticket page */}
        <div class={style.summarycont}>
        <div className={[style.signout_dialog, "signout_dialog"].join(" ")}>
        <Dialog
        onCancel={this.onClose}
        onAccept={this.onClose}
        ref={signoutDig => {
          this.signoutDig = signoutDig;
        }}
        >
          <Dialog.Header>Looks like you havent sign in!</Dialog.Header>
          <Dialog.Body>
          Please Sign in to continue the purchase. Press the sign in button located on your upper right.
          </Dialog.Body>
          <Dialog.Footer>
                <Dialog.FooterButton class={style.cancel_btn} accept>
                  OK
                </Dialog.FooterButton>
              </Dialog.Footer>
        </Dialog>
        </div>
          <h1>Ticket Summary</h1>
          <div>
            {/* <h2>
            Ticket for {this.state.name}
            </h2> */}
            { login }
            <h2>{this.state.from} To {this.state.to}</h2>
            <h2>{this.state.date}</h2>
          </div>
          <div>
            <h3>{this.state.time}</h3>
          </div>
          <div>
            <h3>{this.state.quantity} Adult</h3>
            <h3>RM {this.state.total}</h3>
            {/* user id debugging */}
            {/* <h3>{this.state.uid}</h3> */}
          </div>
          {/* empty payment form with no info recorded */}
          <div class={style.cardform}>
              <p>Card Number</p>
              <TextField label="Card Number" outlined required />
              <p>Cardholder Name</p>
              <TextField label="Cardholder Name" outlined />
              <p>CVC</p>
              <TextField type="password" maxlength="3" label="CVC" outlined />
              <p>Expiry Date</p>
              <TextField label="Expiry Date" outlined />
              <div>
                {/* <Button raised ripple
                onClick={this.submitpayment}>
                  Confirm
                </Button> */}
                { signstate }
              </div>
          </div>
        </div>
      </div>
    );
  }
}
