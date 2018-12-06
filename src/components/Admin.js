import React, { Component } from 'react';
import AdminForm from './AdminForm';

import Addrecepe from './Addrecepe';
// Component dans lequel on ajoute toutes les actions, comme charger le seed à l'aide d'un bouton ou créer, mettre à jour et supprimer une nouvelle recette
// Rappel: dans les components de Class, on importe les props sous la forme this.props, on peut le faire en déstructuré sans this.props en créant des constantes
class Admin extends Component {
  render() {
    const {
      recettes,
      addRecepe,
      updateRecepe,
      deleteRecepe,
      seed
    } = this.props;

    return (
      <div className="cards">
        <Addrecepe addRecepe={addRecepe} />
        {Object.keys(recettes).map(key => (
          <AdminForm
            key={key}
            id={key}
            recettes={recettes}
            updateRecepe={updateRecepe}
            deleteRecepe={deleteRecepe}
          />
        ))}
        <footer>
          <button onClick={seed}>Charger des exemples de recettes</button>
        </footer>
      </div>
    );
  }
}

export default Admin;
