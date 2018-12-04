import React from 'react';

//Grâce à une regex et une condition ternaire, on test notre pseudo afin de savoir si sa première lettre est une voyelle ou et de renvoyer "La boîte à recette d' ou de"
const Header = ({ pseudo }) => {
  const formatPseudo = pseudo =>
    /[aeiouy]/i.test(pseudo[0]) ? `d'${pseudo}` : `de ${pseudo}`;

  return (
    <header>
      <h1>La boîte à recettes {formatPseudo(pseudo)}</h1>
    </header>
  );
};

export default Header;
