import { useEffect, useRef, useState } from 'react';
import './App.css';
import './LoginModal.css';
import LoginModal from './LoginModal';
import Itemrow from './Itemrow';

//메뉴바
import LeftMenu from './LeftMenu';
import Drawer from '@material-ui/core/Drawer';



function App({ fireApp }) {
  const textRef = useRef();
  const titleRef = useRef();
  const rocketRef = useRef();
  const [user, setuser] = useState({});
  const [uid, setUid] = useState('');
  const [userName, setUserName] = useState('');
  const [loginModal, setLoginModal] = useState(false);
  const [logoUrl, setLogoUrl] = useState('');
  const [items, setItems] = useState({});
  const [todoCount, setTodoCount] = useState(0);
  const today = new Date().toLocaleDateString();

  // 로그인 / 데이터 보여주기 싱크
  useEffect(() => {
    fireApp.onAuth((e) => {
      const cf = {
        f1: (data) => {
          data && setItems(data)
          setTodoCount(Object.keys(data).length);
        },
        f2: () => { setItems({}); setTodoCount(0); setTodoCount(0); setLogoUrl('') }
      }

      if (e) {
        setuser(e);
        setUid(e.uid);
        setUserName(e.displayName);
        setLoginModal(false);
        setLogoUrl(e.photoURL);
        fireApp.itemSync(e.uid, cf);

      } else { cf.f2() }
    })
  }, [fireApp]);
  //DB에 글 데이터 저장
  const submit = (e) => {
    e.preventDefault();
    const dataId = Date.now();
    const data = {
      uid: uid,
      dataId: dataId,
      name: userName,
      title: titleRef.current.value,
      text: textRef.current.value,
      today: today,
      progress: 0
    }
    if (uid && data.title) {
      fireApp.dataSave(data);
    }
    titleRef.current.value = '';
    textRef.current.value = '';
  }
  //로그아웃
  const logout = async () => {
    fireApp.logout();
    // setuser({});
    setUserName('');
    setUid('');
    setuser({});
  }
  //로켓발사
  const rocketOn = () => {
    rocketRef.current.classList.add("rocketOn");
    setTimeout(() => {
      rocketRef.current.classList.remove("rocketOn");
      clearTimeout(rocketOn);
    }, 300);
  }

  //좌측메뉴
  const [state, setState] = useState({ top: false, left: false, right: false });
  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    // <div onClick={toggleDrawer(anchor, false)}>
      <LeftMenu logoUrl={logoUrl} user={user}/>
    // </div>
  );

  //본문
  return (
    <div className="App">
      <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
        {list('left')}
      </Drawer>
      <div className='header'>
        <div className="leftMenu">
          <button className="btnLmenu" onClick={toggleDrawer('left', true)}>☰</button>
        </div>
        <div className="centerTitle">

          {userName} 오늘할일 {todoCount}개</div>
        <div className="rightMenu">
          {uid ? <button className="btnSign btnLogout" onClick={logout}>Logout</button>
            : <button className="btnSign btnLogin" onClick={() => setLoginModal(true)} >Login</button>
          }
        </div>
      </div>
      <div id='section'>
        <div id="items">
          {
            Object.keys(items).map((e) => {
              return <Itemrow key={e} item={items[e]} items={items} fireApp={fireApp} />
            })
            // <Itemrow  key={uid} item={items} items={items}/> 
          }
        </div>

        <form onSubmit={submit}>
          <input type="text" ref={titleRef} className="inputTitle" />

          <button className="btnadd" onClick={rocketOn} style={{ outline: "none", border: "none" }} >
            <span className="rocket" ref={rocketRef}  >🚀</span>  추가</button>
          <textarea className="textarea" ref={textRef} cols="30" rows="2" ></textarea>
        </form>

      </div>
      <div className='footer'>Togo Factory</div>

      {
        loginModal && <LoginModal fireApp={fireApp} setLoginModal={setLoginModal} setUserName={setUserName} />
      }


    </div>
  );
}

export default App;
