import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { Link } from 'react-router-dom';

import './Navbar.scss';

export const Navbar = () => {
  return (
    <AppBar className='Navbar' position='sticky'>
      <Toolbar>
        <Typography className="Navbar-header" variant='h4'>SimRacing Setup Garage</Typography>
        <div className="Navbar-links">
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/AddEntity'>Add Entity</Link>
          </li>
        </ul>
      </div>
      </Toolbar>
    </AppBar>
  );
};
