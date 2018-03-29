//搜索历史记录
historyUL.onclick = function(ev) {
    var oEvent = ev || event;
    //事件委托：target/srcElement获取当前触发事件的事件源
    var target = oEvent.target || oEvent.srcElement;
    //兼容IE和FF
    localS("ajaxVal", target.innerHTML);
    appcan.window.open({
        name : "search",
        data : "search.html"
    });

    appcan.window.evaluatePopoverScript({
        name : 'search',
        popName : 'content',
        scriptContent : ' searchFunction () '
    });
}
$(".clearHis").click(function(){
    appcan.locStorage.remove("hist");
    location.reload();
})
