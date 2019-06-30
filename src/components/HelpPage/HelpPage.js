import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  box: {
    marginBottom: '30px',
  },
  title: {
    marginBottom: '20px',
  },
});

const HelpPage = (props, context) => {
  const classes = useStyles();
  const { currentLang, translates } = context;

  return (
    <div className="container">
      <Box
        m={2}
      >
        <Typography
          variant="h3"
          className={classes.title}
        >
          {translates.helpTitle}
        </Typography>

        <Typography
          variant="h5"
          className={classes.title}
        >
          The guide to our typing tutor
        </Typography>
        <Box
          className={classes.box}
          component="p"
          m={2}
        >
          To use our online typing tutor,
          you don&apos;t have to read these instructions first.
          However, many users have asked us how to use it optimally
          in order to learn typing as efficiently as possible.
          In this guide we will therefore give you some tips and best practices.
        </Box>
        <Typography
          variant="h5"
          className={classes.title}
        >
          Let&apos;s move on
        </Typography>
        <Box
          className={classes.box}
          component="p"
          m={2}
        >
          Now you know how to practice optimally with our typing tutor.
          Why not start a typing exercise right away and try it out for free.
        </Box>

        <Link to={`/${currentLang}`}>
          <Button
            variant="outlined"
            color="primary"
          >
            {translates.homeBack}
          </Button>
        </Link>
      </Box>
    </div>
  );

};

HelpPage.contextTypes = {
  currentLang: PropTypes.string.isRequired,
  translates: PropTypes.object.isRequired,
};

export default HelpPage;
