//最新动态、、资料中心
var listData = [];
function news(d) {
    $.ajax({
        url : urlIP+"/api/v1/myresource/menu?menuName=" + d,
        type : "get",
        dataType : "json",
        contentType : 'application/json',
        success : function(data) {
            console.log(data);
            if(data.menuItem!=undefined){
                  for (var i = 0; i < data.menuItem.length; i++) {
                var title = '';
                var bodyhtml='';
                if(data.menuItem[i].lobValue!=undefined){
                    title = data.menuItem[i].label;
                    var list = {
                    title : title,
                    id : i,
                    icon : "css/icons/icon-caret-right.png"
                }
                listData.push(list);
                lv.set(listData);
                }
            }
            lv.on("click", function(ele, obj, curEle) {
                if (data.menuItem[obj.id].lobValue != undefined) {
                    var d=data.menuItem[obj.id].lobValue;
                    var urlIP="http://10.7.65.21:8080";
                    d=d.replace(/src="/g, 'src="'+urlIP).replace(/href="/g,'href="'+urlIP);
                   // console.log(unescape(d));
                    bodyhtml=d;
                } else {
                    bodyhtml=urlIP+data.menuItem[obj.id].url;
                }
                appcan.locStorage.val('newsdetail',bodyhtml);
                appcan.window.open({
                    name:"newsDetail",
                    data:"newsDetail.html"
                })
                //console.log(bodyhtml);
            })
            }else{
                document.write("<p style='font-size: 2.5em;padding: 1em;'>暂无信息</p>");
            }
        },
        error : function(e) {
            //console.log(e);
        }
    })
}


