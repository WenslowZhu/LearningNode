/**
 * Created by wenslow on 2017/6/18.
 */
'use strict';

var currency = require('./currency');

console.log('50 Canadian dollars equals this amount of US dollars:');
console.log(currency.USToCanadian(50));

console.log('30 US dollars equals this amount of Canadian dollars:');
console.log(currency.USToCanadian(30));