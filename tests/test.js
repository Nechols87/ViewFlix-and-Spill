const request = require("supertest");
const express = require("express");
const app = express();


describe('Route integration', () => {
    describe('/', () => {
      describe('GET', () => {

        it('responds with text/html content type', () => {
          return request(app)
            .get('/')
            .expect('Content-Type', /text\/html/)
        });
      });
    });
  });

describe('Route integration', () => {
    describe('/users', () => {
      describe('GET', () => {

        it('responds with text/html content type', () => {
          return request(app)
            .get('/')
            .expect('Content-Type', /text\/html/)
        });
      });
    });
  });

describe('/signup', () => {
    describe('POST', () => {
      it('responds with text/html content type', () => {
        return request(app)
          .post('/signup')
          .send({name: "testName", email: "testPassword", password: "testPassword"})
          .expect('Content-Type', /text\/html/)
      });

    });
})  

describe('/reviews', () => {
    describe('POST', () => {
      it('responds with text/html content type', () => {
        const User = {name: "testUser"}
        return request(app)
          .post('/reviews')
          .send({title: "testTitle", body: "testBody", user: User, status: "public"})
          .expect('Content-Type', /text\/html/)
      });

      it('responds with the updated review', async () => {
        const User = {name: "testUser"}
        // Create new review
        const newReview = {title: "testTitle", body: "testBody", user: User, status: "public"};
        
        const response = await request(app).post('/reviews').send(newReview);

        // Expect that our created 'new review' is same as list on response.body
        expect(response.body).toMatchObject(newReview);
      });

    });
})  

describe('Validate API calls', () => {
  it('create session post request should fail for invalid credentials', () => {
    const data = { name: 'incorrect_username', password: 'INVALID' };
    request(app).post('/users/login')
      .send(data)
      .expect('Content-Type', /text\/html/)
      .expect({ name: 'AuthenticationError', message: 'Unauthorized' })
  });
});