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

export default class Ticket extends Component {
  render() {
    return (
      <div>
        <div class={style.tixcont}>
          <h1>Ticket To KLIA2</h1>
          <div>
            <div class={style.date}>
              <h3>18th Sept 2018</h3>
            </div>
            <div class={style.quantity}>
              <h3>Quantity: 1</h3>
            </div>
          </div>
          <div class={style.Timecont}>
            <div class={style.cont} active>
              <div class={style.cont2}>
                <i class="material-icons" id={style.icon}>
                  train
                </i>
                <div>0700</div>
              </div>
              <div>
                <div>RM 55</div>
              </div>
            </div>
            <div class={style.cont}>
              <div class={style.cont2}>
                <i class="material-icons" id={style.icon}>
                  train
                </i>
                <div>0800</div>
              </div>
              <div>
                <div>RM 55</div>
              </div>
            </div>
            <div class={style.cont}>
              <div class={style.cont2}>
                <i class="material-icons" id={style.icon}>
                  train
                </i>
                <div>0930</div>
              </div>
              <div>
                <div>RM 40</div>
              </div>
            </div>
          </div>
          <Button raised ripple class={style.confirmbutton} href="/payment">
            Confirm
          </Button>
        </div>
      </div>
    );
  }
}
