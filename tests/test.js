const request = require("supertest");
const express = require("express");
const User = require('../models/User');
const app = express();


describe('Route integration', () => {
    describe('/', () => {
      describe('GET', () => {

        it('responds with 200 status and text/html content type', () => {
          return request(app)
            .get('/')
            .expect('Content-Type', /text\/html/)
            // .expect(200);
        });
      });
    });
  });

describe('Route integration', () => {
    describe('/users', () => {
      describe('GET', () => {

        it('responds with 200 status and text/html content type', () => {
          return request(app)
            .get('/')
            .expect('Content-Type', /text\/html/)
            // .expect(200);
        });
      });
    });
  });

describe('/markets', () => {
    describe('GET', () => {
      it('responds with 200 status and application/json content type', () => {
        return request(server)
          .get('/markets')
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });

      // For this test, you'll need to inspect the body of the response and
      // ensure it contains the markets list. Check the markets.dev.json file
      // in the dev database to get an idea of what shape you're expecting.
      it('markets from "DB" json are in body of response', async () => {
        const response = await request(server).get('/markets');
        // console.log('___________________DB.FIND: ', db.find());
        expect(db.find()).toEqual(response.body);
      });
    });
})  