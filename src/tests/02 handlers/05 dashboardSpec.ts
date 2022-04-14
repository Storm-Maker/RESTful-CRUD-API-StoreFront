import supertest from 'supertest';
import app from 'express';

const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('Should test the Dashboard endpoint responses', () => {
  afterEach((done) => {
    done();
  });

  describe('Should test top-five-products endpoint', () => {
    afterEach((done) => {
      done();
    });
    it('Test top-five-products responses status', () => {

      request.get(`/top-five-products/`)
        .then((res) => expect(res.status).toBe(200)
      );
  
    });
  
    it('Test top-five-products responses type', () => {
  
      request.get(`/top-five-products/`)
        .then((res) => expect(res.body).toEqual([])
      );
  
    });
  });

  describe('Should test completed-orders-by-user endpoint', () => {
    afterEach((done) => {
      done();
    });
    it('Test completed-orders-by-user responses status', () => {
      //No token is provided
      request.get(`/completed-orders-by-user/someUser`)
        .then((res) => expect(res.status).toBe(401)
      );
  
    });
  
    it('Test completed-orders-by-user responses type', () => {
        //No token is provided
      request.get(`/completed-orders-by-user/someUser`)
        .then((res) => expect(res.body).toEqual(jasmine.stringContaining("Invalid token, Error: TypeError: Cannot read properties of"))
      );
  
    });
  });

  describe('Should test list-products-category endpoint', () => {
    afterEach((done) => {
      done();
    });
    it('Test list-products-category responses status', () => {
      //No token is provided
      request.get(`/completed-orders-by-user/someCategory`)
        .then((res) => expect(res.status).toBe(401)
      );
  
    });
  
    it('Test list-products-category responses type', () => {
        //No token is provided
      request.get(`/list-products-category/someCategory`)
        .then((res) => expect(res.body).toEqual([])
      );
  
    });
  });

  describe('Should test orders-by-user endpoint', () => {
    afterEach((done) => {
      done();
    });
    it('Test orders-by-user responses status', () => {
      //No token is provided
      request.get(`/orders-by-user/100`)
        .then((res) => expect(res.status).toBe(401)
      );
  
    });
  
    it('Test orders-by-user responses type', () => {
      //No token is provided
      request.get(`/orders-by-user/100`)
        .then((res) => expect(res.body).toEqual(jasmine.stringContaining("Invalid token, Error: TypeError: Cannot read properties of"))
      );
  
    });
  });
  

});
