var listData = [];
function special (page,pageSize) {
      $.ajax({
        url : urlIP+"/api/v1/catalog/search?q=*&page="+page+"&pageSize="+pageSize+"&featured=True",
        type : 'get',
        dataType : 'json',
        contentType : 'application/json',
        success : function(data) {
            //console.log(data);
            appcan.locStorage.val("search", data);
            //content
                       
            if(data.product!=undefined){
            for (var i = 0; i < data.product.length; i++) {
                    var id = data.product[i].retailPrice.amount != undefined ? "￥" + data.product[i].retailPrice.amount : "";
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
       }else{
           $("#listview").html('空空如也!');
           $("#listview").css({textAlign:'center',fontSize:'1em',fontWeight:'bold',padding:'1em'});
       }
      lv.on("click", function(ele, obj, curEle) {
                    var $this = obj.id;
                    appcan.locStorage.val("productsID", data.product[$this].id);
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
            
            
            return true;
        },
        error : function(data) {
            //console.log(data)
        }
    })
}