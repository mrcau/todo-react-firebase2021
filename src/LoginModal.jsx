import React, { useRef, useState } from 'react';

function LoginModal({fireApp,setLoginModal}) {
const emailRef = useRef();
const passRef = useRef();
const alertRef = useRef();
const [alert, setAlert] = useState('경고');

 const emailLogin = () => {
  const email = emailRef.current.value;
  const pass = passRef.current.value;
  fireApp.emailLogin(email,pass)
  .then((user) => {
    console.log('success');
  })
  .catch((error) => {
    var errorMessage = error.message;
    console.log(errorMessage);
  });
  
 }

  const googleLogin = async() => {
   await fireApp.login();
   setLoginModal(false)
  }

  return (
    <div className="loginModal">
      <form >
        <h4><i className="far fa-smile"></i></h4>
        <input type="text" className="loginName" placeholder="ID" />
        <h4><i className="far fa-envelope"></i></h4>
        <input type="email" className="loginEmail" placeholder="Email" ref={emailRef}/>
        <h4><i className="fas fa-unlock-alt"></i></h4>
        <input type="password" className="loginPass" ref={passRef} placeholder="Password" />
      </form>
      <div className="btnLG">
        <button className="modalLogin btnBasicLogin" onClick={emailLogin} >로그인</button>
        <button className="modalLogin btnGoogleLogin" onClick={googleLogin} >구글로그인</button>
      </div>
      <p className="loginAlert" ref={alertRef}>{alert}</p>
      <button className="close" onClick={()=>setLoginModal(false)}>
        <i className="far fa-window-close"></i></button>
    </div>
  );
}

export default LoginModal;