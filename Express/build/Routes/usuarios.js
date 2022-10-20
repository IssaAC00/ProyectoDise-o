"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_1 = require("../Controller/usuarios");
const router = (0, express_1.Router)();
router.route('/')
    .get(usuarios_1.getPosts)
    .post(usuarios_1.createPost);
router.route('/:postId')
    .get(usuarios_1.getPost)
    .delete(usuarios_1.deletePost)
    .put(usuarios_1.updatePost);
exports.default = router;
