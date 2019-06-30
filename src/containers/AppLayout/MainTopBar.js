import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles({
  title: {
    flexGrow: 1,
  },
});

const MainTopBar = (props, context) => {
  const classes = useStyles();
  const {
    currentLang,
    translates,
    profile,
  } = context;
  const {
    isGuest,
    onToggle,
  } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenPanel = () => onToggle({ name: 'leftPanel', value: true });

  const handleClose = () => {
    console.log('click');
  };

  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const renderLogo = () => {
    return (
      <Typography
        variant="h6"
        className={classes.title}
      >
        <div className="logo">
          <Link to={`/${currentLang}`}>
            KeyPress
          </Link>
        </div>
      </Typography>
    );
  }

  const renderMenu = () => {
    if (isGuest) {
      return (
        <div>
          <IconButton
            color="inherit"
            aria-owns={anchorEl ? 'header-menu' : null}
            aria-haspopup="true"
            onClick={handleOpenMenu}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="header-appbar"
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
          </Menu>
        </div>
      );
    }

    return (
      <div>
        <IconButton
          color="inherit"
          aria-owns={anchorEl ? 'header-menu' : null}
          aria-haspopup="true"
          onClick={handleOpenMenu}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="header-menu"
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleCloseMenu}
        >
          <Link to={`/${currentLang}/login`}>
            <MenuItem>{translates.login}</MenuItem>
          </Link>
          <Link to={`/${currentLang}/signup`}>
            <MenuItem>{translates.signup}</MenuItem>
          </Link>
        </Menu>
      </div>
    );
  }

  return (
    <AppBar>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Menu"
          onClick={handleOpenPanel}
        >
          <MenuIcon />
        </IconButton>
        {renderLogo()}

        {renderMenu()}
      </Toolbar>
    </AppBar>
  );
}

MainTopBar.defaultProps = {
  isGuest: true,
};

MainTopBar.contextTypes = {
  currentLang: PropTypes.string.isRequired,
  translates: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
}

MainTopBar.propTypes = {
  isGuest: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
};

export default MainTopBar;
