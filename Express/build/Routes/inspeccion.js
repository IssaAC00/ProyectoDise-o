"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Element_1 = require("../Controller/Element");
const router = (0, express_1.Router)();
router.route('/')
    .get(Element_1.getPosts)
    .post(Element_1.createPost);
router.route('/:postId')
    .get(Element_1.getPost)
    .delete(Element_1.deletePost)
    .put(Element_1.updatePost);
exports.default = router;
