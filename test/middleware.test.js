const app = require('./server');
const request = require('supertest');

const agent = request(app);

describe('Middleware', () => {

    const invalidTokenWithScope = decodeURIComponent('http%3A%2F%2Flocalhost%3A3001%252Chttp%3A%2F%2Flocalhost%3A3001%252Caction%3DMoney%25252520Transfer%26amount%3D100%26address%3Defg%252C4651521845%2CQdFNqTrq%2FmjiflYNY70GIQkT0i2HbO0JdByVwWxFn4igkdviZV0OSAUjZbkb%2BMsqVhihuDUR%2BRFgiqJYerG1Bg%3D%3D%252CpXMsCTzTkbf0H0844zdaj79MQDNVbhJou%2BHq8laFLJ4%3D%2CFPS%2FonjSa0ojlSzp9zXEiot5MgZcMwXR0sAIdgJMxaE%3D%252CbruQ61utUBPay5QJ6Rity4S6AW%2Bsma4NTt%2B7udhMveM%3D%2Cexample%40email.com');
    const validTokenWithScope = decodeURIComponent('http%3A%2F%2Flocalhost%3A3001%252Chttp%3A%2F%2Flocalhost%3A3001%252Caction%3DMoney%25252520Transfer%26amount%3D100%26address%3Dabcdefg%252C4651521845%2CQdFNqTrq%2FmjiflYNY70GIQkT0i2HbO0JdByVwWxFn4igkdviZV0OSAUjZbkb%2BMsqVhihuDUR%2BRFgiqJYerG1Bg%3D%3D%252CpXMsCTzTkbf0H0844zdaj79MQDNVbhJou%2BHq8laFLJ4%3D%2CFPS%2FonjSa0ojlSzp9zXEiot5MgZcMwXR0sAIdgJMxaE%3D%252CbruQ61utUBPay5QJ6Rity4S6AW%2Bsma4NTt%2B7udhMveM%3D%2Cexample%40email.com');

    const validTokenWithScopeSuccess = {
        action: 'Money Transfer',
        amount: 100,
        address: 'abcdefg'
    };

    it('should not validate invalid scope', (done) => {
        agent
            .post('/scope')
            .type('form')
            .send({ sltoken: invalidTokenWithScope })
            .expect(401, ['Invalid signature'])
            .end(done);
    });

    it('should successfully validate scope', (done) => {
        agent
            .post('/scope')
            .type('form')
            .send({ sltoken: validTokenWithScope })
            .expect(200, validTokenWithScopeSuccess)
            .end(done);
    });

});
