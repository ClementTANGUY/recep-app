import React, { Component } from 'react';

// Création d'un context et définition de son provider afin de le rendre où l'on veut dans l'application
const ColorContext = React.createContext();

class ColorProvider extends Component {
  state = {
    color: 'orange'
  };

  render() {
    return (
      <ColorContext.Provider
        value={{
          state: this.state
        }}
      >
        {this.props.children}
      </ColorContext.Provider>
    );
  }
}

export { ColorContext };

export default ColorProvider;
