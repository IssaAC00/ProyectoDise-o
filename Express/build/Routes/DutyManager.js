"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DutyManager_1 = require("../Controller/DutyManager");
const router = (0, express_1.Router)();
router.route('/')
    .get(DutyManager_1.getPosts)
    .post(DutyManager_1.createPost);
router.route('/:postId')
    .get(DutyManager_1.getPost)
    .delete(DutyManager_1.deletePost)
    .put(DutyManager_1.updatePost);
exports.default = router;
