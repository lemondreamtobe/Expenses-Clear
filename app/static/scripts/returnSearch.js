

App.init();
App.dashBoard();
var date = new Date();
switch (date.getDay()) {
    case 0 :
        day = '星期日';
        $('#DateShow').html('星期日');
        $('#DateShow2').html('星期日');
        break;
    case 1 :
        day = '星期一';
        $('#DateShow').html('星期一');
        $('#DateShow2').html('星期一');
        break;
    case 2 :
        day = '星期二';
        $('#DateShow').html('星期二');
        $('#DateShow2').html('星期二');
        break;
    case 3 :
        day = '星期三';
        $('#DateShow').html('星期三');
        $('#DateShow2').html('星期三');
        break;
    case 4 :
        day = '星期四';
        $('#DateShow').html('星期四');
        $('#DateShow2').html('星期四');
        break;
    case 5 :
        day = '星期五';
        $('#DateShow').html('星期五');
        $('#DateShow2').html('星期五');
        break;
    case 6 :
        day = '星期六';
        $('#DateShow').html('星期六');
        $('#DateShow2').html('星期六');
        break;
}
$('#DayShow').html(date.getDate());
$('#DayDayShow').html(date.getFullYear() + ' ' + (date.getMonth() + 1) + ' ' + date.getDate());
$("#btnSearch").on("click", search);
initTime();
initTabel([]);
function search() {
    var parms = {
        type : $("#selectType").val(),
        startTime : $("#timeStart").val(),
        endTime  : $("#timeEnd").val(),
        symbol : $("#costType").val()
    }
    $.ajax({
        url : '/search',
        type : 'post',
        contentType: "application/json",
        dataType: 'json',
        data : JSON.stringify(parms),
        async : true,
        success: function (data) {
            initTabel(data.rows);
        }
    });
}
function initTabel(data) {
    $('.table').bootstrapTable('destroy');

    $('.table').bootstrapTable({
        data: data,
        pagination: true,
        height: '300px',
        pageSize : 5,
        pageList : [5,10]

    });
}
function initTime() {
    //时间范围
    $(".form_datetime").datetimepicker({
        format: "yyyy-mm-dd hh:ii:ss", // hh:ii:ss
        language: "zh-CN",
        autoclose: true,
        todayBtn: 'linked',
        todayHighlight: true,
        pickerPosition: 'bottom-left'
    });
};
function  sym(value, row, index) {
    if(value == 0 ) {
        return '<span style="color:#12AC3C;">收入</span>';
    } else if(value == 1) {
        return '<span style="color:red;">支出</span>';
    } else {
        return '-';
    }
}
function  setdate(value ,row, index) {
    return value.replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
}