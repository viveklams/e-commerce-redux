import express from "express";

import {
  addFeatureImage,
  getFeatureImages,
} from "../../controllers/common/feature-controller.js";

const router = express.Router();

router.post("/add", addFeatureImage);
router.get("/get", getFeatureImages);

export default router;
