"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePost = exports.deletePost = exports.getPost = exports.createPost = exports.getPosts = void 0;
const dbMysQL_1 = require("../BasesDatos/dbMysQL");
function getPosts(res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield (0, dbMysQL_1.connect)();
            const posts = yield conn.query('SELECT * FROM Usuario ');
            res.json(posts[0]);
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.getPosts = getPosts;
function createPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newPost = req.body;
        const conn = yield (0, dbMysQL_1.connect)();
        yield conn.query('INSERT INTO USUARIO SET ?', [newPost]);
        res.json({
            message: 'New Post Created'
        });
    });
}
exports.createPost = createPost;
function getPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.postId;
        const conn = yield (0, dbMysQL_1.connect)();
        const posts = yield conn.query('SELECT * FROM Usuario WHERE userMail = ?', [id]);
        res.json(posts[0]);
    });
}
exports.getPost = getPost;
function deletePost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.postId;
        const conn = yield (0, dbMysQL_1.connect)();
        yield conn.query('DELETE FROM USUARIO WHERE userMail = ?', [id]);
        res.json({
            message: 'Post deleted'
        });
    });
}
exports.deletePost = deletePost;
function updatePost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.postId;
        const updatePost = req.body;
        const conn = yield (0, dbMysQL_1.connect)();
        yield conn.query('UPDATE USUARIO set ? WHERE userMail = ?', [updatePost, id]);
        res.json({
            message: 'Post Updated'
        });
    });
}
exports.updatePost = updatePost;
