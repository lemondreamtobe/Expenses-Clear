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
$("#payBtn").on("click", use);
$("#getBtn").on("click", input);
function closeDia() {
    $.gmModelDialog("destory");
};
function intMsg() {
    $.ajax({
        url : '/initMsg',
        type : 'post',
        dataType: 'json',
        async : true,
        success: function (data) {
            $("#cardsub").empty();
            $("#cardsub").html("<h2>Card</h2><span id='card'>'"+data[0].card+"'</span>");
            $("#cashsub").empty();
            $("#cashsub").html("<h2>Cash</h2><span id=cash'>'"+data[0].cash+"'</span>");
            $("#yctsub").empty();
            $("#yctsub").html("<h2>yct</h2><span id='yct'>'"+data[0].yct+"'</span>");
            $("#totalsub").empty();
            $("#totalsub").html("<h2>total</h2><span id='total'>'"+data[0].total+"'</span>");
        }
    })
}
function input() {
    var parms ={
        type : $("#getType").val(),
        money : $("#getNum").val(),
        purpose : $("#getSource").val(),
        date   :  $("#getTime").val(),
        symbol : 0,
    }
    $.ajax({
        url : '/input',
        type: "post",
        data : JSON.stringify(parms),
        async:false,
        contentType: "application/json",
        success :function (data) {
            if(data.ret == 0){
                alert("???");
            }else if (data.ret == 1){
                alert('success');
                intMsg();
            }else{
                alert('failed');
            }
        }
    })
}

function use() {
    var parms ={
        type : $("#payType").val(),
        money : $("#payNum").val(),
        purpose : $("#payPurpose").val(),
        date   :  $("#payTime").val(),
        symbol : 1,
    }
    $.ajax({
        url : '/use',
        type: "post",
        data : JSON.stringify(parms),
        async:false,
        contentType: "application/json",
        success :function (data) {
            if(data.ret == 0){
                alert("???");
            }else if (data.ret == 1){
                alert('success');
                intMsg();
            }else{
                alert('failed');
            }
        }
    })
}