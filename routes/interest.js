import express from "express";
import { compoundInterest, simpleInterest } from "../controller/intersetcon.js";


const router = express.Router();


// POST /api/interest/compound
router.post("/compound", compoundInterest);


// POST /api/interest/simple
router.post("/simple", simpleInterest);


export default router;