import userController from "../controllers/user.controller";
import { Request, Response, NextFunction } from "express";

const express = require("express");
const app = express();

const multer = require("multer");
import db from "../models";
const MyQuery = db.sequelize;
const { QueryTypes } = require("sequelize");
const { SECRET_KEY } = require("../appconfig");
const jwt = require("jsonwebtoken");

// import data from '../index.js'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "avatars");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname+".png");
  },
});

var upload = multer({
  storage: storage,
});

const router = express.Router();

router.post("/addadvertise1",upload.single("file"), userController.postImage);






export default router;