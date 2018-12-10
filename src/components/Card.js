import React from 'react';

// Component stateless, on peut définir directement une fonction fléchée

const Card = ({ details }) => {
  //On implémente des constantes permettant de splitter les chaînes de caractères obtenues après itération du state principal et de boucler à nouveau sur celles-ci afin de rendre des éléments de listes
  const ingredients = details.ingredients
    .split(',')
    .map(item => <li key={item}>{item}</li>);

  const instructions = details.instructions
    .split('\n')
    .map(item => <li key={item}>{item}</li>);

  //On définit le chemin vers les images: on en retourne une par défaut en cas d'erreur d'url
  const requireImage = chemin => {
    try {
      return require(`../img/${chemin}`);
    } catch (err) {
      return require(`../img/default.jpeg`);
    }
  };

  return (
    <div className="card">
      <div className="image">
        {/*Les image sont importées via webpack sous la forme d'une fonction*/}
        <img src={requireImage(details.image)} alt={details.nom} />
      </div>

      <div className="recette">
        <h2>{details.nom}</h2>
        <ul className="liste-ingredients">{ingredients}</ul>
        <ol className="liste-instructions">{instructions}</ol>
      </div>

      {/*<p>{antho}</p>*/}
    </div>
  );
};

export default Card;
