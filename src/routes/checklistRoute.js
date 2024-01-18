const router = require('express').Router() 

const ChecklistController = require("../controllers/checklistController");
const checkToken = require('../middlewares/checkToken');

router.get("/:userId/checklists", checkToken, ChecklistController.getChecklistsUser);
router.get("/:userId/checklist/:checklistId", checkToken, ChecklistController.getChecklistById);
router.post("/:userId/checklist/create", checkToken, ChecklistController.createChecklist);
router.put("/:userId/checklist/:checklistId/update", checkToken, ChecklistController.updateChecklist);
router.delete("/:userId/checklist/:checklistId/delete", checkToken, ChecklistController.deleteChecklist);


module.exports = router;