import { h, Component } from "preact";
import Button from "preact-material-components/Button";
import Select from "preact-material-components/Select";
import "preact-material-components/Card/style.css";
import "preact-material-components/List/style.css";
import "preact-material-components/Menu/style.css";
import "preact-material-components/Select/style.css";
import "preact-material-components/Button/style.css";
import "preact-material-components/Theme/style.css";
import TextField from "preact-material-components/TextField";
import "preact-material-components/TextField/style.css";
import style from "./style";

export default class Payment extends Component {
  render() {
    return (
      <div>
        <div class={style.summarycont}>
          <h1>Ticket Summary</h1>
          <div>
            <h2>KL Sentral To KLIA2</h2>
            <h2>18th Sept 2018</h2>
          </div>
          <div>
            <h3>0900</h3>
          </div>
          <div>
            <h3>1 Adult</h3>
          </div>
          <div class={style.cardform}>
            <form>
              <p>Card Number</p>
              <TextField label="Card Number" outlined />
              <p>Cardholder Name</p>
              <TextField label="Cardholder Name" outlined />
              <p>CVC</p>
              <TextField type="password" maxlength="3" label="CVC" outlined />
              <p>Expiry Date</p>
              <TextField label="Expiry Date" outlined />
              <div>
                <Button raised ripple>
                  Confirm
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
