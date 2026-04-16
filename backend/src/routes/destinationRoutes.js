import express from "express";
import { getAllDestinations, getDestinationById, createDestination, deleteDestination } from "../controllers/destinationController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllDestinations);
router.get("/:id", getDestinationById);
router.post("/", authenticateToken, createDestination);
router.delete("/:id", authenticateToken, deleteDestination);

export default router;