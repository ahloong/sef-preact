import { h, Component } from "preact";
import Button from "preact-material-components/Button";
import Select from "preact-material-components/Select";
import "preact-material-components/Card/style.css";
import "preact-material-components/List/style.css";
import "preact-material-components/Menu/style.css";
import "preact-material-components/Select/style.css";
import "preact-material-components/Button/style.css";
import "preact-material-components/Theme/style.css";
import style from "./style";

export default class Home extends Component {
  changeDrop = () => e => {
    this.setState({
      chosenIndex: e.selectedIndex
    });
  };
  render() {
    return (
      <div>
        <div class={style.buyContainer}>
        
          <form id="formHome" class={style.formContainer}>
            <div class={style.buyfrom}>
              <h1>Buy</h1>
              <h2>From</h2>
              <Select
                hintText=""
                selectedIndex={this.state.chosenIndex}
                onChange={this.changeDrop}
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
                selectedIndex={this.state.chosenIndex}
                onChange={this.changeDrop}
              >
                <Select.Item>KLIA2</Select.Item>
                <Select.Item>KLIA</Select.Item>
                <Select.Item>KL Sentral</Select.Item>
              </Select>
            </div>
            <div class={style.buydate}>
              <h2>Date</h2>
              <input type="date" name="date" />
            </div>
            <div>
              <h2>Quantity</h2>
              <Select
                hintText=""
                selectedIndex={this.state.chosenIndex}
                onChange={this.changeDrop}
              >
                <Select.Item>1</Select.Item>
                <Select.Item>2</Select.Item>
                <Select.Item>3</Select.Item>
              </Select>
            </div>
            <Button raised rippled class={style.searchbutton}>
              Search
            </Button>
          </form>
          <div class={style.logo}>
        <img src="https://pbs.twimg.com/profile_images/953890598674620417/T6mcyYub_400x400.jpg" class={style.logo}></img>
        </div>
        </div>
        <div>
          <div class={style.lineContainer}>
            <div class={style.lineText}>
              <h1>Line Overview</h1>
            </div>
            <div class={style.linepiccont}>
              <img
                src="klia express.png"
                class={style.linepic}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
