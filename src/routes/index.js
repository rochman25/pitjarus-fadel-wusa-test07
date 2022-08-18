var express = require('express');
var router = express.Router();

const visitController = require('../controller/visit')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/visit/:visit_id' , visitController.getVisit)
router.post('/visit' , visitController.getReportProduct)
router.post('/batch' , visitController.batchReportProduct)


module.exports = router;
