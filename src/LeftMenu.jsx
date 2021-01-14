import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  menu: {
    width: 250, display: 'flex',
    flexFlow: 'column', padding: '15px', alignItems: 'center'
  },
  btn: { marginTop: '10px' },
  root: { '& > *': { margin: theme.spacing(1) } },
  input: { display: 'none' },
  avatar: { width: '100px', height: '100px' }
}));

function LeftMenu({ logoUrl, user, }) {
  const classes = useStyles();
  const [userInfo, setUserInfo] = useState('');
  const [email, setEmail] = useState(user.email);
  const [logo, setlogo] = useState(logoUrl)
  // console.log(user);
  const upLoad = async (e) => {
    const file = e.target.files[0];
    console.log(file)
  }

  return (
    <div className={classes.menu}>
      {!logo && <Avatar className={classes.avatar} />}

          <img src={logo} width="100px" />
          <input accept="image/*" className={classes.input} 
          id="icon-button-file" type="file" onChange={upLoad}
          />
          <label htmlFor="icon-button-file">
            <IconButton color="secondary" aria-label="upload picture" component="span">
              {email && <PhotoCamera />}
            </IconButton>
          </label>
     
      {email}
    
    </div>
  );
}

export default LeftMenu;