const express = require('express');
const ProfileController = require('../controller/ProfileController')
const ToDoListController = require('../controller/ToDoListController')
const authVerifyMiddleware =require('../middleware/AuthVerifyMiddleware');
const router = express.Router();

router.post("/CreateProfile",ProfileController.CreateProfile);
router.post("/UserLogin",ProfileController.UserLogin);

router.get("/SelectProfile",authVerifyMiddleware,ProfileController.SelectProfile);
router.post("/UpdateProfile",authVerifyMiddleware,ProfileController.UpdateProfile);

router.post("/CreateToDo",authVerifyMiddleware,ToDoListController.CreateToDo);
router.get("/SelectToDo",authVerifyMiddleware,ToDoListController.SelectToDo);
router.post("/UpdateToDo",authVerifyMiddleware,ToDoListController.UpdateToDo);
router.post("/UpdateToDoStatus",authVerifyMiddleware,ToDoListController.UpdateToDoStatus);
router.post("/RemoveToDo",authVerifyMiddleware,ToDoListController.RemoveToDo);
router.get("/SelectToDoByStatus",authVerifyMiddleware,ToDoListController.SelectToDoByStatus);
router.post("/SelectToDoByDate",authVerifyMiddleware,ToDoListController.SelectToDoByDate);

module.exports = router;