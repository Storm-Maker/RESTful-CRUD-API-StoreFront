import supertest from 'supertest';
import app from 'express';

const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('Should test the Products endpoint responses', () => {
  //No token is provided, returning string "Invalid token" & status 401
  afterEach((done) => { done() });
    

  describe('Should test Index endpoint', () => {
    afterEach((done) => { done() });
    
    it('Test index responses status', () => {
      request.get(`/products/`)
        .then( (res) => expect(res.status).toBe(200) );
    });
    it('Test index responses type', () => {
      request.get(`/products/`)
        .then( (res) => expect(res.body).toEqual('') );
    });
  });


  describe('Should test show endpoint', () => {
    afterEach((done) => { done() });
    
    it('Test show responses status', () => {
      request.get(`/products/100`)
        .then( (res) => expect(res.status).toBe(200) );
    });
    it('Test show responses type', () => {
      request.get(`/products/100`)
        .then( (res) => expect(res.body).toEqual({}) );
    });
  });

  describe('Should test create endpoint', () => {
    afterEach((done) => { done() });

    it('Test create responses status', () => {
      request.post(`/products/`)
        .then( (res) => expect(res.redirect).toBeTrue );
      });
    it('Test create responses type', () => {
      request.post(`/products/`)
        .then( (res) => expect(res.body).toEqual(jasmine.stringContaining("Invalid token, Error: TypeError: Cannot read properties of")) );
    });
  });

  describe('Should test update endpoint', () => {
    afterEach((done) => { done() });

    it('Test update responses status', () => {
      request.put(`/products/100`)
        .then( (res) => expect(res.redirect).toBeTrue );
    });
    it('Test update responses type', () => {
      request.put(`/products/100`)
        .then( (res) => expect(res.body).toEqual(jasmine.stringContaining("Invalid token, Error: TypeError: Cannot read properties of")) );
    });
  });

  describe('Should test delete endpoint', () => {
    afterEach((done) => { done() });
    
    it('Test delete responses status', () => {
      request.delete(`/products/107`)
        .then( (res) => expect(res.redirect).toBeTrue );
    });
    it('Test delete responses type', () => {
      request.delete(`/products/106`)
        .then( (res) => expect(res.body).toEqual(jasmine.stringContaining("Invalid token, Error: TypeError: Cannot read properties of")));
    });
  });

});
