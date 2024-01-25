const { createTask, getAllTasks, getTaskById, deleteTasks, updateTask, getTasksByUser, getTasksByCategory } = require('../controllers/task');
const router = require('express').Router();


router.post('/',createTask);
router.get('/',getAllTasks);
router.get('/by-user/:id',getTasksByUser);
router.get('/cat/',getTasksByCategory);
router.get('/:id',getTaskById);
router.delete('/:id',deleteTasks);
router.put('/:id',updateTask);

module.exports=router;