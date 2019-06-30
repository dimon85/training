import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Keyboard from '@material-ui/icons/Keyboard';
import Help from '@material-ui/icons/Help';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import cyan from '@material-ui/core/colors/cyan';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  lang: {
    margin: '10px',
  },
  active: {
    background: cyan[600],
    '&:hover': {
      background: cyan[600],
    }
  }
});

const LanguageList = (props) => {
  const {
    langs,
    currentLang,
    className,
    onClickLang,
  } = props;

  return (
    <div className={className.lang}>
      <ButtonGroup
        fullWidth
        variant="contained"
        size="small"
        aria-label="Language container"
      >
        {langs.map((item) => {
          const handleClick = () => onClickLang(item);
          return (
            <Button
              key={item}
              className={item === currentLang ? className.active : null}
              onClick={handleClick}
            >
              {item}
            </Button>
          );
        })}
      </ButtonGroup>
    </div>
  );
}

LanguageList.propTypes = {
  langs: PropTypes.array.isRequired,
  className: PropTypes.object.isRequired,
  currentLang: PropTypes.string.isRequired,
  onClickLang: PropTypes.func.isRequired,
};

const Sidebar = (props, context) => {
  const classes = useStyles();
  const {
    langs,
    currentLang,
    translates,
    profile,
  } = context;
  const {
    name,
    open,
    onToggle,
    onChangeLang,
  } = props;

  const handleClose = () => onToggle({ name, value: false });
  const handleToggle = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    onToggle({ name, value: !open });
  };
  const handleLocale = locale => onChangeLang(locale);

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={handleToggle}
      onKeyDown={handleToggle}
    >
      <Divider />
      <List>
        {profile.email && (
          <Link to={`/${currentLang}/profile`}>
            Profile
          </Link>
        )}
        <Link to={`/${currentLang}/trainer`}>
          <ListItem button>
            <ListItemIcon>
              <Keyboard />
            </ListItemIcon>
            <ListItemText primary={translates.training} />
          </ListItem>
        </Link>
        <Link to={`/${currentLang}/help`}>
          <ListItem button>
            <ListItemIcon>
              <Help />
            </ListItemIcon>
            <ListItemText primary={translates.help} />
          </ListItem>
        </Link>
      </List>
    </div>
  );


  return (
    <Drawer
      open={open}
      onClose={handleClose}
    >

      <div>
        <LanguageList
          langs={langs}
          currentLang={currentLang}
          className={classes}
          onClickLang={handleLocale}
        />

        {sideList()}

      </div>
    </Drawer>
  );
}

Sidebar.defaultProps = {
  name: 'leftPanel',
};

Sidebar.contextTypes = {
  langs: PropTypes.array.isRequired,
  currentLang: PropTypes.string.isRequired,
  translates: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
}

Sidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  name: PropTypes.string,
  onToggle: PropTypes.func.isRequired,
  onChangeLang: PropTypes.func.isRequired,
};

export default Sidebar;
