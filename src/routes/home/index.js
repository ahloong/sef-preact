import { h, Component } from "preact";
import Button from "preact-material-components/Button";
import Select from "preact-material-components/Select";
import 'preact-material-components/Dialog/style.css';
import "preact-material-components/Card/style.css";
import "preact-material-components/List/style.css";
import "preact-material-components/Menu/style.css";
import "preact-material-components/Select/style.css";
import "preact-material-components/Button/style.css";
import "preact-material-components/Theme/style.css";
import { route } from "preact-router";
import style from "./style";


export default class Home extends Component {
  state = {
    chosenIndexFrSt: "Kl Sentral",
    chosenIndexToSt: "KLIA2",
    chosenIndexDtSt: "2018-10-01",
    chosenIndexQtSt: "1"
  }

  //listening for form changes and taking their values
  changeDropFr = e => {
    this.setState({
      chosenIndexFr: e.target.selectedIndex,
      chosenIndexFrSt: e.target.value
    });
  };

  changeDropTo = e => {
    this.setState({
      chosenIndexTo: e.target.selectedIndex,
      chosenIndexToSt: e.target.value
    });
  };

  changeDropDt = e => {
    this.setState({
      chosenIndexDtSt: e.target.value
    });
    console.log(e.target.value);
  }

  changeDropQt = e => {
    this.setState({
      chosenIndexQt: e.target.selectedIndex,
      chosenIndexQtSt: e.target.value
    });
  };

  //submit the form by taking the values then redirect to the ticket page
  submitform= () => {
    console.log(this.state.chosenIndexFrSt, this.state.chosenIndexToSt, this.state.chosenIndexQtSt, this.state.chosenIndexDtSt);
    route("/ticket?from=" + this.state.chosenIndexFrSt + "&to=" + this.state.chosenIndexToSt + "&date=" + this.state.chosenIndexDtSt
   + "&quantity=" + this.state.chosenIndexQtSt)
  };

  render() {
    return (
      <div>
        {/* the buy form */}
        <div class={style.buyContainer}>
          <div id="formHome" class={style.formContainer}>
            <div class={style.buyfrom}>
              <h1>Buy</h1>
              <h2>From</h2>
              <Select
                hintText=""
                selectedIndex={this.state.chosenIndexFr}
                onChange={this.changeDropFr}
              >
                <Select.Item>KL Sentral</Select.Item>
                <Select.Item>KLIA</Select.Item>
                <Select.Item>KLIA2</Select.Item>
              </Select>
            </div>
            <div class={style.buyto}>
              <h2>To</h2>
              <Select
                hintText=""
                selectedIndex={this.state.chosenIndexTo}
                onChange={this.changeDropTo}
              >
                <Select.Item>KLIA2</Select.Item>
                <Select.Item>KLIA</Select.Item>
                <Select.Item>KL Sentral</Select.Item>
              </Select>
            </div>
            <div class={style.buydate}>
              <h2>Date</h2>
              <input type="date" name="date" 
              value={this.state.chosenIndexDtSt}
              onChange={this.changeDropDt}/>
            </div>
            <div>
              <h2>Quantity</h2>
              <Select
                hintText=""
                selectedIndex={this.state.chosenIndexQt}
                onChange={this.changeDropQt}
              >
                <Select.Item>1</Select.Item>
                <Select.Item>2</Select.Item>
                <Select.Item>3</Select.Item>
              </Select>
            </div>
            <Button
              raised
              rippled
              class={style.searchbutton}
              onClick={this.submitform}
            >
              Search
            </Button>
          </div>
          {/* logo */}
          <div class={style.logo}>
            <img
              src="https://pbs.twimg.com/profile_images/953890598674620417/T6mcyYub_400x400.jpg"
              class={style.logo}
            />
          </div>
        </div>
        {/* the line overview under the home page */}
        <div>
          <div class={style.lineContainer}>
            <div class={style.lineText}>
              <h1>Line Overview</h1>
            </div>
            <div class={style.linepiccont}>
              <img src="klia express.png" class={style.linepic} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
