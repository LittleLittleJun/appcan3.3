function initInfo() {
    if (appcan.locStorage.val('userInfo') != null) {
        var d = eval("(" + appcan.locStorage.val('userInfo') + ")");
        $("#email").val(d.emailAddress);
        $("#name").val(d.firstName);
    } else if (appcan.locStorage.val("datadenglu") != null) {
        var data = eval("(" + appcan.locStorage.val("datadenglu") + ")");
        $("#email").val(data.emailAddress);
        $("#name").val(data.firstName);
    } else {
        alert("用户未登陆 ");
    }
}

appcan.button("#submitInfo", "btn-act", function() {
    var data = eval("(" + appcan.locStorage.val("datadenglu") + ")");
    if (data != null) {
        if ($("#email").val() != data.emailAddress) {
            alert("邮箱地址不正确");
            return;
        }
        var data = eval("(" + appcan.locStorage.val("datadenglu") + ")");
        if (data != null) {
            var customerId = data.id;
        } else if (appcan.locStorage.getVal("temporaryId") != undefined) {
            var customerId = appcan.locStorage.getVal("temporaryId");
        } else {
            addNewCar();
            var customerId = appcan.locStorage.getVal("temporaryId");
        }
        changeInfo($("#email").val(), $("#name").val(), $("#name").val(), customerId);

    } else {
        alert("请先登录");
        appcan.window.open({
            name : "denglu",
            data : "denglu.html"
        });
    }
})