const app = require('./server');
const request = require('supertest');

const agent = request(app);

describe('Strategy', () => {

    const validToken = decodeURIComponent('http%3A%2F%2Flocalhost%3A3001%252Chttp%3A%2F%2Flocalhost%3A3001%252C%252C4651339663%2Cgjs%2BD1dTCf8FFHWmQizu7Nlt9uVm4jRhEG3J96gzktGKj5IkQcOb%2BqkJyTEBt9LY99pqqNrtKwxXNrlRyvocAA%3D%3D%252CUNKOGVd%2FodZL071ic8sGijtAuBF6Jc262nSAI4O%2BEl4%3D%2CFPS%2FonjSa0ojlSzp9zXEiot5MgZcMwXR0sAIdgJMxaE%3D%252CbruQ61utUBPay5QJ6Rity4S6AW%2Bsma4NTt%2B7udhMveM%3D%2Cexample%40email.com');

    const validTokenSuccess = {
        authkeys: {
            public: 'FPS/onjSa0ojlSzp9zXEiot5MgZcMwXR0sAIdgJMxaE=',
            secret: 'bruQ61utUBPay5QJ6Rity4S6AW+sma4NTt+7udhMveM='
        },
        email: 'example@email.com'
    };

    it('should successfully login', (done) => {
        agent
            .post('/login')
            .type('form')
            .send({ sltoken: validToken })
            .expect(200, validTokenSuccess)
            .end(done);
    });

});
