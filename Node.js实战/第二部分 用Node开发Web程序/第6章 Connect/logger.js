/**
 * Created by wenslow on 2017/6/24.
 */

'use strict';

function setup(format) {
    const regexp = /:(w+)/g;
    return function logger(req, res, next) {
        const str = format.replace(regexp, function (match, property) {
            return req[property];
        });
        console.log(str);
        next();
    };
}

module.exports = setup;