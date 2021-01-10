
import { useEffect, useRef, useState } from 'react';
import './App.css';
import './LoginModal.css';

import LoginModal from './LoginModal';


function App({fireApp, firebase}) {
const textRef = useRef();
const titleRef = useRef();
const [user, setuser] = useState({});
const [uid, setUid] = useState('');
const [userName, setUserName] = useState('');
const [loginModal, setLoginModal] = useState(false);

useEffect(()=>{
  fireApp.onAuth(e=>{
    if(e){
      setuser(e);
      setUserName(e.displayName);
      setUid(e.uid);
    }
    console.log(e);
  })
},[])

  const submit=(e)=>{
    e.preventDefault();
   const text = textRef.current.value;
   const title = titleRef.current.value;
    console.log(text,title);
    textRef.current.value ='';
    titleRef.current.value='';
  }


  const logout = async() => {
    fireApp.logout();
    setuser({});
    setUserName('');
    setUid('');
  }

  return (
    <div className="App">
       <header>{userName} 오늘할일</header>
       {uid?
       <button className="btnSign btnLogout" onClick={logout}>Logout</button>
       :
       <button className="btnSign btnLogin" onClick={()=>setLoginModal(true)} >Login</button>
       }
       <main>
         <div className="items"> </div>
         <form onSubmit={submit}>
           <input type="text" ref={titleRef}/>
           <button className="btnadd" >
             <span className="rocket">🚀</span>추가</button>
           <textarea ref={textRef} cols="30" rows="2"></textarea>
         </form>
       </main>
       <footer>Togo Factory</footer>
       {
         loginModal && <LoginModal fireApp={fireApp} setLoginModal={setLoginModal}/>
       }
    </div>
  );
}

export default App;
