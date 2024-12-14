import express from 'express';
import { protectRoutes } from '../middleware/protectRoute.js';
import { getMessages, getUsersFromSidebar, sendMessages } from '../controllers/mesagesController.js';

const router = express.Router();

router.get("/users", protectRoutes, getUsersFromSidebar);
router.get("/:id", protectRoutes, getMessages);

router.post("/send/:id", protectRoutes, sendMessages)



export default router;