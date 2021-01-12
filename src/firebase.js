import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCOnkl6bOYp81xFnYkKXTNkcrb2jP-QQrk",
  authDomain: "todo-d82a9.firebaseapp.com",
  databaseURL: "https://todo-d82a9-default-rtdb.firebaseio.com",
  projectId: "todo-d82a9",
  storageBucket: "todo-d82a9.appspot.com",
  messagingSenderId: "855415412029",
  appId: "1:855415412029:web:c7428a6665961c6a6c2154",
  measurementId: "G-LC1Z924LZW"
};
firebase.initializeApp(firebaseConfig);

class fire {

  async createUser(info,cf) {
    try {
      await firebase.auth()
      .createUserWithEmailAndPassword(info.email, info.pass);
      await firebase.auth().currentUser.updateProfile({ displayName: info.name });
      cf.displayName();
      cf.closeModal();
      
    }
    catch (error) {
      alert(error);
    }
  }

  emailLogin(Email, Pass) {
    firebase.auth().signInWithEmailAndPassword(Email, Pass)
      .then(() => console.log('success'))
      .catch((error) => {
        var errorMessage = error.message;
        alert(errorMessage);
      });
  }
// 구글로그인
  login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  }
  logout() {
    firebase.auth().signOut();
  }

   itemSave(info) {
    firebase.database().ref(`items/${info.uid}`).set(info)
    .then(()=>console.log('저장성공'))
    .catch((e)=>console.log(e)) 
    
  }

  onAuth(cf) {
    firebase.auth().onAuthStateChanged(e => cf(e))
  }
}

export { fire, firebase }
