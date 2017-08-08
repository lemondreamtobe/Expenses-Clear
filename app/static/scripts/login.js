/**
 * Created by feng on 2017/7/31.
 */
$(function(){
	
	//DOM初始化
	
	//EVENT初始化
	$('#login').on('click', function() {
	    $('form').submit();
        // var pData = {
        //     'inputUsername' : $("#user").val(),
        //     'inputPassword'  : $("#key").val()
        // };
        // $.ajax({
        //     url         : '/loginData',
        //     type        : 'post',
        //     async       : true,
        //     contentType	: "application/json",
        //     dataType	: 'json',
        //     data		: JSON.stringify(pData),
        //     success     : function (data) {
        //         window.location.href = data;
        //     }
        //
        // })
        
        //
    });
	$('#register').on('click', function() {
	    var register = new Login();
	    register.register();
    });

});
function Login() {
    this.user = $('#user').val();
    this.key  = $('#key').val();
};


Login.prototype = {
    constructor : Login,
    login : function () {
        
    },
    register : function () {
        $.gmModelDialog({
            title: "注册",
            dragEnabled: true,
            iframeUrl: '../views/register.html',
            width: 408,
            height: 400
        });
    }
};
function closeDia() {
    $.gmModelDialog("destory");
};
function  login() {
    $('#login').on('click', function() {
        var pData = {
            'name' : $("#user").val(),
            'pwd'  : $("#key").val()
        };
        $.ajax({
            url         : '/loginData',
            type        : 'post',
            async       : false,
            contentType	: "application/json",
            dataType	: 'json',
            data		: JSON.stringify(pData),
            success     : function () {

            }

        })

        //
    });
}