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

  //회원가입
  async createUser(info, cf) {
    try {
      await firebase.auth()
        .createUserWithEmailAndPassword(info.email, info.pass)
        .then((e) => {
          firebase.database().ref(`auth/${e.user.uid}`).set(info)
            .then(() => console.log('회원정보 저장성공'))
            .catch((e) => console.log(e))
        })
      await firebase.auth().currentUser.updateProfile({ displayName: info.name });
      cf.displayName();
      cf.closeModal();
      console.log('회원가입 완료');
    }
    catch (error) {
      alert(error);
    }
  }
  // 이메일로그인
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
  // 글 데이터저장 
  dataSave(data) {
    firebase.database().ref(`items/${data.uid}/${data.dataId}`).set(data)
      .then(() => console.log('글 저장성공'))
      .catch((e) => console.log(e))
  }
  //회원정보 SYNC
  async onAuth(cf) {
    firebase.auth().onAuthStateChanged(e => cf(e));
  }

  // 데이터 SYNC
  itemSync(uid,cf) {
    const ref = firebase.database().ref(`items/${uid}`);
    ref.on('value', (p) => {
      const data = p.val();
      data ? cf.cf1(data) :cf.cf2();
    })
  }
  // 데이터 삭제
  itemDel(uid,dataId){
    firebase.database().ref(`items/${uid}/${dataId}`).remove();
  }
  // 데이터 업데이트
  itemUp(uid,dataId,counter){
    firebase.database().ref(`items/${uid}/${dataId}`)
    .update({progress:counter})
  }

}

export { fire, firebase }
