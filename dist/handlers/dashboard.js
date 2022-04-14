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
var verifyAuthToken_1 = __importDefault(require("../middleware/verifyAuthToken"));
var dashboard_1 = require("../services/dashboard");
var dashboard = new dashboard_1.DashboardQueries();
// showOrdersByUser displays the orders that were made by specific user based on user_ID
var showOrdersByUser = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ordersByUser, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, dashboard.showOrdersByUser(_req.params.user_id)];
            case 1:
                ordersByUser = _a.sent();
                res.json(ordersByUser).end();
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(400).json(err_1).end();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// showCompletedOrdersByUser displays the completed orders that were made by specific user based on user_ID
var showCompletedOrdersByUser = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var completedOrders, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, dashboard.showCompletedOrdersByUser(_req.params.user_id)];
            case 1:
                completedOrders = _a.sent();
                res.json(completedOrders).end();
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(400).json(err_2).end();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// showProductsByCategory displays products by specific category based on category name
var showProductsByCategory = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productsCategory, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, dashboard.showProductsByCategory(_req.params.category)];
            case 1:
                productsCategory = _a.sent();
                res.json(productsCategory).end();
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.status(400).json(err_3).end();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// showTopFiveProducts displays top 5 quantities in orders and return the orders in them
var showTopFiveProducts = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var topFiveProducts, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, dashboard.showTopFiveProducts()];
            case 1:
                topFiveProducts = _a.sent();
                res.json(topFiveProducts).end();
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                res.status(400).json(err_4).end();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var productsRoutes = function (app) {
    app.get('/orders-by-user/:user_id', verifyAuthToken_1["default"], showOrdersByUser);
    app.get('/completed-orders-by-user/:user_id', verifyAuthToken_1["default"], showCompletedOrdersByUser);
    app.get('/list-products-category/:category', showProductsByCategory);
    app.get('/top-five-products', showTopFiveProducts);
};
exports["default"] = productsRoutes;
