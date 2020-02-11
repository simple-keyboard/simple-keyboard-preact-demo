import "./style";
import { Component, render } from "preact";
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layoutName: "default",
      input: ""
    };
  }

  componentDidMount() {
    this.keyboard = new Keyboard({
      layoutName: this.state.layoutName,
      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button)
    });
  }

  onChange = input => {
    this.setState({
      input: input
    });
    console.log("Input changed", input);
  };

  onKeyPress = button => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  handleShift = () => {
    const layoutName =
      this.state.layoutName === "default" ? "shift" : "default";

    this.setState({ layoutName });
    this.keyboard.setOptions({ layoutName });
  };

  onChangeInput = event => {
    const input = event.target.value;
    this.setState({ input });
    this.keyboard.setInput(input);
  };

  render() {
    return (
      <div>
        <input
          value={this.state.input}
          placeholder={"Tap on the virtual keyboard to start"}
          onInput={this.onChangeInput}
        />
        <div className={"simple-keyboard"} />
      </div>
    );
  }
}

if (typeof window !== "undefined") {
  render(<App />, document.getElementById("root"));
}
