import { h, Component } from "preact";
import "preact-material-components/Card/style.css";
import "preact-material-components/Button/style.css";
import "preact-material-components/List/style.css";
import "preact-material-components/Menu/style.css";
import "preact-material-components/Select/style.css";
import "preact-material-components/Button/style.css";
import "preact-material-components/Theme/style.css";
import style from "./style";
import  firebase  from '../firebase';
import { route } from "preact-router";

export default class Ticket extends Component {

  state = {
    yellow: '7',
    red: '3'
  }

  componentWillMount() {
    //get the values from the home page after pressing the button
    var params = new URLSearchParams(document.location.search.substring(1));
    var from = params.get("from");
    var to = params.get('to');
    var date = params.get("date");
    var quantity = params.get("quantity");
    //get the values from firebase
    var dbS01 = firebase.database().ref("schedule/S01/");
    var dbS02 = firebase.database().ref("schedule/S02/");
    var dbS03 = firebase.database().ref("schedule/S03/");
    dbS01.child("price").once('value').then(snapshot => {
      this.setState({priceS01: snapshot.val()});
    });
    dbS01.child("time").once('value').then(snapshot => {
      this.setState({timeS01: snapshot.val()});
    });
    dbS02.child("price").once('value').then(snapshot => {
      this.setState({priceS02: snapshot.val()});
    });
    dbS02.child("time").once('value').then(snapshot => {
      this.setState({timeS02: snapshot.val()});
    });
    dbS03.child("price").once('value').then(snapshot => {
      this.setState({priceS03: snapshot.val()});
    });
    dbS03.child("time").once('value').then(snapshot => {
      this.setState({timeS03: snapshot.val()});
    });
    dbS01.child('ticketnum').once('value').then(snapshot =>{
      this.setState({ ticnumS01: snapshot.val() });
    });
    dbS02.child('ticketnum').once('value').then(snapshot =>{
      this.setState({ ticnumS02: snapshot.val() });
    });
    dbS03.child('ticketnum').once('value').then(snapshot =>{
      this.setState({ ticnumS03: snapshot.val() });
    });
    this.setState({
      from : from,
      to : to,
      date : date,
      quantity : quantity,
    });
  }
  
  //grab all including the previous values from the
  // home page values after choosing the price and time 
  grabS01 = () => {
    // firebase.database().ref("schedule/S01/ticketnum").transaction(update => {
    //   return (update) -1;
    // });
    console.log(this.state.priceS01, this.state.timeS01, this.state.from, this.state.to, 
      this.state.date, this.state.quantity, this.state.ticnumS01);
    route("/payment?from=" + this.state.from + "&to=" + this.state.to + "&date=" + this.state.date
   + "&quantity=" + this.state.quantity + "&price=" + this.state.priceS01 + "&time=" 
   + this.state.timeS01 +"&SID=S01")
  };

  grabS02 = () => {
    // firebase.database().ref("schedule/S02/ticketnum").transaction(update => {
    //   return (update) -1;
    // });
    console.log(this.state.priceS02, this.state.timeS02, this.state.from, this.state.to, 
      this.state.date, this.state.quantity, this.state.ticnumS02);
    route("/payment?from=" + this.state.from + "&to=" + this.state.to + "&date=" + this.state.date
   + "&quantity=" + this.state.quantity + "&price=" + this.state.priceS02 + "&time=" 
   + this.state.timeS02 +"&SID=S02")
  };

  grabS03 = () => {
    // firebase.database().ref("schedule/S03/ticketnum").transaction(update => {
    //   return (update) -1;
    // });
    console.log(this.state.priceS03, this.state.timeS03, this.state.from, this.state.to, 
      this.state.date, this.state.quantity, this.state.ticnumS03);
    route("/payment?from=" + this.state.from + "&to=" + this.state.to + "&date=" + this.state.date
   + "&quantity=" + this.state.quantity + "&price=" + this.state.priceS03 + "&time=" 
   + this.state.timeS03 +"&SID=S03" + "&ticnum=" + this.state.ticnumS03)
  };

  render() {
    let statusS01, statusS02, statusS03;
    if (this.state.ticnumS01 < this.state.red) {
      statusS01 = (
        <div class={style.textred}>Sold Out Soon</div>
      )
    }else if (this.state.ticnumS01 < this.state.yellow) {
      statusS01 = (
        <div class={style.textyellow}>Selling Fast</div>
      )
    }else {
      statusS01 = (
        <div class={style.textgreen}>Availble</div>
      )
    }

    if (this.state.ticnumS02 < this.state.red) {
      statusS02 = (
        <div class={style.textred}>Sold Out Soon</div>
      )
    }else if (this.state.ticnumS02 < this.state.yellow) {
      statusS02 = (
        <div class={style.textyellow}>Selling Fast</div>
      )
    }else {
      statusS02 = (
        <div class={style.textgreen}>Availble</div>
      )
    }

    if (this.state.ticnumS03 < this.state.red) {
      statusS03 = (
        <div class={style.textred}>Sold Out Soon</div>
      )
    }else if (this.state.ticnumS03 < this.state.yellow) {
      statusS03 = (
        <div class={style.textyellow}>Selling Fast</div>
      )
    }else {
      statusS03 = (
        <div class={style.textgreen}>Availble</div>
      )
    }
    return (
      <div>
        {/* the container that show the destination, date, quantity */}
        <div class={style.tixcont}>
          <h1>Ticket To {this.state.to}</h1>
          <div>
            <div class={style.date}>
              <h3>{this.state.date}</h3>
            </div>
            <div class={style.quantity}>
              <h3>Quantity: {this.state.quantity}</h3>
            </div>
          </div>
          {/* the container that show the time and price */}
          <div class={style.Timecont}>
            <div class={style.cont}
            onClick={this.grabS01}>
              <div class={style.contCont}>
                <i class="material-icons" id={style.icon}>
                  train
                </i>
                <div>
                {this.state.timeS01}
                </div>
              </div>
              <div>
                <div class={style.price}>
                RM {this.state.priceS01}
                </div>
                { statusS01 }
              </div>
            </div>
            <div class={style.cont}
            onClick={this.grabS02}>
              <div class={style.contCont}>
                <i class="material-icons" id={style.icon}>
                  train
                </i>
                <div>{this.state.timeS02}</div>
              </div>
              <div>
                <div class={style.price}>RM {this.state.priceS02}</div>
                <div>
                  { statusS02 }
                </div>
              </div>
            </div>
            <div class={style.cont}
            onClick={this.grabS03}>
              <div class={style.contCont}>
                <i class="material-icons" id={style.icon}>
                  train
                </i>
                <div>{this.state.timeS03}</div>
              </div>
              <div>
                <div class={style.price}>RM {this.state.priceS03}</div>
                <div>
                  { statusS03 } 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
