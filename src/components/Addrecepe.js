import React, { Component } from 'react';

class addRecepe extends Component {
  state = {
    nom: '',
    image: '',
    ingredients: '',
    instructions: ''
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const recepe = { ...this.state };
    this.props.addRecepe(recepe);
    // Reset form
    Object.keys(recepe).forEach(item => {
      recepe[item] = '';
    });
    this.setState({ ...recepe });
  };

  render() {
    return (
      <div className="card">
        <form
          className="admin-form ajouter-recette"
          onSubmit={this.handleSubmit}
        >
          <input
            value={this.state.nom}
            onChange={this.handleChange}
            name="nom"
            type="text"
            placeholder="Nom du plat"
          />
          <input
            value={this.state.image}
            onChange={this.handleChange}
            name="image"
            type="text"
            placeholder="Fichier image"
          />
          <textarea
            value={this.state.ingredients}
            onChange={this.handleChange}
            name="ingredients"
            rows="3"
            placeholder="Liste des ingrédients (séparez-les par une virgule)"
          />
          <textarea
            value={this.state.instructions}
            onChange={this.handleChange}
            name="instructions"
            rows="15"
            placeholder="Instructions (allez à la ligne après chacune)"
          />
          <button type="submit">Ajouter</button>
        </form>
      </div>
    );
  }
}

export default addRecepe;
