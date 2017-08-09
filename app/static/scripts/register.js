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

            },
            success: function(ret) {
                if (ret) {
                    if (evt == 1000 || evt.statusText === 'OK') {
                        alert('该帐户名已存在，请直接登录')
                        return;
                    } else if (evt == 0) {
                        alert('用户异常，注册失败，请联系管理员');
                        return;
                    } else if (evt == 1) {
                        alert('用户注册成功');
                        return;
                    }
                } else {
                    alert('请求失败');
                    return;
                }
            }
        })
    })
});