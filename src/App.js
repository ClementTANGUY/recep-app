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

  // Cycles de vie de React
  componentDidMount() {
    this.ref = base.syncState(`/${this.state.pseudo}/recettes`, {
      context: this,
      state: 'recettes'
    });
  }

  // On s'assure qu'on ne peut écraser des données apartenant à un autre pseudo
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  // Méthodes personalisées

  addRecepe = recepe => {
    const recettes = { ...this.state.recettes };
    recettes[`recepe-${Date.now()}`] = recepe;
    this.setState({ recettes });
  };

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
        <Admin addRecepe={this.addRecepe} Seed={this.seed} />
      </div>
    );
  }
}

export default App;
