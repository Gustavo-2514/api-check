const TaskController = require('../controllers/taskController');
const checkToken = require('../middlewares/checkToken');

const route = require('express').Router();

route.get('/:userId/checklist/:checklistId/task/:taskId',checkToken,TaskController.getTaskById)
route.post('/:userId/checklist/:checklistId/task/create',checkToken,TaskController.createTask)
route.put('/:userId/checklist/:checklistId/task/:taskId/updateTitle',checkToken,TaskController.updateTitleTask)
route.put('/:userId/checklist/:checklistId/task/:taskId/updateDone',checkToken,TaskController.updateDoneTask)
route.delete('/:userId/checklist/:checklistId/task/:taskId/delete',checkToken,TaskController.deleteTask)

module.exports = route