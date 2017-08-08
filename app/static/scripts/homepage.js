/**
 * Created by Administrator on 2017/8/6.
 */

var pay = {
    payBtn : $('#payBtn'),
    payType : $('#payType'),
    payNum : $('#payNum'),
    payTime : $('#payTime'),
    payPurpose : $('#payPurpose')
};
var get = {
    getBtn : $('#getBtn'),
    getType : $('#getType'),
    getNum : $('#getNum'),
    getTime : $('#getTime'),
    getSource : $('#getSource')
};
$('#modifyKey').on('click', function () {
    $.gmModelDialog({
        title: "修改密码",
        dragEnabled: true,
        iframeUrl: '../views/modifyKey.html',
        width: 408,
        height: 400
    });
});
function closeDia() {
    $.gmModelDialog("destory");
};