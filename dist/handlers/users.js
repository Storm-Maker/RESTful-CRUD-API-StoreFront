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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var user_1 = require("../models/user");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var verifyAuthToken_1 = __importDefault(require("../middleware/verifyAuthToken"));
var store = new user_1.UserStore();
// index, display all the users
var index = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, store.index()];
            case 1:
                users = _a.sent();
                res.json(users).end();
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(400).json(err_1).end();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// show, display a specific user based on user_name
var show = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, store.show(_req.params.user_name)];
            case 1:
                user = _a.sent();
                res.json(user).end();
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(400).json(err_2).end();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// create, creates a new user
var create = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, newUser, token, err_3, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                user = {
                    first_name: _req.body.first_name,
                    last_name: _req.body.last_name,
                    user_name: _req.body.user_name,
                    password_digest: _req.body.password_digest
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.create(user)];
            case 2:
                newUser = _a.sent();
                token = jsonwebtoken_1["default"].sign({ user: newUser }, process.env.TOKEN_SECRET);
                res.json("User ".concat(user.user_name, " Created Successfully, Token: ").concat(token)).end();
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                res.status(400).json(err_3).end();
                return [3 /*break*/, 4];
            case 4: return [3 /*break*/, 6];
            case 5:
                err_4 = _a.sent();
                res.status(400).json(err_4).end();
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
// update, updates a specific user based on user_name
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, updateUser, err_5, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                user = {
                    user_name: req.params.user_name,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    password_digest: req.body.password_digest
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.update(user)];
            case 2:
                updateUser = _a.sent();
                res.json("User ".concat(user.user_name, " Updated Successfully!")).end();
                return [3 /*break*/, 4];
            case 3:
                err_5 = _a.sent();
                res.status(400).json(err_5).end();
                return [3 /*break*/, 4];
            case 4: return [3 /*break*/, 6];
            case 5:
                err_6 = _a.sent();
                res.status(400).json(err_6).end();
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
// destroy, deletes a specific user based on user_name
var destroy = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deleteUser, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, store["delete"](_req.params.user_name)];
            case 1:
                deleteUser = _a.sent();
                res.json(deleteUser).end();
                return [3 /*break*/, 3];
            case 2:
                err_7 = _a.sent();
                res.status(400).json(err_7).end();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// authenticate, the log-in route to allow access and return token
var authenticate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, authenticate_1, token, err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = {
                    user_name: req.body.user_name,
                    password_digest: req.body.password_digest
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.authenticate(user.user_name, user.password_digest)];
            case 2:
                authenticate_1 = _a.sent();
                if (authenticate_1 !== null) {
                    token = jsonwebtoken_1["default"].sign({ user: authenticate_1 }, process.env.TOKEN_SECRET);
                    res.json("User ".concat(user.user_name, " Logged-In Successfully, Bearer Token: ").concat(token)).end();
                }
                else {
                    res.status(401).json("Failed login attempt! make sure you are a registered user and check your credentials then try again").end();
                }
                return [3 /*break*/, 4];
            case 3:
                err_8 = _a.sent();
                res.status(401).json("".concat(err_8, " + ").concat(user)).end();
                return [3 /*break*/, 4];
            case 4:
                ;
                return [2 /*return*/];
        }
    });
}); };
var usersRoutes = function (app) {
    app.get('/users', verifyAuthToken_1["default"], index);
    app.get('/users/:user_name', verifyAuthToken_1["default"], show);
    app.post('/users', create);
    app.put('/users/:user_name', verifyAuthToken_1["default"], update);
    app["delete"]('/users/:user_name', verifyAuthToken_1["default"], destroy);
    app.post('/users/authenticate', authenticate);
};
exports["default"] = usersRoutes;
