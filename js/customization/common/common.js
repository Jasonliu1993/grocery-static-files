/**
 * Created by Jason on 17/10/2017.
 */

var userNameFlag = 'N';
var emailFlag = 'N';

function checkUserNameIsNotNull() {
    var userName = $("#userName").val();
    if (userName == null || userName == undefined || userName == '') {
        return false;
    } else
        return true;
}

function checkEmailIsNotNull() {
    var email = $("#activeEmail").val();
    if (email == null || email == undefined || email == '') {
        return false;
    }
    return true;
}

function checkPasswordIsNotNull() {
    var password = $("#password4Register").val();
    if (password == null || password == undefined || password == '') {
        return false;
    }
    return true;
}

function doRegisterCheck(json) {
    $("#unknowError").text('');
    if (json.data.object == 'UserName') {
        if (json.data.errorFlag == 'N') {
            $("#errorMessageUser").text(json.data.errorMessage);
            $("#doRegister").addClass("disabled");
            $("#doRegister").unbind("click");
            userNameFlag = 'N';
        }
        else {
            $("#errorMessageUser").text('');
            userNameFlag = 'Y';
            /*<![CDATA[*/
            if (userNameFlag == 'Y' && emailFlag == 'Y' && checkUserNameIsNotNull() && checkEmailIsNotNull() && checkPasswordIsNotNull()) {
                $("#doRegister").removeClass("disabled");
                $("#doRegister").bind("click", function () {
                    var currentURL = window.location.href;
                    $("#currentURL4Register").val(currentURL);
                    $("#registerForm").submit();
                })
            } else {
                $("#doRegister").addClass("disabled");
                $("#doRegister").unbind("click");
            }
            /*]]>*/
        }

    } else if (json.data.object == 'Email') {
        if (json.data.errorFlag == 'N') {
            $("#errorMessageEmail").text(json.data.errorMessage);
            $("#doRegister").addClass("disabled");
            $("#doRegister").unbind("click");
            emailFlag = 'N';
        }
        else {
            $("#errorMessageEmail").text('');
            emailFlag = 'Y';
            /*<![CDATA[*/
            if (userNameFlag == 'Y' && emailFlag == 'Y' && checkUserNameIsNotNull() && checkEmailIsNotNull() && checkPasswordIsNotNull()) {
                $("#doRegister").removeClass("disabled");
                $("#doRegister").bind("click", function () {
                    var currentURL = window.location.href;
                    $("#currentURL4Register").val(currentURL);
                    $("#registerForm").submit();
                })
            } else {
                $("#doRegister").addClass("disabled");
                $("#doRegister").unbind("click");
            }
            /*]]>*/
        }
    } else {
        if (json.data.errorFlag == 'N')
            $("#" + errorDom).text(json.data.errorMessage);
        else
            $("#" + errorDom).text('');
    }
}

function authInfo(object, content, errorDom, checkFlag) {
    $.ajax({
        url: '/authentication/registerCheck',
        type: "POST",//请求方式：get或post
        scriptCharset: 'utf-8',
        dataType: "json",//数据返回类型：xml、json、script
        cache: false,
        data: {
            'object': object,
            'content': content,
        },//自定义提交的数据
        success: function (json) {
            if (json !== null || json !== undefined || json !== '') {
                /*判断程序内部返回是否有错*/
                if (json.code == 100) {
                    if (checkFlag == "register") {
                        doRegisterCheck(json)
                    }
                    else if (checkFlag == "modify") {
                        doModifyCheck(object, json)
                    }
                } else {
                    $("#" + errorDom).text(json.message);
                }
            }
        },
        error: function (json) {
            $("#" + errorDom).text("Request Error!")
        }
    })
}

$("#userName").on("blur", function () {
    if (checkUserNameIsNotNull()) {
        authInfo("UserName", $("#userName").val(), "unknowError", "register");
    } else {
        $("#errorMessageUser").text("用户名不能为空");
        $("#doRegister").addClass("disabled");
        $("#doRegister").unbind("click");
    }
})

