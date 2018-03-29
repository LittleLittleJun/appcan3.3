//登录
function denglu(email, password) {
    $.ajax({
        url : urlIP+"/api/v1/myresource/login",
        type : 'get',
        dataType : 'json',
        contentType : 'application/json',
        data : {
            email : email,
            password : password,
        },
        success : function(data) {
            //console.log(data)
            alert("登陆成功!");
            appcan.locStorage.val("datadenglu", data);
            appcan.locStorage.val("indexLoda", '2');

            appcan.window.close(-1);
            appcan.window.open({
                name : 'index',
                data : 'index.html'
            })
            appcan.window.evaluatePopoverScript({
                name : 'index',
                popName : 'content',
                scriptContent : 'initInfo() '
            });
            return true;
        },
        error : function(data) {
            //console.log(data)
            alert(urlIP+"not found");
        }
    })
}

//注册 //appcan.window.evaluateScript("indexCon_2.html", "alert('000')");
function zhuce(email, firstName, password, passwordConfirm) {
    $.ajax({
        //url : "/api/v1/myresource/register?email="+email+"&firstName="+firstName+"&lastName="+lastName+"&password="+password+"&passwordConfirm="+passwordConfirm,
        url : urlIP+"/api/v1/myresource/register?",
        type : 'post',
        dataType : 'json',
        contentType : 'application/json',
        data : JSON.stringify({
            emailAddress : email,
            firstName : firstName,
            password : password,
            passwordConfirm : passwordConfirm,
        }),
        success : function(data) {
            alert("注册成功");
            //console.log(data);
            addNewCar(data.id);
            appcan.window.close(-1);
            appcan.window.open({
                name : "denglu",
                data : "denglu.html"
            });
        },
        error : function(data) {
            alert("注册失败");
            //  console.log(data);
        }
    })
}

//34. 修改用户信息
function changeInfo(email, firstName, lastName, customerid) {
    $.ajax({
        url : urlIP+'/api/v1/myresource/customer?customerid=' + customerid + '&email=' + email + '&firstName=' + firstName + '&lastName=' + lastName,
        type : 'put',
        dataType : 'json',
        contentType : 'application/json',
        // data : {
        // customerid:customerid,
        // email : email,
        // firstName : firstName,
        // lastName : lastName,
        // },
        success : function(data) {
            alert("修改成功");
            appcan.locStorage.val('userInfo', data);
            appcan.locStorage.val("indexLoda", '2');

            appcan.window.evaluatePopoverScript({
                name : 'index',
                popName : 'content',
                scriptContent : ' initInfo () '
            });
            appcan.window.open({
                name : 'index',
                data : 'index.html'
            })
        },
        error : function(data) {
            alert("修改失败");
           // console.log(data);
        }
    })
}

///35. 修改用户密码
function password(customerid, currentPassword, newPassword, newPasswordConfirm) {
    $.ajax({
        url : urlIP+'/api/v1/myresource/changePassword?currentPassword=' + currentPassword + '&newPassword=' + newPassword + '&newPasswordConfirm=' + newPasswordConfirm + '&customerid=' + customerid,
        type : 'put',
        dataType : 'json',
        contentType : 'application/json',
        success : function(data) {
            alert("修改成功");
            appcan.window.close(-1);
        },
        error : function(data) {
            alert("修改失败,旧密码不正确");
        }
    })
}

function isEmail(str) {
    var filter = /\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/;
    if (filter.test(str)) {
        // alert("true")
        return true;
    } else {
        alert('请输入正确的邮件地址');
        return false;
    }
}

function isName(str) {
    var reg = /^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/;
    if (reg.test(str)) {
        return true;
    } else {
        alert("用户名格式不正确,用户名不含有空格及特殊字符");
        return false;
    }
}

function isMima(str) {
    var reg = /^[0-9A-Za-z]{6,}$/;
    if (reg.test(str)) {
        return true;
    } else {
        alert("新密码格式不正确，密码至少是六位字母加数字组成");
        return false;
    }
}

function isTel(str) {
    var reg = /0?(13|14|15|18)[0-9]{9}/;
    if (reg.test(str)) {
        return true;
    } else {
        alert("请输入正确的手机号");
        return false;
    }
}

function isZip(str) {
    var reg = /\d{6}/;
    if (reg.test(str)) {
        return true;
    } else {
        alert("请输入正确的邮政编码");
        return false;
    }
}