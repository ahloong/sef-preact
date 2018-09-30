import { h, Component } from "preact";
import "preact-material-components/Button/style.css";
import style from "./style";
import  firebase  from "../firebase";
import Dialog from 'preact-material-components/Dialog';
import 'preact-material-components/Dialog/style.css';

export default class Profile extends Component {
  state = {
    time: Date.now(),
    count: 12,
    user: null
  };

  // the broken profile page
  componentDidMount() {
    // get the user id
    var uid = firebase.auth().currentUser.uid;

    //getting info from firebase from previous payment page
    var db = firebase
      .database()
      .ref("user/")
      .child(uid)
      .child("TicID");
    var db2 = firebase.database().ref("ticket/");
    db.orderByKey().on("child_added", function(snapshot) {
      var ticID = snapshot.key;
      db.child(ticID)
        .orderByKey()
        .on("child_added", function(snap) {
          var realticID = snap.val();
          db2
            .orderByKey()
            .equalTo(realticID)
            .on("child_added", function(snapshot) {
              console.log(snapshot.val());
              db2
                .child(realticID)
                .child("date")
                .once("value")
                .then(snapdate => {
                  //debugging purposes & BROKEN
                  // console.log(snapdate.val());
                  // this.setState({ date: snapdate.val() });
                  console.log(snapdate.val());
                });
              //BROKEN
              // db2.child(realticID).child('depature').on('value', function(snapdep){
              //   console.log(snapdep.val());
              //   this.setState({depature: snapdep.val()});
              // });
              // db2.child(realticID).child('destination').on('value', function(snapdes){
              //   console.log(snapdes.val());
              //   this.setState({destination: snapdes.val()});
              // });
              // db2.child(realticID).child('price').on('value', function(snappri){
              //   console.log(snappri.val());
              //   this.setState({price: snappri.val()});
              // });
              // db2.child(realticID).child('quantity').on('value', function(snapqtt){
              //   console.log(snapqtt.val());
              //   this.setState({qtt: snapqtt.val()});
              // });
              // db2.child(realticID).child('schedule').on('value', function(snapsd){
              //   console.log(snapsd.val());
              //   this.setState({schedule: snapsd.val()});
              // });
            });
          //DEBUGGING
          // console.log(snap.val());
        });
      //DEBUGGING
      // console.log(snapshot.key);
    });
  }

  // update the current time
  updateTime = () => {
    this.setState({ time: Date.now() });
  };

  toggleSignInDig = () => {
    this.signoutDig.MDComponent.show();
  };

  openInNewTab = () => {
    window.open('receipt.pdf')
  }

  //PARTIALLY BROKEN, WILL FIX OR DO FAKE
  render({ currentUser }, { time, count, user }) {
    return (
      <div class={style.profile}>
      <div className={[style.signout_dialog, "signout_dialog"].join(" ")}>
        <Dialog
        onCancel={this.onClose}
        onAccept={this.onClose}
        ref={signoutDig => {
          this.signoutDig = signoutDig;
        }}
        >
          <Dialog.Header>Your Ticket QR Code</Dialog.Header>
          <Dialog.Body>
          <img src="qr test png.png"></img>
          </Dialog.Body>
          <Dialog.Footer>
                <Dialog.FooterButton class={style.cancel_btn} accept>
                  Not now
                </Dialog.FooterButton>
              </Dialog.Footer>
        </Dialog>
        </div>
        <h1>
          {/* show the name, email and time */}
          Welcome{" "}
          {currentUser &&
            currentUser.displayName && <span>{currentUser.displayName}</span>}
        </h1>
        {currentUser && <h3>Email: {currentUser.email}</h3>}

        <div>
          <h3>Current time: {new Date(time).toLocaleString()}</h3>
        </div>
        {/* tickets bought by user or shown to admin */}
        <h2>Tickets</h2>
        <div class={style.tixcont}>
          <div>
            <h3>KL Sentral to KLIA2</h3>
          </div>
          <div class={style.tixdetailcont}>
            <div class={style.sec1}>
              <div>
                <div class={style.tixdate}>
                  <p style="font-weight: bold">18th Sept 2018</p>
                </div>
                <div class={style.tixtime}>
                  <p style="font-weight: bold">0900</p>
                </div>
                <p>Adult: 1</p>
              </div>
            </div>
            <div class={style.sec2}>
              <div class={style.qr} onClick={this.toggleSignInDig}>
                <i class="material-icons" id={style.icon}>
                  local_activity
                </i>
                <p>
                  <small>Show QR Code</small>
                </p>
              </div>
              <div class={style.print} onClick={this.openInNewTab}>
                <i class="material-icons" id={style.icon}>
                  local_printshop
                </i>
                <p>
                  <small>Print ticket</small>
                </p>
              </div>
              {/* <p>Purchased by UID: A01</p>
              <p>Transaction Date: 3rd Sept 2018</p> */}
            </div>
          </div>
        </div>
        <div class={style.tixcont}>
          <div>
            <h3>KLIA2 to KL Sentral</h3>
          </div>
          <div class={style.tixdetailcont}>
            <div class={style.sec1}>
              <div>
                <div class={style.tixdate}>
                  <p style="font-weight: bold">22th Sept 2018</p>
                </div>
                <div class={style.tixtime}>
                  <p style="font-weight: bold">2000</p>
                </div>
                <p>Adult: 1</p>
              </div>
            </div>
            <div class={style.sec2}>
              <div class={style.qr}>
                <i class="material-icons" id={style.icon}>
                  local_activity
                </i>
                <p>
                  <small>Show QR Code</small>
                </p>
              </div>
              <div class={style.print}>
                <i class="material-icons" id={style.icon}>
                  local_printshop
                </i>
                <p>
                  <small>Print ticket</small>
                </p>
              </div>
              {/* <p>Purchased by UID: A01</p>
              <p>Transaction Date: 3rd Sept 2018</p> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
