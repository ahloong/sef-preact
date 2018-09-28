import { h, Component } from "preact";
import Button from "preact-material-components/Button";
import "preact-material-components/Card/style.css";
import "preact-material-components/Button/style.css";
import "preact-material-components/List/style.css";
import "preact-material-components/Menu/style.css";
import "preact-material-components/Select/style.css";
import "preact-material-components/Button/style.css";
import "preact-material-components/Theme/style.css";
import style from "./style";
import { firebase } from "@firebase/app";
import { route } from "preact-router";

export default class Ticket extends Component {


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
    console.log(this.state.priceS01, this.state.timeS01, this.state.from, this.state.to, this.state.date, this.state.quantity);
    route("/payment?from=" + this.state.from + "&to=" + this.state.to + "&date=" + this.state.date
   + "&quantity=" + this.state.quantity + "&price=" + this.state.priceS01 + "&time=" + this.state.timeS01 +"&SID=S01")
  };

  grabS02 = () => {
    console.log(this.state.priceS02, this.state.timeS02, this.state.from, this.state.to, this.state.date, this.state.quantity);
    route("/payment?from=" + this.state.from + "&to=" + this.state.to + "&date=" + this.state.date
   + "&quantity=" + this.state.quantity + "&price=" + this.state.priceS02 + "&time=" + this.state.timeS02 +"&SID=S02")
  };

  grabS03 = () => {
    console.log(this.state.priceS03, this.state.timeS03, this.state.from, this.state.to, this.state.date, this.state.quantity);
    route("/payment?from=" + this.state.from + "&to=" + this.state.to + "&date=" + this.state.date
   + "&quantity=" + this.state.quantity + "&price=" + this.state.priceS03 + "&time=" + this.state.timeS03 +"&SID=S03")
  };

  render() {
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
                <div class={style.textyellow}>Selling Fast</div>
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
                <div class={style.textred}>Sold Out Soon</div>
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
                <div class={style.textgreen}>Availble</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
