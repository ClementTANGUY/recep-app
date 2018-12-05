import React, { Component } from 'react';

import Addrecepe from './Addrecepe';
// Component dans lequel on ajoute toutes les actions d'"enrichissement", comme charger le seed à l'aide d'un bouton ou créer une nouvelle recette
// Rappel: dans les components de Class, on importe les props sous la forme this.props. et non en déstructuré sans this.props.
class Admin extends Component {
  render() {
    return (
      <div className="cards">
        <Addrecepe addRecepe={this.props.addRecepe} />
        <footer>
          <button onClick={this.props.Seed}>
            Charger des exemples de recettes
          </button>
        </footer>
      </div>
    );
  }
}

export default Admin;
