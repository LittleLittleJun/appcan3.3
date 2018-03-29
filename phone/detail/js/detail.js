function localS(a, v) {
    return appcan.locStorage.setVal(a, v);
}

function locGet(v) {
    return appcan.locStorage.getVal(v);
}

var data = eval("(" + appcan.locStorage.val("datadenglu") + ")");
if (data != null) {
    var customerId = data.id;
}

//18. 获取某个产品的信息
function detal_fun(productID) {
    $("#select").empty();
    $("#select").append("<option value='请选择规格'>请选择规格</option>");
    //获取产品分类的Id
    appcan.ajax({
        url : urlIP+"/api/v1/myresource/product/" + productID,
        type : 'get',
        dataType : 'json',
        contentType : 'application/json',
        success : function(d) {
            //console.log("详情页")
            //console.log(d);
            var categoryId = d.productInfo.defaultCategoryId;
            var id = d.productInfo.id;
            appcan.locStorage.val("oneProId", d.productInfo.id);
            if(d.productInfo.productOption!=undefined){
                appcan.locStorage.val("oneProName", d.productInfo.productOption[0].attributeName);
            }
           
            if (d.productInfo.primaryMedia != undefined) {
                $("#img").attr("src", urlIP+d.productInfo.primaryMedia.url);
                $("#img").css({
                    width : "15em"
                });
            } else {
                $("#img").attr("src", "images/zanwu.png");
                $("#img").css({
                    width : "8em"
                });
            }
            $("#de-namee").html(d.productInfo.name);
            $("#description").html(d.productInfo.longDescription);
            if (d.productInfo.longDescription == undefined) {
                $(".desc").hide();
            }
            $("#manu").html(d.productInfo.manufacturer);
            for (var i = 0; i < d.sku.length; i++) {
                if (d.sku[i].available == true) {
                    var val = d.sku[i].productOptionValue;
                    if(val!=undefined){
                        $("#addToCar").css({display:"block"});
                        $("#select").append("<option value=" + val + ">" + val + "</option>");
                    }else{
                        $("#addToCar").css({display:"none"});
                    }
                }
            }
            $("#select").change(function(ev) {
                for (var i = 0; i < d.sku.length; i++) {
                    if (d.sku[i].productOptionValue == $(this).val()) {
                        if(d.sku[i].retailPrice.amount>0){
                            $("#price").html(d.sku[i].retailPrice.amount);
                        }else{
                            $("#price").html('待定');
                        }
                    }
                }
            })

            appcan.button("#addToCar", "ani-act", function() {
                ///// var categoryId = getCategoryId(d.id);
                //拼接接口中产品名称和规格的参数$("#select").val()
                var indexI=$("#select").get(0).selectedIndex-1;
                var productOption = decodeURIComponent(appcan.locStorage.val("oneProName") + "=" +d.sku[indexI].productOptionValue);
                //console.log(productOption)
                if ($("#select").val() != '0') {
                    ///// var categoryId = appcan.locStorage.getVal("catalog");
                    if (customerId != undefined) {
                        addToCar(id, categoryId, customerId, productOption);
                        //登录后加入购物车
                    } else {
                        //用户未登陆时的临时id,
                        if (appcan.locStorage.getVal("temporaryId") == null) {
                            addNewCar();
                        }
                        //获取临时用户id
                        var temporaryId = appcan.locStorage.getVal("temporaryId");
                        addToCar(appcan.locStorage.val("oneProId"), categoryId, temporaryId, productOption);
                        //不登录直接加入购物车
                    }
                } else {
                    alert("请选择规格");
                }
            });
        },
        error : function(ee) {
            // alert("error");
            //console.log(ee);
        }
    })
}

function toRmb(p) {
    if (p < 0) {
        p = "待定";
    } else {
        p = "￥" + p;
    }
    return p;
}

