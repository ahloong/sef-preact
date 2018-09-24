import { h, Component } from "preact";
import Button from "preact-material-components/Button";
import "preact-material-components/Button/style.css";
import style from "./style";

export default class Profile extends Component {
  state = {
    time: Date.now(),
    count: 12,
    user: null
  };

  // gets called when this route is navigated to
  componentDidMount() {
    // start a timer for the clock:
    this.timer = setInterval(this.updateTime, 1000);
    console.log(this.state.currentUser);
  }

  // componentWillReceiveProps(props) {
  //   console.log(props.currentUser);
  //   this.setState({ asd: props.currentUser });
  // }

  // gets called just before navigating away from the route
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  // update the current time
  updateTime = () => {
    this.setState({ time: Date.now() });
  };

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  // Note: `user` comes from the URL, courtesy of our router
  render({ currentUser }, { time, count, user }) {
    return (
      <div class={style.profile}>
        <h1>
          Welcome{" "}
          {currentUser &&
            currentUser.displayName && <span>{currentUser.displayName}</span>}
        </h1>
        {currentUser && <h3>Email: {currentUser.email}</h3>}

        <div>
          <h3>Current time: {new Date(time).toLocaleString()}</h3>
        </div>
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
              {/* <div class={style.qr}>
                <i class="material-icons" id={style.icon}>
                  local_activity
                </i>
                <p>
                  <small>Show QR Code</small>
                </p>
              </div> */}
              <div class={style.print}>
                <i class="material-icons" id={style.icon}>
                  local_printshop
                </i>
                <p>
                  <small>Print ticket</small>
                </p>
              </div>
              <p>Purchased by UID: A01</p>
              <p>Transaction Date: 3rd Sept 2018</p>
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
              {/* <div class={style.qr}>
                <i class="material-icons" id={style.icon}>
                  local_activity
                </i>
                <p>
                  <small>Show QR Code</small>
                </p>
              </div> */}
              <div class={style.print}>
                <i class="material-icons" id={style.icon}>
                  local_printshop
                </i>
                <p>
                  <small>Print ticket</small>
                </p>
              </div>
              <p>Purchased by UID: A01</p>
              <p>Transaction Date: 3rd Sept 2018</p>
            </div>
          </div>
        </div>

        <p>
          <Button
            raised
            ripple
            onClick={this.increment}
            style="background-color: #d32f2f"
          >
            Log Out
          </Button>{" "}
        </p>
      </div>
    );
  }
}
