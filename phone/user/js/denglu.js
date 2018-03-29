appcan.button("#zhuceIntime", "ani-act", function() {
    appcan.window.open({
        name : "zhuce2",
        data : "zhuce2.html"
    });
})
appcan.button("#denglu", "ani-act", function() {
    if ($("#emaildl").val() == '') {
        alert("请输入登陆邮箱");
        return;
    }
    if ($("#mimadl").val() == "") {
        alert("请输入登陆密码");
        return;
    } else {
        denglu($("#emaildl").val(), $("#mimadl").val());

    }
})
