import React, { Component } from 'react';

// Component de Class afin de charger les données recettes à l'aide d'un bouton
class Admin extends Component {
  render() {
    return (
      <footer>
        <button onClick={this.props.Seed}>Remplir</button>
      </footer>
    );
  }
}

export default Admin;
