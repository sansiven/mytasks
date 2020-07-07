const Task = require('./task1');
const assert = require('assert');

const crypto = require('crypto');
const { type } = require('os');


describe("unit test", function() {
    it("should create hash for key value pair of 40character length", function(done) {
        let obj = {"key=ada": "age=32"}
        let result = Task.getHash(obj)
        console.log(result)
        assert.match(result, /^[a-f0-9]{40}$/)
        done()
    });
});