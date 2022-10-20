"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Area_1 = require("../Controller/Area");
const router = (0, express_1.Router)();
router.route('/')
    .get(Area_1.getPosts)
    .post(Area_1.createPost);
router.route('/:postId')
    .get(Area_1.getPost)
    .delete(Area_1.deletePost)
    .put(Area_1.updatePost);
exports.default = router;
