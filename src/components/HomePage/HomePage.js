import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  mainBox: {
    margin: '70px 10px 0 10px',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    padding: '40px',
    overflow: 'hidden',
    maxWidth: '600px',
  },
  box: {
    fontSize: '18px',
  },
  title: {
    marginBottom: '20px',
  },
});

const HomePage = (props, context) => {
  const classes = useStyles();
  const { currentLang, translates } = context;

  return (
    <Box
      className={classes.mainBox}
    >
      <Paper className={classes.card}>
        <Typography
          variant="h3"
          className={classes.title}
        >
          {translates.homeTitle}
        </Typography>
        <Box
          className={classes.box}
          m={2}
        >
          {translates.homeDescription}
        </Box>


        <Link to={`/${currentLang}/trainer`}>
          <Button
            color="primary"
            variant="contained"
            className={classes.button}
          >
            {translates.letsStart}
          </Button>
        </Link>
      </Paper>
    </Box>
  );
};

HomePage.contextTypes = {
  currentLang: PropTypes.string.isRequired,
  translates: PropTypes.object.isRequired,
};

export default HomePage;
