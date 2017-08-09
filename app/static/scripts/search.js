/**
 * Created by feng on 2017/8/4.
 */
$(function () {
        //initialize the javascript
        App.init();
        App.dashBoard();

//      introJs().setOption('showBullets', false).start();
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
        function initTime() {
            //时间范围
            $(".form_datetime").datetimepicker({
                format: "yyyy-mm-dd", // hh:ii:ss
                language: "zh-CN",
                autoclose: true,
                todayBtn: 'linked',
                todayHighlight: true,
                pickerPosition: 'bottom-left',
                minView: 'month'
            });
        };
        $('#DayShow').html(date.getDate());
        $('#DayDayShow').html(date.getFullYear() + ' ' + (date.getMonth() + 1) + ' ' + date.getDate());
        $('#selectTime').change(function() {
            if($(this).val() == "3") {
                $('.time-area').removeClass('hidden');
                initTime();
            } else {
                $('.time-area').addClass('hidden');
            }
        });
    initTable();
    $('#btnSearch').on('click', onSearch);
    parent.pay.payBtn.on('click', function () {
        var type = parent.pay.payType.val();
        var num = parent.pay.payNum.val();
        var costPurpose = parent.pay.payPurpose.val();
        var time = parent.pay.payTime.val();
        Lemon.cost(type, num, time, costPurpose);
        parent.pay.payNum.val("");
        parent.pay.payPurpose.val("");
        parent.pay.payTime.val("");
        alert("success");
    });
});
var Lemon = new PersonalFiance({
    card : 4071.61,
    cash : 1700,
    yct : 110
});
Lemon.cost('card', 78, '2017 7 31', 'Buy fruit of Mango')
    .cost('yct', 1.9 * 2, '2017 7 31', 'Subway')
    .cost('yct', 1.9 * 2, '2017 8 1', 'Subway')
    .cost('card', 10, '2017 8 1', 'Jquery B to buy model')
    .cost('card', 448, '2017 8 1', 'JD baitiao')
    .cost('yct', 1.9 * 2, '2017 8 2', 'Subway')
    .cost('card', 24, '2017 8 2', 'Net cost')
    .cost('card', 35, '2017 8 3', 'Bee mi')
    .cost('yct', 1.9 * 2, '2017 8 3', 'Subway')
    .cost('yct', 1.9 * 2, '2017 8 4', 'Subway')
    .cost('cash', 34.7+28+6.5+15, '2017 8 5', 'Buy life usafes and vegetable and jianfa');
Lemon.yct = 0;
Lemon.cost('cash', 2*2, '2017 8 6', 'traffic to learn guitar')
    .cost('cash', 2*2, '2017 8 7', 'Subway')
    .cost('card', 68, '2017 8 7', 'buy yct')
    .cost('card', 50, '2017 8 8', 'chongzhi yct');
Lemon.yct = 50;
Lemon.cost('yct', 4, '2017 8 8', 'Subway')
    .cost('card', 3, '2017 8 8', 'stone by ice-cream')
    .cost('yct', 4, '2017 8 9', 'Subway');
function initTable(data) {
    //先销毁表格
    $('.table').bootstrapTable('destroy');

    $('.table').bootstrapTable({
        data: data,
        pagination: false,
        height: '600px'
    });
};
var params = {};
var page = 0;
var pageCount = -1;
function onSearch() {
    params = {};
    page = 0;
    pageCount = -1;
    var selectType = $("#selectType").val(); //查询类型
    var selectTime = $("#selectTime").val(); //查询时间
    var costType = $('#costType').val(); //金额类型
    var beginTime = null;
    var endTime = null;
    switch($('#selectTime').val()) {
        case "1":
            var now = new Date();
            endTime = Math.floor(now.getTime());
            beginTime = Math.floor(new Date(now.getTime() - 7 * 24 * 3600 * 1000).getTime());
            break;
        case "2":
            var now = new Date();
            endTime = Math.floor(now.getTime());
            beginTime = Math.floor(now.setMonth(now.getMonth() - 1));
            break;
        case "3":
            var timeS = $('#timeStart').val() + ' 00:00:00';
            var timeE = $('#timeEnd').val() + ' 23:59:59';
            beginTime = +new Date(timeS);
            endTime = +new Date(timeE);
            break;
    }

    params = {
        "selectType": selectType,
        "selectTime": selectTime,
        "endTime": endTime,
        "costType": costType,
        "beginTime": beginTime,
        "endTime": endTime
    }
    $('#pagePrev').attr('disabled', true);
    $('#pageNext').attr('disabled', true);
    search(params);
};
function search(o) {
    var tableInfo = [];
    var midObject = null;

    if (o.costType == '1') {
        midObject = Lemon.payLog;
    } else {
        midObject = Lemon.getLog;
    };

    for (var i in midObject) {

        if (midObject[i]) {
            var a = +(new Date(i));

            if (a > o.endTime && a < o.beginTime) {

            } else {
                tableInfo.push(midObject[i]);
            }
        } else {

        }
    }
    var infoArray = [];

    if (o.selectType == 'cash') {

        for (var k = 0; k < tableInfo.length ; k++) {

            for (var l = 0; l < tableInfo[k].length; l++) {

                if (tableInfo[k][l].type == 'cash') {
                    infoArray.push(tableInfo[k][l]);
                }
            }
        }
    } else if (o.selectType == 'card') {
        for (var u = 0; u < tableInfo.length ; u++) {
            for (var r = 0; r < tableInfo[u].length; r++) {
                if (tableInfo[u][r].type == 'card') {
                    infoArray.push(tableInfo[u][r]);
                }
            }
        }
    } else {
        for (var q = 0; q < tableInfo.length ; q++) {
            for (var w = 0; w < tableInfo[q].length; w++) {
                if (tableInfo[q][w].type == 'yct') {
                    infoArray.push(tableInfo[q][w]);
                }
            }
        }
    }
    initTable(infoArray);
}

