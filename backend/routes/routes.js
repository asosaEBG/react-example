const router = require("express").Router();
const personController = require('../controllers/person');
router.post('/api/create/person', personController.create);
router.get('/api/read/person', personController.read);
router.patch('/api/update/person', personController.update);
router.delete('/api/delete/person/:_id', personController.delete);
module.exports = router;
