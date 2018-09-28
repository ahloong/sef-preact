import { h, Component } from "preact";
import Button from "preact-material-components/Button";
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
import { firebase } from "@firebase/app";

export default class Payment extends Component {

  state = {
    key : ''
  }

  componentDidMount() {
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
      uid : firebase.auth().currentUser.uid
    });
  }

  //adding the values to firebase
  submitpayment = () => {
    var uid = this.state.uid;
    var data = firebase.database().ref('/ticket').push();
    var data2 = firebase.database().ref('user/').child(uid).child('TicID').push();
    data.then((snapshot) => {
      const key1 = snapshot.key;
      data2.set({
        id : key1
      })
      console.log(key1);
    });
    data.set({
      date: this.state.date,
      depature: this.state.from,
      destination: this.state.to,
      price: this.state.price,
      quantity: this.state.quantity,
      schedule: this.state.SID,
      uid: this.state.uid
    });
    route("/profile");
  }

  render() {
    return (
      <div>
        {/* container with all the info grab from previous ticket page */}
        <div class={style.summarycont}>
          <h1>Ticket Summary</h1>
          <div>
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
              <TextField label="Card Number" outlined />
              <p>Cardholder Name</p>
              <TextField label="Cardholder Name" outlined />
              <p>CVC</p>
              <TextField type="password" maxlength="3" label="CVC" outlined />
              <p>Expiry Date</p>
              <TextField label="Expiry Date" outlined />
              <div>
                <Button raised ripple
                onClick={this.submitpayment}>
                  Confirm
                </Button>
              </div>
          </div>
        </div>
      </div>
    );
  }
}
