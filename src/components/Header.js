import React from 'react';

// Importation du contexte et implémentation de son consumer autour du header
import { ColorContext } from './Color';

// Component stateless, on peut définir directement une fonction fléchée, sans render ni return
//Grâce à une regex et une condition ternaire, on test notre pseudo afin de savoir si sa première lettre est une voyelle ou et de renvoyer "La boîte à recette d' ou de"
const Header = ({ pseudo }) => {
  const formatPseudo = pseudo =>
    /[aeiouy]/i.test(pseudo[0]) ? `d'${pseudo}` : `de ${pseudo}`;

  return (
    <ColorContext.Consumer>
      {context => (
        <header style={{ backgroundColor: context.state.color }}>
          <h1>La boîte à recettes {formatPseudo(pseudo)}</h1>
        </header>
      )}
    </ColorContext.Consumer>
  );
};

export default Header;
