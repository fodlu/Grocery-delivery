import { Router } from "express";
import {
	addHooka,
	deleteHookah,
	getHooka,
	getHookas,
	updateHooka,
} from "../controllers/hookahController.js";

const hookaRouter = Router();

hookaRouter.post("/", addHooka);
hookaRouter.get("/", getHookas);
hookaRouter.get("/:id", getHooka);
hookaRouter.put("/:id", updateHooka);
hookaRouter.delete("/:id", deleteHookah);

export default hookaRouter;
