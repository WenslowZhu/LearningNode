/**
 * Created by wenslow on 2017/6/19.
 */
'use strict';

var flow = require('nimble'),
    exec = require('child_process').exec;

//下载指定版本的Node源码
function downloadNodeVersion(version, destination, callback) {
    var url = 'http://nodejs.org/dist/node-v' + version + '.tar.gz';
    var filepath = destination + '/' + version + '.tgz';
    exec('curl' + url + '>' + filepath, callback);
}

//按顺序执行串行任务
flow.series([
    function (callback) {
        flow.parallel()
    }
]);
