import { useEffect, useRef, useState } from 'react';
import './App.css';
import './LoginModal.css';
import LoginModal from './LoginModal';
import Itemrow from './Itemrow';


function App({ fireApp, firebase }) {
  const textRef = useRef();
  const titleRef = useRef();
  // const [user, setuser] = useState({});
  const [uid, setUid] = useState('');
  const [userName, setUserName] = useState('');
  const [loginModal, setLoginModal] = useState(false);
  // const [item, setItem] = useState({});
  const [items, setItems] = useState({});
  const [todoCount, setTodoCount] = useState(0);
  const today = new Date().toLocaleDateString();

  // 로그인 / 데이터 보여주기 싱크
  useEffect(() => {
    fireApp.onAuth((e) => {
      if (e) {
        setUid(e.uid);
        setUserName(e.displayName);
        setLoginModal(false);

        fireApp.itemSync(e.uid, (data) => { //콜백
          setItems(data);
          setTodoCount(Object.keys(data).length)
        })
      }
      console.log(e);
    })
  }, []);

  //DB에 글 데이터 저장
  const submit = (e) => {
    e.preventDefault();
    const dataId = Date.now();
    const data = {
      uid: uid,
      dataId: dataId,
      name: userName,
      title: titleRef.current.value,
      text: textRef.current.value
    }
    if (uid && data.title) {
      console.log(data);
      fireApp.dataSave(data);
    }
    titleRef.current.value = '';
    textRef.current.value = '';
  }


  const logout = async () => {
    fireApp.logout();
    // setuser({});
    setUserName('');
    setUid('');
  }

  return (
    <div className="App">
      <div className='header'>{userName} 오늘할일</div>
      {uid ?
        <button className="btnSign btnLogout" onClick={logout}>Logout</button>
        :
        <button className="btnSign btnLogin" onClick={() => setLoginModal(true)} >Login</button>
      }
      <div id='section'>
        <div id="items">
          {
            // Object.keys(items).map((e) => {
            //   <Itemrow  key={uid} item={items[e]} items={items}/>          
            // })
            <Itemrow  key={uid} item={items} items={items}/> 
          }
          
        </div>

        <form onSubmit={submit}>
          <input type="text" ref={titleRef} />
          <button className="btnadd" >
            <span className="rocket">🚀</span>추가</button>
          <textarea ref={textRef} cols="30" rows="2"></textarea>
        </form>

      </div>
      <div className='footer'>Togo Factory</div>
      {
        loginModal && <LoginModal fireApp={fireApp} firebase={firebase} setLoginModal={setLoginModal} setUserName={setUserName} />
      }
    </div>
  );
}

export default App;
