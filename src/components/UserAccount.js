import React, { useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import { signInWithGoogle, auth } from '../firebase';
import { UserContext } from '../contexts/User.context';

export default function UserAccount() {
  const user = useContext(UserContext);
  const { photoURL, displayName } = user || {};
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const signIn = () => {
    signInWithGoogle();
    handleClose();
  };
  const signOut = () => {
    auth.signOut();
    handleClose();
  };
  return (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        {user ? <Avatar alt={displayName} src={photoURL} /> : <AccountCircle />}
      </IconButton>

      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        {user
          ? <MenuItem onClick={signOut}>logout</MenuItem>
          : <MenuItem onClick={signIn}>Login with Google</MenuItem> }
      </Menu>
    </div>
  );
}
