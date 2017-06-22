const app = require('./server');
const request = require('supertest');

const agent = request(app);

describe('Middleware', () => {

    const invalidTokenWithModeChange = decodeURIComponent('http%3A%2F%2Flocalhost%3A3001%252Chttp%3A%2F%2Flocalhost%3A3001%252Cmode%3Dchange%26to%3Dhttp%2525253A%2525252F%2525252Flocalhost%2525253A3001%252525252Chttp%2525253A%2525252F%2525252Flocalhost%2525253A3001%252525252C%252525252C4651539987%2525252C5JG%2525252Bsq816blWVS2rVecZw9lT622H2ju36NQ6ucQ6WTjgnM%2525252Biwpu7ajpA4cX9RQYDCpfgv0EXEbFc1MqAHOvGBQ%2525253D%2525253D%252525252CEaDFqEy7Mc4Yqd0KJYMS4YkJrDMjOgKFbUOtTmVeYlM%2525253D%2525252CA%2525252BPMlDoqIwyuNNuKxBiLEY9BOPIgvUKVMPP6w8Gs6Yk%2525253D%252525252CFHgyYTPN8IEPH1nNU%2525252FWk8rXQl61fCtaddFMB%2525252FEOGRMQ%2525253D%2525252Cmynewemail%25252540email.com%252C4651539987%2CGATB7CqWRiMERT%2BXZr2jeAsdboiJPR7iaF02kQlRrsvbsCgzpfxKLOxcRbqnBNGS976H9GE9NN7SXVzDw%3D%3D%252C1kU5GL7VyHthY0ERRUZBs1H2XXrfdaXMDHlHeUaaeQ0%3D%2CH%2FACXE1OzQuhfbjp%2BCe43CXRox28vGIxQaoFzbj6Y94%3D%252C74a%2BBh8sSMIHvB%2BB%2B7ktzenyijVJIJkB7Hbb%2F2Z0dPQ%3D%2Cexample%40email.com');
    const invalidTokenWithModeChange2 = decodeURIComponent('http%3A%2F%2Flocalhost%3A3001%252Chttp%3A%2F%2Flocalhost%3A3001%252Cmode%3Dchange%26to%3Dhttp%2525253A%2525252F%2525252Flocalhost%2525253A3001%252525252Chttp%2525253A%2525252F%2525252Flocalhost%2525253A3001%252525252C%252525252C4651539987%2525252C5JG%2525252Bsq81w9lT622H2ju36NQ6ucQ6WTjgnM%2525252Biwpu7ajpA4cX9RQYDCpfgv0EXEbFc1MqAHOvGBQ%2525253D%2525253D%252525252CEaDFqEy7Mc4Yqd0KJYMS4YkJrDMjOgKFbUOtTmVeYlM%2525253D%2525252CA%2525252BPMlDoqIwyuNNuKxBiLEY9BOPIgvUKVMPP6w8Gs6Yk%2525253D%252525252CFHgyYTPN8IEPH1nNU%2525252FWk8rXQl61fCtaddFMB%2525252FEOGRMQ%2525253D%2525252Cmynewemail%25252540email.com%252C4651539987%2CGATB7CqWRiMERT%2BXZr2jeA8ze6fpTboiJPR7iaF02kQlRrsvbsCgzpfxKLOxcRbqnBNGS976H9GE9NN7SXVzDw%3D%3D%252C1kU5GL7VyHthY0ERRUZBs1H2XXrfdaXMDHlHeUaaeQ0%3D%2CH%2FACXE1OzQuhfbjp%2BCe43CXRox28vGIxQaoFzbj6Y94%3D%252C74a%2BBh8sSMIHvB%2BB%2B7ktzenyijVJIJkB7Hbb%2F2Z0dPQ%3D%2Cexample%40email.com');
    const validTokenWithModeChange = decodeURIComponent('http%3A%2F%2Flocalhost%3A3001%252Chttp%3A%2F%2Flocalhost%3A3001%252Cmode%3Dchange%26to%3Dhttp%2525253A%2525252F%2525252Flocalhost%2525253A3001%252525252Chttp%2525253A%2525252F%2525252Flocalhost%2525253A3001%252525252C%252525252C4651539987%2525252C5JG%2525252Bsq816blWVS2rVecZw9lT622H2ju36NQ6ucQ6WTjgnM%2525252Biwpu7ajpA4cX9RQYDCpfgv0EXEbFc1MqAHOvGBQ%2525253D%2525253D%252525252CEaDFqEy7Mc4Yqd0KJYMS4YkJrDMjOgKFbUOtTmVeYlM%2525253D%2525252CA%2525252BPMlDoqIwyuNNuKxBiLEY9BOPIgvUKVMPP6w8Gs6Yk%2525253D%252525252CFHgyYTPN8IEPH1nNU%2525252FWk8rXQl61fCtaddFMB%2525252FEOGRMQ%2525253D%2525252Cmynewemail%25252540email.com%252C4651539987%2CGATB7CqWRiMERT%2BXZr2jeA8ze6fpTboiJPR7iaF02kQlRrsvbsCgzpfxKLOxcRbqnBNGS976H9GE9NN7SXVzDw%3D%3D%252C1kU5GL7VyHthY0ERRUZBs1H2XXrfdaXMDHlHeUaaeQ0%3D%2CH%2FACXE1OzQuhfbjp%2BCe43CXRox28vGIxQaoFzbj6Y94%3D%252C74a%2BBh8sSMIHvB%2BB%2B7ktzenyijVJIJkB7Hbb%2F2Z0dPQ%3D%2Cexample%40email.com');

    const invalidTokenWithScope = decodeURIComponent('http%3A%2F%2Flocalhost%3A3001%252Chttp%3A%2F%2Flocalhost%3A3001%252Caction%3DMoney%25252520Transfer%26amount%3D100%26address%3Defg%252C4651521845%2CQdFNqTrq%2FmjiflYNY70GIQkT0i2HbO0JdByVwWxFn4igkdviZV0OSAUjZbkb%2BMsqVhihuDUR%2BRFgiqJYerG1Bg%3D%3D%252CpXMsCTzTkbf0H0844zdaj79MQDNVbhJou%2BHq8laFLJ4%3D%2CFPS%2FonjSa0ojlSzp9zXEiot5MgZcMwXR0sAIdgJMxaE%3D%252CbruQ61utUBPay5QJ6Rity4S6AW%2Bsma4NTt%2B7udhMveM%3D%2Cexample%40email.com');
    const validTokenWithScope = decodeURIComponent('http%3A%2F%2Flocalhost%3A3001%252Chttp%3A%2F%2Flocalhost%3A3001%252Caction%3DMoney%25252520Transfer%26amount%3D100%26address%3Dabcdefg%252C4651521845%2CQdFNqTrq%2FmjiflYNY70GIQkT0i2HbO0JdByVwWxFn4igkdviZV0OSAUjZbkb%2BMsqVhihuDUR%2BRFgiqJYerG1Bg%3D%3D%252CpXMsCTzTkbf0H0844zdaj79MQDNVbhJou%2BHq8laFLJ4%3D%2CFPS%2FonjSa0ojlSzp9zXEiot5MgZcMwXR0sAIdgJMxaE%3D%252CbruQ61utUBPay5QJ6Rity4S6AW%2Bsma4NTt%2B7udhMveM%3D%2Cexample%40email.com');

    const validTokenWithScopeSuccess = {
        _raw: 'action=Money%20Transfer&amount=100&address=abcdefg',
        action: 'Money Transfer',
        amount: '100',
        address: 'abcdefg'
    };

    it('should not validate invalid change request #1', (done) => {
        agent
            .post('/securelogin')
            .type('form')
            .send({ sltoken: invalidTokenWithModeChange })
            .expect(401)
            .end(done);
    });

    it('should not validate invalid change request #2', (done) => {
        agent
            .post('/securelogin')
            .type('form')
            .send({ sltoken: invalidTokenWithModeChange2 })
            .expect(401)
            .end(done);
    });

    it('should successfully validate change request', (done) => {
        agent
            .post('/securelogin')
            .type('form')
            .send({ sltoken: validTokenWithModeChange })
            .expect(200)
            .end(done);
    });

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
