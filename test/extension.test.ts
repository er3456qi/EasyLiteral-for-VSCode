//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as myExtension from '../src/extension';

// Defines a Mocha test suite to group tests of similar kind together
suite("Extension Tests", () => {

    // Defines a Mocha unit test
    test("RegEx 1", () => {
        const regEx = /`\w[-\w\s_']+/;
        assert.equal(true, regEx.test('`hello world'));
        assert.equal(false, regEx.test('hello world'));
   
    });
    test("RegEx 2", () => {
        const regEx =  /`\w[(\w+=\+?\w+)\s,]+/;
        assert.equal(true, regEx.test('`a=b c=+d'));
        assert.equal(true, regEx.test('`a=b,c=+d'));
        assert.equal(false, regEx.test('abcd'));
    });
});