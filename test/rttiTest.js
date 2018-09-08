let rtti = require('../app/rtti.js');
let expect = require('chai').expect;
let constants = require('../resources/constants.js');

describe('RTTITest', () => {
    var data = constants.test_bus_stop + ' ' + constants.test_bus_route;

    it(':: should get bus stop schedule for valid data' , (done) => {
        rtti.rtti(data).then(result => {
            for (var key in result[0]) {
                expect(result[0][key]).to.not.equal(null);
            }
            
            //assert route number to make sure it is the correct route
            expect(result[0]['RouteNo']).to.deep.equal('0' + constants.test_bus_route);
            done();
        }).catch(err => {
            expect.fail(err);
            done();
        });
    });

    it(':: should fail with invalid bus data' , (done) => {
        let invalid = 'abcde f';
        rtti.rtti(invalid).then(result => {
            expect.fail(result);
            done();
        }).catch(err => {
            expect(err).instanceof(Error);
            done();
        });
    });
})