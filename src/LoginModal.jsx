import React, { useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';


function LoginModal({ fireApp, setLoginModal,firebase }) {
  const emailRef = useRef();
  const passRef = useRef();
  const emailRegisterRef = useRef();
  const nameRegisterRef = useRef();
  const passRegisterRef = useRef();
  const repassRegisterRef = useRef();
  const [registerTF, setRegisterTF] = useState(false);

  // 이메일로그인
  const emailLogin = () => {
    const email = emailRef.current.value;
    const pass = passRef.current.value;
    fireApp.emailLogin(email, pass)
      .then((user) => {
        console.log('success');
      })
      .catch((error) => {
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  // 구글로그인
  const googleLogin = async () => {
    await fireApp.login();
    setLoginModal(false)
  }

  // 회원가입
  const onSubmit = (e) => {
  const emailRegister = emailRegisterRef.current.value;
  const nameRegister = nameRegisterRef.current.value;
  const passRegister = passRegisterRef.current.value;
	e.preventDefault();
 let createuser= firebase
 .auth()
 .createUserWithEmailAndPassword(emailRegister,passRegister);
 console.log(createuser);
}
  return (
    <div className="loginModal">
      {/* LoginModal */}
      {!registerTF &&
        <div className="auth">
        <h3>로그인</h3>
          <Form onSubmit={emailLogin}>
            <Form.Group controlId="formBasicEmail" className="formGroup" >
              <Form.Label className="formLabel"><i className="far fa-envelope" /></Form.Label>
              <Form.Control className="formInput" type="email" ref={emailRef} placeholder="이메일" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="formGroup" >
              <Form.Label className="formLabel"><i className="fas fa-unlock-alt" /></Form.Label>
              <Form.Control className="formInput" type="password" ref={passRef} placeholder="패스워드" />
            </Form.Group>
            <Button variant="primary" type="submit"> 로그인</Button>
          </Form>          
          <button className="btnGoogle" style={{background:"white"}} onClick={googleLogin} >
          <i class="fab fa-google-plus"/></button>
          <button className="btnRegister" style={{background:"white"}} onClick={() => setRegisterTF(true)} >
          아이디가 없다면...</button>
        </div>
      }

      {/* Register */}
      <div className="auth" style={{ display: !registerTF && 'none' }}>
      <h3>회원가입</h3>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="formBasicEmail" className="formGroup" >
            <Form.Label className="formLabel"><i className="far fa-smile" /></Form.Label>
            <Form.Control className="formInput" type="text" ref={nameRegisterRef} placeholder="이름" />
          </Form.Group>
          <Form.Group controlId="formBasicEmail" className="formGroup" >
            <Form.Label className="formLabel"><i className="far fa-envelope" /></Form.Label>
            <Form.Control className="formInput" type="email" ref={emailRegisterRef} placeholder="이메일" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword" className="formGroup" >
            <Form.Label className="formLabel"><i className="fas fa-unlock-alt" /></Form.Label>
            <Form.Control className="formInput" type="password"ref={passRegisterRef} placeholder="패스워드" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword" className="formGroup" >
            <Form.Label className="formLabel"><i className="fas fa-unlock-alt" /></Form.Label>
            <Form.Control className="formInput" type="password"ref={repassRegisterRef} placeholder="패스워드 확인" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>

      {/* 닫기 */}
      <button className="close" onClick={() => setLoginModal(false)}>
        <i className="far fa-window-close"></i>
      </button>
    </div>
  );
}

export default LoginModal;