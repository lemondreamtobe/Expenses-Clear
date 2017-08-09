/**
 * Created by feng on 2017/7/31.
 */
$(function () {
    $('#cancel').on('click', function () {
        parent.closeDia();
    });
    $('#register').on('click', function () {
        var params = {};
        params.username = $('#user').val();
        params.card = $('#card').val();
        params.cash = $('#cash').val();
        params.password = $('#key').val();
        params.yct = $('#yct').val();
        $.ajax({
            url: '/register',
            type: "post",
            contentType: "application/json",
            dataType: 'json',
            data: JSON.stringify(params),
            cache: false,
            error: function(evt) {
                if (evt.status === 200 || evt.statusText === 'OK') {
                    alert('注册并未成功！请通知管理员！')
                }
            },

            success: function(ret) {

            }
        })
    })
});