const app = require('./server');
const request = require('supertest');

const agent = request(app);

describe('Strategy Fail', () => {

    const invalidToken = decodeURIComponent('http%3A%2F%2Flocalhost%3A3001%252Chttp%3A%2F%2Flocalhost%3A3001%252C%252C4697739033%2CxPuI02mctaYq1eFTeiTNr8SF23wZrzG80Uf%2FeJTKyQW5kg4OOVh7WFlyH%2BakR0i3IkU6QZUiG15T3Lu%2B2W43Cw%3D%3D%252CqQdcxrwRRIAdAdbnm%2BazLz4nP46BVWzI2GVFtHUdMAc%3D%2CFPS%2FonjSa0ojlSzp9zXEiot5MgZcMwXR0sAIdgJMxaE%3D%252CbruQ61utUBPay5QJ6Rity4S6AW%2Bsma4NTt%2B7udhMveM%3D%2Cexample%40email.com');
    const invalidToken2 = decodeURIComponent('http%3A%2F%2Flocalhost%3A3001%252Chttp%3A%2F%2Flocalhost%3A3001%252C%252C4651339663%2C%252C%3D%2C%252CbruQ61utUBPay5QJ6Rity4S6AW%2Bsma4NTt%2B7udhMveM%3D%2Cexample%40email.com');
    const expiredToken = decodeURIComponent('http%3A%2F%2Flocalhost%3A3001%252Chttp%3A%2F%2Flocalhost%3A3001%252C%252C1497739033%2CxPuI02mctaYq1eFTeiTNr8SF23wZrzG80Uf%2FeJTKyQW5kg4OOVh7WFlyH%2BakR0i3IkU6QZUiG15T3Lu%2B2W43Cw%3D%3D%252CqQdcxrwRRIAdAdbnm%2BazLz4nP46BVWzI2GVFtHUdMAc%3D%2CFPS%2FonjSa0ojlSzp9zXEiot5MgZcMwXR0sAIdgJMxaE%3D%252CbruQ61utUBPay5QJ6Rity4S6AW%2Bsma4NTt%2B7udhMveM%3D%2Cexample%40email.com');

    it('should not authenticate with invalid token #1', (done) => {
        agent
            .post('/login')
            .type('form')
            .send({ sltoken: invalidToken })
            .expect(401, ['Invalid signature'])
            .end(done);
    });

    it('should not authenticate with invalid token #2', (done) => {
        agent
            .post('/login')
            .type('form')
            .send({ sltoken: invalidToken2 })
            .expect(401, ['Invalid signature'])
            .end(done);
    });

    it('should not authenticate with expired token', (done) => {
        agent
            .post('/login')
            .type('form')
            .send({ sltoken: expiredToken })
            .expect(401, ['Expired token'])
            .end(done);
    });

});
