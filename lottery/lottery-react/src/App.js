import "./App.css";
import React from "react";
import web3 from "./web3";
import lottery from "./lottery";

class App extends React.Component {
  state = {
    manager: "",
    players: [],
    balance: "",
    messageWinner: "",
    message: "",
    value: "",
    winner: "",
    accounts: []
  }

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address)
    const accounts = await web3.eth.getAccounts();

    this.setState({ manager, players, balance, accounts });
  }

  handleSubmit = async (event) => {
    event.preventDefault();  
    
    if(!this.state.value || Number.parseFloat(this.state.value).toString() == "NaN") {
      this.setState({ message: "Please enter a number!" });
      setTimeout(() => {
        this.setState({ message: "" });
      }, 3000);
      return
    }
    this.setState({ message: "Waiting on transaction success..." });

    await lottery.methods.enter().send({
      from: this.state.accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({ message: "You have been entered!" });
    setTimeout(() => {
      this.setState({ message: "" });
    }, 3000);
  }

  pickWinner = async () => {
    const isManager = this.state.accounts.find(add => add == this.state.manager)

    if (isManager == undefined) {
      this.setState({ messageWinner: "only manager can pick winner!" })
      setTimeout(() => {
        this.setState({ messageWinner: "" });
      }, 3000);
      return
    }

    this.setState({ messageWinner: "Waiting on transaction success..." });

    await lottery.methods.pickWinner().send({
      from : isManager,
    })

    this.setState({ messageWinner: "A winner has been picked!" });
    setTimeout(() => {
      this.setState({ messageWinner: "" });
    }, 3000);
  }
  render() {
    return (
      <div className="App">
        <h1>Lottery Contract</h1>
        <p>This contract is managed by {this.state.manager}</p>
        <p>There are currently {this.state.players.length} players competing for {web3.utils.fromWei(this.state.balance, 'ether')} ether!</p>

        <hr />
        <div>

          <h3>Enter the lottery</h3>
          <p>Enter some ether to get entered in the lottery</p>
          <form onSubmit={this.handleSubmit}>
            <label>Amount of ether to enter</label>
            <input
              type="text"
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
            <button type="submit">Enter</button>
          </form>
          <p>{this.state.message}</p>
        </div>

        <hr />

        <div>
          <h3>Pick a winner</h3>
          <button onClick={this.pickWinner}>Pick a winner</button>
          <p>{this.state.messageWinner}</p>
        </div>
      </div>
    );
  }
}
export default App;