$("#activeEmail").on("blur", function () {
    if (checkEmailIsNotNull()) {
        authInfo("Email", $("#activeEmail").val(), "unknowError", "register");
    } else {
        $("#errorMessageEmail").text("邮箱不能为空");
        $("#doRegister").addClass("disabled");
        $("#doRegister").unbind("click");
    }
})

$("#password4Register").on("blur", function () {
    if (checkPasswordIsNotNull()) {
        /*<![CDATA[*/
        if (userNameFlag == 'Y' && emailFlag == 'Y' && checkUserNameIsNotNull() && checkEmailIsNotNull() && checkPasswordIsNotNull()) {
            $("#errorPassword").text('');
            $("#doRegister").removeClass("disabled");
            $("#doRegister").bind("click", function () {
                var currentURL = window.location.href;
                $("#currentURL4Register").val(currentURL);
                $("#registerForm").submit();
            })
        }
        /*]]>*/
    } else {
        $("#errorPassword").text("密码不能为空");
        $("#doRegister").addClass("disabled");
        $("#doRegister").unbind("click");
    }
})

function setAdminMenuActive(currentType) {
    $(".nav-stacked li").each(function () {
        $(this).removeClass("active");
        $("#avatorUpload").css("display", "none");
        $("#emailChange").css("display", "none");
        $("#infoChange").css("display", "none");
        $("#passwordChange").css("display", "none");
    })
    $("#" + currentType + "").addClass("active");
    if (currentType == 'info') {
        $("#infoChange").css("display", "block");
    } else if (currentType == 'email') {
        $("#emailChange").css("display", "block");
    } else if (currentType == 'password') {
        $("#passwordChange").css("display", "block");
    } else {
        $("#avatorUpload").css("display", "block");
    }
}

function updatePersonalInfo(newInfo, object) {
    $.ajax({
        url: '/personalPage/updatePersonalInfo',
        type: "POST",//请求方式：get或post
        scriptCharset: 'utf-8',
        dataType: "json",//数据返回类型：xml、json、script
        cache: false,
        data: {
            'newInfo': newInfo,
            'object': object,
        },//自定义提交的数据
        success: function (json) {
            if (json !== null || json !== undefined || json !== '') {
                /*判断程序内部返回是否有错*/
                if (object == "UserName") {
                    $("#infoMessage").text(json.message);
                } else if (object == "Email") {
                    $("#emailMessage").text(json.message);
                } else if (object == "Password") {
                    $("#OldPasswordMessage").text("密码更新成功" + json.message);
                }

            }
        },
        error: function (json) {
            if (object == "UserName") {
                $("#infoMessage").text("Request Error!");
            } else if (object == "Email") {
                $("#emailMessage").text("Request Error!");
            } else if (object == "Password") {
                $("#OldPasswordMessage").text("Request Error!");
            }
        }
    })
}

function doModifyCheck(object, json) {
    if (object == 'Email') {
        $("#emailMessage").text('');
        if (json.data.errorFlag == 'N') {
            $("#emailMessage").text(json.data.errorMessage);
            $("#emailButton").addClass("disabled");
            $("#emailButton").unbind("click");
        }
        else {
            $("#emailMessage").text('');
            /*<![CDATA[*/
            $("#emailButton").removeClass("disabled");
            $("#emailButton").bind("click", function () {
//                    $("#registerForm").submit();
                updatePersonalInfo($("#inputEmail").val(), object);
            })
            /*]]>*/
        }
    }
    if (object == 'UserName') {
        $("#infoMessage").text('');
        if (json.data.errorFlag == 'N') {
            $("#infoMessage").text(json.data.errorMessage);
            $("#infoButton").addClass("disabled");
            $("#infoButton").unbind("click");
        }
        else {
            $("#infoMessage").text('');
            /*<![CDATA[*/
            $("#infoButton").removeClass("disabled");
            $("#infoButton").bind("click", function () {
//                    $("#registerForm").submit();
                updatePersonalInfo($("#inputInfo").val(), object);
            })
            /*]]>*/
        }
    }

    if (object == 'Password') {
        $("#OldPasswordMessage").text('');
        if (json.data.errorFlag == 'N') {
            $("#OldPasswordMessage").text(json.data.errorMessage);
            $("#passwordButton").addClass("disabled");
            $("#passwordButton").unbind("click");
        }
        else {
            $("#OldPasswordMessage").text('');
            /*<![CDATA[*/
            checkNewPasswordAndConfirmPassword("inputNewPassword", "NewPasswordMessage", "inputConfirmPassword", "ConfirmPasswordMessage", true)

            /*]]>*/
        }
    }

}

