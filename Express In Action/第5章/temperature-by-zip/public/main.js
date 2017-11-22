/**
 * Created by wenslow on 2017/7/9.
 */

'use strict';

$(function() {
    var $h1 = $("h1");
    var $zip = $("input[name='zip']");
    $("form").on("submit", function(event) {
        // 禁止表单的默认提交
        event.preventDefault();
        var zipCode = $.trim($zip.val());
        $h1.text("Loading...");
        // 发送一个AJAX请求
        var request = $.ajax({
            url: "/" + zipCode,
            dataType: "json"
        });
        request.done(function(data) {
            // 当请求成功时将头部更新为当前的天气
            var temperature = data.temperature;
            // °是HTML中表示程度的符号
            $h1.html("It is " + temperature + "° in " + zipCode + ".");
        });
        // 当请求失败时确保会有错误提示
        request.fail(function() {
            $h1.text("Error!");
        });
    });
});