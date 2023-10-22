import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { HomePage } from "./pages/HomePage";

const contact = {
  name: 'João',
  lastName: 'da Silva',
  email: 'joao@teste.com'
}

function getFullName(contact) {
  return `${contact.name} ${contact.lastName}`;
}

function showName(){
  alert(contact.name);
}

function HeaderApp({ title, subtitle }) {
  return (
    <div>
      <h1>{title}</h1>
      <h3>{subtitle}</h3>
    </div>
  );
}

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
    };
    console.log("Chamou constructor");
  }

  incrementCounter = () => {
    const total = this.state.total + 1;

    console.log("Chamando setState");

    this.setState({ total });
  };

  render() {
    console.log("Chamou render");
    return (
      <div>
        <h3>O total de clicks é {this.state.total}</h3>
        <button onClick={this.incrementCounter}>Click aqui</button>
      </div>
    );
  }

  componentDidMount() {
    console.log("Chamou componentDidMount");
  }

  componentDidUpdate() {
    console.log("Chamou componentDidUpdate");
  }
}

function MyList() {
  const [fruits, setFruits] = useState([]);

  useEffect(() => {
    function fetchData() {
      setTimeout(() => {
        setFruits(["Banana", "Maça", "Acerola"]);
      }, 3000);
    }
    fetchData();
  }, []);

  const items = fruits.map((item) => <li key={item}>{item}</li>);
  return <ul>{items}</ul>;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<HomePage />);
