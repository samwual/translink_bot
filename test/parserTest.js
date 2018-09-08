const expect = require("chai").expect;
const parser = require('../app/parser.js');
const errors = require('../resources/errors.js');
const constants = require('../resources/constants.js');

describe("ParserTest", function() {
    describe('Data given', () => {
        //real valid info
        var expected_bus_stop = constants.test_bus_stop;
        var expected_bus_route = constants.test_bus_route;

        it(':: should return the expected bus stop and bus number for properly formatted data', () => {
            let data = expected_bus_stop + ' ' + expected_bus_route;
            var bus_data = parser.parse(data);

            expect(bus_data.bus_stop).to.deep.equal(expected_bus_stop);
            expect(bus_data.bus_route).to.deep.equal(expected_bus_route);
        });

        it(':: should return the expected bus stop and bus number for data that is valid but irregularly formatted', () => {
            let data = expected_bus_stop + ' 0' + expected_bus_route;
            var bus_data = parser.parse(data);

            expect(bus_data.bus_stop).to.deep.equal(expected_bus_stop);
            expect(bus_data.bus_route).to.deep.equal('0' + expected_bus_route);
        });

        it(':: should only parse the first group of bus data given', () => {
            let data = expected_bus_stop + ' ' + expected_bus_route + ' 12345 12';
            var bus_data = parser.parse(data);

            expect(bus_data.bus_stop).to.deep.equal(expected_bus_stop);
            expect(bus_data.bus_route).to.deep.equal(expected_bus_route);
        });

        it(':: should ignore any other information given with the data', () => {
            let data = expected_bus_stop + ' ' + expected_bus_route + ' I am a big fan of this account';
            var bus_data = parser.parse(data);

            expect(bus_data.bus_stop).to.deep.equal(expected_bus_stop);
            expect(bus_data.bus_route).to.deep.equal(expected_bus_route);
        });

        it(':: should be able to find the data if given in the middle of a sentence', () => {
            let data = 'hey can you find ' + expected_bus_stop + ' ' + expected_bus_route + ' for me, thanks';
            var bus_data = parser.parse(data);

            expect(bus_data.bus_stop).to.deep.equal(expected_bus_stop);
            expect(bus_data.bus_route).to.deep.equal(expected_bus_route);
        });

        it(':: should be able to find the data if there exists letters before or after data', () => {
            let data = 'aaaa' + expected_bus_stop + ' ' + expected_bus_route + 'bbbbb';
            var bus_data = parser.parse(data);

            expect(bus_data.bus_stop).to.deep.equal(expected_bus_stop);
            expect(bus_data.bus_route).to.deep.equal(expected_bus_route);
        });
    })

    describe('Incorrectly Formatted Data', () => {
        it(':: Letter typo', () => {
            expect(() => { parser.parse('599a2 68')} ).to.throw(Error, errors.cannot_find_data);
        });
    
        it(':: Missing space', () => {
            expect(() => { parser.parse('5994268')} ).to.throw(Error, errors.cannot_find_data);
        });
    })

    it(':: should throw an error if given no data', () => {
        expect(() => { parser.parse('hey what is up?')} ).to.throw(Error, errors.cannot_find_data);
    });
});