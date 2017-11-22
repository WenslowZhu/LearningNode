/**
 * Created by wenslow on 2017/6/18.
 */

'use strict';

var Currency = function (canadianDollar) {
    this.canadianDollar = canadianDollar;
};

Currency.prototype.roundTwoDecimal = function (amount) {
    return Math.round(amount * 100)/100;
};

Currency.prototype.canadianToUS = function (canadian) {
    return this.roundTwoDecimal(canadian * this.canadianDollar);
};

Currency.prototype.USToCanadian = function (us) {
    return this.roundTwoDecimal(us/ this.canadianDollar);
};

module.exports = Currency;

// var canadianDollar = 0.91;
//
// function roundTwoDecimals(amount) {
//     return Math.round(amount * 100) / 100;
// }
//
// exports.canadianToUS = function (canadian) {
//     return roundTwoDecimals(canadian * canadianDollar);
// };
//
// exports.USToCanadian = function (us) {
//     return roundTwoDecimals(us/canadianDollar);
// };