/*做email的非空检查*/
function checkInputEmailIsNotNull() {
    var email = $("#inputEmail").val();
    if (email == null || email == undefined || email == '') {
        return false;
    }
    return true;
}

/*做userName的非空检查*/
function checkInputUserNameIsNotNull() {
    var userName = $("#inputInfo").val();
    if (userName == null || userName == undefined || userName == '') {
        return false;
    }
    return true;
}

/*做oldPassword的非空检查*/
function checkInputOldPasswordNotNull(inputOldPassword) {
    var oldPassword = $("#" + inputOldPassword + "").val();
    if (oldPassword == null || oldPassword == undefined || oldPassword == '') {
        return false;
    }
    return true;
}

/*做newPassword的非空检查*/
function checkInputNewPasswordNotNull(inputNewPassword) {
    var newPassword = $("#" + inputNewPassword + "").val();
    if (newPassword == null || newPassword == undefined || newPassword == '') {
        return false;
    }
    return true;
}

/*做confirmPassword的非空检查*/
function checkInputConfirmPasswordNotNull(inputConfirmPassword) {
    var confirmPassword = $("#" + inputConfirmPassword + "").val();
    if (confirmPassword == null || confirmPassword == undefined || confirmPassword == '') {
        return false;
    }
    return true;
}

function checkNewPasswordAndConfirmPassword(newPassword, NewPasswordMessage, confirmPassword, ConfirmPasswordMessage, auth) {
    var newPassword = $("#" + newPassword + "").val();
    var confirmPassword = $("#" + confirmPassword + "").val();

    if (checkInputNewPasswordNotNull("inputNewPassword")) {
        $("#NewPasswordMessage").text('');
//                    authInfo("Password", $("#inputOldPassword").val(), "OldPasswordMessage", "modify");
    } else {
        $("#NewPasswordMessage").text("新密码不能为空");
        $("#passwordButton").addClass("disabled");
        $("#passwordButton").unbind("click");
        return false;
    }

    if (checkInputConfirmPasswordNotNull("inputConfirmPassword")) {
        $("#ConfirmPasswordMessage").text('');
//                checkNewPasswordAndConfirmPassword("inputNewPassword", "inputOldPassword", "ConfirmPasswordMessage");
    } else {
        $("#ConfirmPasswordMessage").text("确认密码不能为空");
        $("#passwordButton").addClass("disabled");
        $("#passwordButton").unbind("click");
        return false;
    }

    if (newPassword == confirmPassword) {
        $("#ConfirmPasswordMessage").text('');
        if (auth) {
            $("#passwordButton").removeClass("disabled");
            $("#passwordButton").bind("click", function () {
//                    $("#registerForm").submit();
                updatePersonalInfo($("#inputNewPassword").val(), "Password");
            })
        } else {
            authInfo("Password", $("#inputOldPassword").val(), "OldPasswordMessage", "modify");
        }
    } else {
        console.log(newPassword + "+" + confirmPassword)
        $("#" + ConfirmPasswordMessage + "").text("确认密码和新密码不相同");
        $("#passwordButton").addClass("disabled");
        $("#passwordButton").unbind("click");
        return false;
    }

}
