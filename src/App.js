import React from 'react';
import PropTypes from 'prop-types';
// CSS
import './App.css';

// Components
import Header from './components/Header';
import Admin from './components/Admin';
import Card from './components/Card';

// HOC permettant d'alléger au max la syntaxe du Component principal App
import withFirebase from './HOC/withFirebase';

// Contexte
import ColorContext from './components/Color';

const App = ({
  match,
  recettes,
  addRecepe,
  updateRecepe,
  deleteRecepe,
  seed
}) => {
  const cards = Object.keys(recettes).map(key => (
    <Card key={key} details={recettes[key]} />
  ));

  return (
    <ColorContext>
      <div className="box">
        <Header pseudo={match.params.pseudo} />
        <div className="cards">
          <div className="card">{cards}</div>
        </div>
        <Admin
          pseudo={match.params.pseudo}
          recettes={recettes}
          addRecepe={addRecepe}
          updateRecepe={updateRecepe}
          deleteRecepe={deleteRecepe}
          seed={seed}
        />
      </div>
    </ColorContext>
  );
};

// PropTypes requis afin de débugger plus aisément le cas échéant
App.propTypes = {
  match: PropTypes.object.isRequired,
  recettes: PropTypes.object.isRequired,
  addRecepe: PropTypes.func.isRequired,
  updateRecepe: PropTypes.func.isRequired,
  deleteRecepe: PropTypes.func.isRequired,
  seed: PropTypes.func.isRequired
};

// Contexte injecté grâce à un component ColorContext que l'on wrap ici autour le l'App
const WrappedComponent = withFirebase(App);

export default WrappedComponent;
