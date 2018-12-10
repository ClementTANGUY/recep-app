import React from 'react';

// Component stateless, on peut définir directement une fonction fléchée sans render et return

const Login = ({ authenticate }) => {
  return (
    <div className="login">
      <h2>Connecte-toi pour créer tes recettes</h2>
      <button onClick={authenticate} className="facebook-button">
        Me connecter avec Facebook
      </button>
    </div>
  );
};

export default Login;
