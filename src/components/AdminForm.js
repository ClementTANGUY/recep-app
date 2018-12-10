import React from 'react';

// Component stateless, on peut définir directement une fonction fléchée, sans render ni return

const AdminForm = ({ id: key, updateRecepe, deleteRecepe, recettes }) => {
  // Détermine quelle recette on met à jour grâce à sa clé
  const recepe = recettes[key];

  const handleChange = (event, key) => {
    // Trouve le champs nom et la valeur qu'on lui rentre
    const { name, value } = event.target;
    // Crée une nouvelle const qui est la recette concernée par cette clé
    const recepe = recettes[key];
    // Remplace le champ nom par sa nouvelle valeur
    recepe[name] = value;
    // Met à jour la recette dans le state global
    updateRecepe(key, recepe);
  };
  return (
    <div className="card">
      <form className="admin-form">
        <input
          value={recepe.nom}
          onChange={e => handleChange(e, key)}
          type="text"
          name="nom"
          placeholder="Nom du plat"
        />
        <input
          value={recepe.image}
          onChange={e => handleChange(e, key)}
          type="text"
          name="image"
          placeholder="Fichier image"
        />
        <textarea
          value={recepe.ingredients}
          onChange={e => handleChange(e, key)}
          type="text"
          name="ingredients"
          rows="3"
          placeholder="Liste des ingrédients (séparez-les par une virgule)"
        />
        <textarea
          value={recepe.instructions}
          onChange={e => handleChange(e, key)}
          type="text"
          name="instructions"
          rows="15"
          placeholder="Instructions (allez à la ligne après chacune)"
        />
      </form>
      {/*Fonction fléchée car se déclenche au click et non au chargement du DOM et besoin de passer la clé de la recette comme argument*/}
      <button onClick={() => deleteRecepe(key)}>Supprimer</button>
    </div>
  );
};

export default AdminForm;
