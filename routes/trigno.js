import express from "express";
import { pythagorean, sineFromOppHyp, cosineFromAdjHyp } from "../controller/trigcon.js";


const router = express.Router();


// POST /api/trig/pythagorean
router.post("/pythagorean", pythagorean);


// POST /api/trig/sine
// expects { opposite, hypotenuse }
router.post("/sine", sineFromOppHyp);


// POST /api/trig/cosine
// expects { adjacent, hypotenuse }
router.post("/cosine", cosineFromAdjHyp);


export default router;