import React from 'react';
// CSS
import './App.css';

// Components
import Header from './components/Header';
import Admin from './components/Admin';
import Card from './components/Card';

// HOC
import withFirebase from './HOC/withFirebase';

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
  );
};

const WrappedComponent = withFirebase(App);

export default WrappedComponent;
