"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const request = (0, supertest_1.default)(express_1.default);
describe('Should test the Orders endpoint responses', () => {
    //No token is provided, returning string "Invalid token" & status 401
    afterEach((done) => { done(); });
    describe('Should test Index endpoint', () => {
        afterEach((done) => { done(); });
        it('Test index responses status', () => {
            request.get(`/orders/`)
                .then((res) => expect(res.status).toBe(401));
        });
        it('Test index responses type', () => {
            request.get(`/orders/`)
                .then((res) => expect(res.body).toEqual(jasmine.stringContaining('Invalid token, Error:')));
        });
    });
    describe('Should test show endpoint', () => {
        afterEach((done) => { done(); });
        it('Test show responses status', () => {
            request.get(`/orders/100`)
                .then((res) => expect(res.status).toBe(401));
        });
        it('Test show responses type', () => {
            request.get(`/orders/100`)
                .then((res) => expect(res.body).toEqual(jasmine.stringContaining('Invalid token, Error:')));
        });
    });
    describe('Should test create endpoint', () => {
        afterEach((done) => { done(); });
        it('Test create responses status', () => {
            request.post(`/orders/`)
                .then((res) => expect(res.redirect).toBeTrue);
        });
        it('Test create responses type', () => {
            request.post(`/orders/`)
                .then((res) => expect(res.body).toEqual(jasmine.stringContaining("Invalid token, Error: TypeError: Cannot read properties of")));
        });
    });
    describe('Should test update endpoint', () => {
        afterEach((done) => { done(); });
        it('Test update responses status', () => {
            request.put(`/orders/100`)
                .then((res) => expect(res.redirect).toBeTrue);
        });
        it('Test update responses type', () => {
            request.put(`/orders/100`)
                .then((res) => expect(res.body).toEqual(jasmine.stringContaining("Invalid token, Error: TypeError: Cannot read properties of")));
        });
    });
    describe('Should test delete endpoint', () => {
        afterEach((done) => { done(); });
        it('Test delete responses status', () => {
            request.delete(`/orders/99`)
                .then((res) => expect(res.redirect).toBeTrue);
        });
        it('Test delete responses type', () => {
            request.delete(`/orders/91`)
                .then((res) => expect(res.body).toEqual(jasmine.stringContaining("Invalid token, Error: TypeError: Cannot read properties of")));
        });
    });
    describe('Should test addProductToOrder endpoint', () => {
        afterEach((done) => { done(); });
        it('Test create responses status', () => {
            request.post(`/orders/`)
                .then((res) => expect(res.redirect).toBeTrue);
        });
        it('Test create responses type', () => {
            request.post(`/orders/`)
                .then((res) => expect(res.body).toEqual(jasmine.stringContaining("Invalid token, Error: TypeError: Cannot read properties of")));
        });
    });
});
