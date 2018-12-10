import React, { Component } from 'react';

import recettes from '../recettes';

// Database
import base from '../base';

const withFirebase = WrappedComponent =>
  class HOC extends Component {
    state = {
      pseudo: this.props.match.params.pseudo,
      recettes: {}
    };

    /*Nous aurions pu définir le state via un constructor mais la syntaxe est plus lourde, on peut le trouver avant ES6 sans les fonctions fléchées et le destructuring
    constructor (props) {
      super(props)
      this.state = {
        pseudo: this.props.match.params.pseudo,
        recettes: {},
        update: false
      }
    }*/

    // Cycles de vie de React
    componentDidMount() {
      this.ref = base.syncState(`/${this.state.pseudo}/recettes`, {
        context: this,
        state: 'recettes'
      });
    }

    // Pas de setState dans un component DidUpdate le cas échéant sauf avec condition

    componentWillUnmount() {
      // On s'assure qu'on ne peut écraser des données apartenant à un autre pseudo
      base.removeBinding(this.ref);
    }

    // Méthodes ou fonctions personalisées

    // Fonctions de mise à jour du state principal, l'objet recettes
    addRecepe = recepe => {
      const recettes = { ...this.state.recettes };
      recettes[`recepe-${Date.now()}`] = recepe;
      this.setState({ recettes });
    };

    updateRecepe = (key, newRecepe) => {
      const recettes = { ...this.state.recettes };
      recettes[key] = newRecepe;
      this.setState({ recettes });
    };

    deleteRecepe = key => {
      const recettes = { ...this.state.recettes };
      recettes[key] = null;
      this.setState({ recettes });
    };

    seed = () => this.setState({ recettes });

    render() {
      return (
        <WrappedComponent
          recettes={this.state.recettes}
          addRecepe={this.addRecepe}
          updateRecepe={this.updateRecepe}
          deleteRecepe={this.deleteRecepe}
          seed={this.seed}
          {...this.props}
        />
      );
    }
  };

export default withFirebase;
