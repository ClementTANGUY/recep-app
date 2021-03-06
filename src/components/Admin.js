import React, { Component } from 'react';
import AdminForm from './AdminForm';
import Addrecepe from './Addrecepe';
import Login from './Login';

import firebase from 'firebase/app';
import 'firebase/auth';
import base, { firebaseApp } from '../base';

/*Component Admin dans lequel on ajoute les actions de l'utilisateur connecté, comme charger le seed ou créer, mettre à jour et supprimer une recette*/
class Admin extends Component {
  state = {
    uid: null,
    cook: null
  };

  /*Permet de ne pas être déconnecté à chaque cycle de vie grâce à la persistence du cache de Firebase
  On appelle alors la fonction handleAuth comme lors du login initial mais immédiatement à chaque changement de state (au chargement du component) afin de voir si un pseudo Firebase est toujours connecté sans s'être déconnecté
  On passe alors l'argument sous forme du sous-objet "user" de authData*/
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.handleAuth({ user });
      }
    });
  }

  // La fonction handleAuth permet de récupérer l'id utilisateur du compte Facebook tout en attendant que Firebase fasse son travail de sauvegarde des données (await)
  handleAuth = async authData => {
    const box = await base.fetch(this.props.pseudo, { context: this });
    if (!box.cook) {
      await base.post(`${this.props.pseudo}/cook`, {
        data: authData.user.uid
      });
    }
    // Le state est mis à jour avec l'id utilisateur Facebook du pseudo si cela n'est pas déjà fait
    this.setState({
      uid: authData.user.uid,
      cook: box.cook || authData.user.uid
    });
  };

  // Log In grâce à Facebook qui ouvre un pop up, se connectant à Firebase
  authenticate = () => {
    const authProvider = new firebase.auth.FacebookAuthProvider();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.handleAuth);
  };

  logOut = async () => {
    console.log('Déconnexion');
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };

  render() {
    // Rappel: dans les components de Class, on importe les props sous la forme "this.props.", on peut aussi le faire en déstructuré sans "this.props." en créant des constantes
    const {
      recettes,
      addRecepe,
      updateRecepe,
      deleteRecepe,
      seed
    } = this.props;

    // Bouton de déconnexion
    const logOut = <button onClick={this.logOut}>Déconnexion</button>;

    // Si l'utilisateur n'est pas connecté, on retourne le component Login
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }

    // Si l'utilisateur n'est pas le chef
    if (this.state.uid !== this.state.cook)
      return (
        <div>
          <p>Tu n'es pas le chef de cette boîte !</p>
          {logOut}
        </div>
      );

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
          {logOut}
          <button onClick={seed}>Charger des exemples de recettes</button>
        </footer>
      </div>
    );
  }
}

export default Admin;
