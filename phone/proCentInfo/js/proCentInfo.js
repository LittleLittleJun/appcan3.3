/////////////产品中心///////////
var listData = [];
function proCenDetail(categoryId, q, page, pageSize) {
    //$("#listview").empty();
    var firstName = appcan.locStorage.val('firstName') == null ? '' : ' >> ' + appcan.locStorage.val('firstName');
    var lastName = appcan.locStorage.val('lastName') == null ? '' : ' >> ' + appcan.locStorage.val('lastName');
    $("#smallName").html(lastName);
    $("#bigName").html(firstName);
    $.ajax({
        url: urlIP + "/api/v1/catalog/search/category/" + categoryId + "?q=" + q + "&page=" + page + "&pageSize=" + pageSize,
        type: "get",
        dataType: "json",
        async: false,
        contentType: "application/json",
        success: function (data) {
            //console.log('某个分类的产品信息列表');
            //console.log(data);
            appcan.locStorage.val('catelogList', data);
            if (data == undefined) {
                return false;
            }
            if (data.product != undefined) {
                for (var i = 0; i < data.product.length; i++) {
                    var id = data.product[i].retailPrice.amount != undefined ? "￥" + data.product[i].retailPrice.amount : "";
                    if (data.product[i].retailPrice.amount <= 0) {
                        id = "待定";
                    }
                    var name = data.product[i].name != undefined ? data.product[i].name : "";
                    var description = data.product[i].description != undefined ? data.product[i].description : "";
                    var img = data.product[i].primaryMedia != undefined ? urlIP + data.product[i].primaryMedia.url : "images/zanwu.png";
                    var list = {
                        title: name,
                        describe: description,
                        note: id,
                        icon: img,
                        id: i
                    }
                    listData.push(list);
                    lv.set(listData);
                }
            } else {
                $("#listview").html('空空如也!');
                $("#listview").css({textAlign: 'center', fontSize: '1em', fontWeight: 'bold', padding: '1em'});
            }
            lv.on("click", function (ele, obj, curEle) {
                var $this = obj.id;
                appcan.locStorage.val("productsID", data.product[$this].id);
                appcan.window.open({
                    name: "detail",
                    data: "detail.html"
                });
                appcan.window.evaluatePopoverScript({
                    name: 'detail',
                    popName: 'content',
                    scriptContent: ' detal_fun(locGet("productsID")) '
                });
            })

            appcan.locStorage.remove('firstName');
            appcan.locStorage.remove('lastName');
            appcan.locStorage.val('cateIdsetBounce',appcan.locStorage.val('cateId'));
            appcan.locStorage.remove('cateId');
        },
        error: function (e) {
           // console.log(e);
        }
    })
}
 