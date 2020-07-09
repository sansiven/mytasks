const assert = require('chai').assert;
const getHash = require('../task1').getHash;


describe('App', function(){
    let obj = {"key=ada": "age=32"}
    const result = getHash(obj);

    it('getHash should return a hash of type string when prvide with a input', function(){
        assert.typeOf(result, 'string');
    })

    it('getHash should create a hash from key value pair of 40character length', function(){
        assert.match(result, /^[a-f0-9]{40}$/)
    })

})