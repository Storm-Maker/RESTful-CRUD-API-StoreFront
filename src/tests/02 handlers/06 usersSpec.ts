import supertest from 'supertest';
import app from 'express';

const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('Should test the Users endpoint responses', () => {
  //No token is provided, returning string "Invalid token" & status 401
  afterEach((done) => { done() });
    

  describe('Should test Index endpoint', () => {
    afterEach((done) => { done() });
    
    it('Test index responses status', () => {
      request.get(`/users/`)
        .then( (res) => expect(res.status).toBe(401) );
    });
    it('Test index responses type', () => {
      request.get(`/users/`)
        .then( (res) => expect(res.body).toEqual(jasmine.stringContaining("Invalid token, Error: TypeError: Cannot read properties of")) );
    });
  });


  describe('Should test show endpoint', () => {
    afterEach((done) => { done() });
    
    it('Test show responses status', () => {
      request.get(`/users/someUser`)
        .then( (res) => expect(res.status).toBe(401) );
    });
    it('Test show responses type', () => {
      request.get(`/users/someUser`)
        .then( (res) => expect(res.body).toEqual(jasmine.stringContaining("Invalid token, Error: TypeError: Cannot read properties of")) );
    });
  });

  describe('Should test create endpoint', () => {
    afterEach((done) => { done() });

    it('Test create responses status', () => {
      request.post(`/users/`)
        .then( (res) => expect(res.redirect).toBeTrue );
      });
    it('Test create responses type', () => {
      request.post(`/users/`)
        .then( (res) => expect(res.body).toEqual({}) );
    });
  });

  describe('Should test update endpoint', () => {
    afterEach((done) => { done() });

    it('Test update responses status', () => {
      request.put(`/users/someUser`)
        .then( (res) => expect(res.redirect).toBeTrue );
    });
    it('Test update responses type', () => {
      request.put(`/users/someUser`)
        .then( (res) => expect(res.body).toEqual(jasmine.stringContaining("Invalid token, Error: TypeError: Cannot read properties of")) );
    });
  });

  describe('Should test delete endpoint', () => {
    afterEach((done) => { done() });
    
    it('Test delete responses status', () => {
      request.delete(`/users/someUser`)
        .then( (res) => expect(res.redirect).toBeTrue );
    });
    it('Test delete responses type', () => {
      request.delete(`/users/someUser`)
        .then( (res) => expect(res.body).toEqual(jasmine.stringContaining("Invalid token, Error: TypeError: Cannot read properties of")));
    });
  });

  describe('Should test authenticate endpoint', () => {
    afterEach((done) => { done() });
    
    it('Test authenticate responses status', () => {
      request.post(`/users/authenticate/someUser`)
        .then( (res) => expect(res.redirect).toBeTrue );
    });
  
    it('Test authenticate responses type', () => {
      request.post(`/users/authenticate/someUser`)
        .then( (res) => expect(res.body).toEqual({}) );
    });
  });

});
