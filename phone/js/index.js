function localS(a, v) {
    return appcan.locStorage.setVal(a, v);
}

function locGet(v) {
    return appcan.locStorage.getVal(v);
}

// 查询功能//
appcan.button("#f-ss", "ani-act", function() {
    localS("ajaxVal", $("#inval").val());
    if ($("#inval").val() == "") {
        alert("请先输入查询关键字");
        return;
    }
    appcan.locStorage.remove('pricesc');
    appcan.locStorage.remove("str");
    openSearch();
});
appcan.button("#f-ss2", "ani-act", function() {
    localS("ajaxVal", $("#inval2").val());
    if ($("#inval2").val() == "") {
        alert("请先输入查询关键字");
        return;
    }
    appcan.locStorage.remove('pricesc');
    appcan.locStorage.remove("str");
    openSearch();
});
function openSearch() {
    var historY = appcan.locStorage.getVal("hist");
    if (historY != null) {
        historY = historY + "###" + $("#inval").val();
    } else {
        historY = $("#inval").val();
    }

    appcan.locStorage.setVal('hist', historY);
    appcan.window.open({
        name : "search",
        data : "search.html"
    });
    appcan.window.evaluatePopoverScript({
        name : 'search',
        popName : 'content',
        scriptContent : 'searchFunction () ;$("#inval").blur();'
    });
}

//历史记录功能
$(".searchVal").on("click", function() {
    //数组除重/////////////////
    $(".searchVal").val("");
    Array.prototype.unique3 = function() {
        var res = [];
        var json = {};
        for (var i = 0; i < this.length; i++) {
            if (!json[this[i]]) {
                res.push(this[i]);
                json[this[i]] = 1;
            }
        }
        return res;
    }
    appcan.window.open({
        name : "history",
        data : "history.html"
    });
    var s = appcan.locStorage.getVal("hist");
    $("#historyUL").empty();
    if (appcan.locStorage.getVal("hist") == null) {
        $("#historyUL").append("<li class='nohis'>暂无搜索历史记录</li>");
    } else {
        s = appcan.locStorage.getVal("hist").split("###");
        //  arr.unique3() 数组除重函数
        var arr = appcan.locStorage.getVal("hist").split("###");
        for (var i = arr.unique3().length - 1; i >= 0; i--) {
            $("#historyUL").append("<li class='hisli'>" + arr.unique3()[i] + "</li>");
        }
    }
})
