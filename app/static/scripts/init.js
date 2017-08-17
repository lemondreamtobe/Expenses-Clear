$(function () {
    intMsg();
})
function intMsg() {
    $.ajax({
        url : '/initMsg',
        type : 'post',
        dataType: 'json',
        async : true,
        success: function (data) {
            $("#card").text(data[0].card);
            $("#cash").text(data[0].cash);
            $("#yct").text(data[0].yct);
            $("#total").text(data[0].total);
        }
    })
}