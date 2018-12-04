import React, { Component } from 'react';
// CSS
import './App.css';

import Header from './components/Header';
import Admin from './components/Admin';
import Card from './components/Card';

import recettes from './recettes';

import base from './base';

class App extends Component {
  state = {
    pseudo: this.props.match.params.pseudo,
    recettes: {}
  };

  componentDidMount() {
    this.ref = base.syncState(`/${this.state.pseudo}/recettes`, {
      context: this,
      state: 'recettes'
    });
  }

  //On s'assure qu'on ne peut écraser des données apartenant à un autre pseudo
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  seed = () => this.setState({ recettes });

  render() {
    const cards = Object.keys(this.state.recettes).map(key => (
      <Card key={key} details={this.state.recettes[key]} />
    ));

    return (
      <div className="box">
        <Header pseudo={this.state.pseudo} />
        <div className="cards">
          <div className="card">{cards}</div>
        </div>
        <Admin Seed={this.seed} />
      </div>
    );
  }
}

export default App;
