import express from 'express';
import ru from '../../../../translates/ru.json';
import ua from '../../../../translates/ua.json';
import en from '../../../../translates/en.json';

const router = express.Router(); // eslint-disable-line

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});


/**
 * Get current translates
 */
router.get('/', function(req, res) {
  new Promise((resolve, reject) => {
    if (getLocal(req)) {
      resolve(getLocal(req));
    }

    reject({ error: 'not found'});
  })
    .then(data => res.json(data))
    .catch(() => {
      res.status(404).send({ errors: { msg:'Not found' }, type: 'internal' });
    });
});

function getLocal(req) {
  const { lang } = req.query;

  if (lang === 'ua') {
    return ua;
  }

  if (lang === 'ru') {
    return ru;
  }

  return en;
}

export default router;
