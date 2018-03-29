//判断用户id
var data = eval("(" + appcan.locStorage.val("datadenglu") + ")");
if (data != null) {
    var customerId = data.id;
} else if (appcan.locStorage.getVal("temporaryId") != undefined) {
    var customerId = appcan.locStorage.getVal("temporaryId");
} else {
    addNewCar();
    var customerId = appcan.locStorage.getVal("temporaryId");
}
appcan.button("#chgPasWd", "ani-act", function() {
    var data = eval("(" + appcan.locStorage.val("datadenglu") + ")");
    //console.log(data);
    if (data != null) {
        if (isMima($("#newpass").val())) {
            if ($("#connewpass").val() == $("#newpass").val()) {
                password(customerId, $("#oldpass").val(), $("#newpass").val(), $("#connewpass").val());
            } else {
                alert("两次密码输入不一致")
            }
        }
    } else {
        alert("请先登录再修改密码");
        appcan.window.open({
            name : "denglu",
            data : "denglu.html"
        });
    }
})