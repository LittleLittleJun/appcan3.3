var j = 0;
//19、searchContent  查询
//18. 搜索   
 var listData = [];
function search(val, page, pageSize,str,sort) {
    sort= sort==undefined ? "" :sort;
    str= str==undefined ? "" :str;
    j = 0;
    if ($("#inpp").val() == "") {
        $("#fontt").html("请先输入查询关键字");
    }
    $.ajax({
        url : urlIP+'/api/v1/catalog/search?q='+val+'&page='+page+'&pageSize='+pageSize+'&'+str+'&sort='+sort,
        type : 'get',
        dataType : 'json',
        contentType : 'application/json',
        // data : {
            // q : val,
            // page : page,
            // pageSize : pageSize,
            // str:str,
            // sort:sort,
        // },
        success : function(data) {
            $(".load").hide(); 
            appcan.locStorage.val("search", data);
            var info= str=='' ? val :str;
            $("#fontt").html("与" + info + "相关的产品");
            //searchContent();
            var j = 0;
            var data = eval("(" + appcan.locStorage.val("search") + ")");
            if (data.product != undefined) {
                for (var i = 0; i < data.product.length; i++) {
                    j++;
                    var id = data.product[i].retailPrice.amount != undefined ? "￥" + data.product[i].retailPrice.amount : "";
                    if(data.product[i].retailPrice.amount<=0){
                        id="待定";
                    }
                    var name = data.product[i].name != undefined ? data.product[i].name : "";
                    var description = data.product[i].description != undefined ? data.product[i].description : "";
                    var img = data.product[i].primaryMedia != undefined ? urlIP+data.product[i].primaryMedia.url : "images/zanwu.png";
                    var list = {
                        title : name,
                        describe : description,
                        note : id,
                        icon : img,
                        id : i
                    }   
                    listData.push(list);
                    lv.set(listData);
                }
                localS("numCp", j);
                //product打开详情页
                lv.on("click", function(ele, obj, curEle) {
                    var $this = obj.id;
                    localS("productsID", data.product[$this].id);
                    appcan.window.open({
                        name : "detail",
                        data : "detail.html"
                    });
                    appcan.window.evaluatePopoverScript({
                        name : 'detail',
                        popName : 'content',
                        scriptContent : ' detal_fun(locGet("productsID")) '
                    });
                })
            } else {
                $("#fontt").html("您查找的内容不存在，请重新输入");
                $("#listview").empty();
            }
        },
        error : function(e) {
            alert("error");
        }
    })
}
