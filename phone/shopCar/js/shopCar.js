$("#toPay").bind("click", function() {
    appcan.window.open("order", "order.html");
})
// 5、   某个用户的购物车数据
function shopCarPro(customerId) {
    $.ajax({
        url : urlIP+"/api/v1/cart?customerId=" + customerId,
        type : 'get',
        dataType : 'json',
        async : false,
        contentType : 'application/json',
        success : function(d) {
            //console.log("购物车数据success");
            //console.log(d);
            appcan.locStorage.val('shopCarPro', d);
            var data = appcan.locStorage.val("discount") == null ? eval("(" + appcan.locStorage.val('shopCarPro') + ")") : eval("(" + appcan.locStorage.val("discount") + ")")
            if (data.orderItem != null) {
                $("#disAndPay").css({display:"block !important"});
                $("#totleMoney").css({display:"block !important"});
                $("#AllPrice").html(data.total.amount);
                if (data.total.amount == data.subTotal.amount) {
                    $(".zhekoujia").html("");
                    $("#AllPrice2").html('');
                } else {
                    $("#AllPrice").html('￥' + data.subTotal.amount);
                    $(".zhekoujia").html("折扣价：");
                    $("#AllPrice2").html('￥' + data.total.amount);
                    $("#AllPrice").css({
                        textDecoration : 'line-through'
                    });
                }
                for (var i = 0; i < data.orderItem.length; i++) {
                    getMedia(data.orderItem[i].skuId);
                    var imgUrl = appcan.locStorage.val("mediaImg") != null ? urlIP+appcan.locStorage.val("mediaImg") : "indexCon_3/css/myImg/zanwu.png";
                    var str = ' <div class="uinn-a1 ub ub-ac carProduct">' + '<div class="checkbox umar-r">' + '<input type="checkbox" checked="true" class="uabs ub-con not-btn checkBox">' + '</div>' + '<img class="uh-app1 uw-app2 mar-ar1 ub-img" src="' + imgUrl + '"/>' + '<div class=" ub-f1 ub-ver ulev-1 mar-ar1 clamp4 wid">' + '<div class="ub-f1 uinn-tb toDetail">' + data.orderItem[i].name + '</div>' + '<div class="ub-f1 spec">' + data.orderItem[i].orderItemAttribute[0].value + '</div>' + '</div>' + '<div class="ub-f1 ub-pe ub ub-ac umar-r umar_c" style="width:40%;margin-right:0.5em;" >' + '<div class="ub ub-ver ub-pe">' + ' <div class="ub ub-f1 ulev-4 sc-text-warn tx-r"><div class="ub ub-f1 amount2"></div><div class="ub ub-f1 amount">' + data.orderItem[i].retailPrice.amount + '</div></div>' + '<div class="ulev-4 ub-ae tx-r sc-text">' + ' x<span class="quantity">' + data.orderItem[i].quantity + '</span>' + ' </div>' + '<div class="ub ub-ac ub-pc ub-ae tx-r umar-at1 sc-text">' + '   <div class="uba uc-a-app1 bc-border uinput uwh-pSC1 umar-r-esc c-wh">' + '<input value=' + data.orderItem[i].quantity + ' type="text" class="uinn-pSC3 t-bla tx-c changeNum">' + '  </div>' + '   <div class="uwh-esc umar-r-esc ub-img share"><img class="shareImg" src="indexCon_3/css/myImg/share.png"/></div>' + '  <div class="uwh-esc ub-img del"></div>' + ' </div>' + '</div>' + '</div>' + ' </div>'
                    $("#shopCarlist").append(str);
                    appcan.locStorage.remove("mediaImg");
                }

                $(".carProduct").each(function(i) {
                    //修改数量
                    $(".changeNum").eq(i).change(function() {
                        if (isQuantity($(this).val())) {
                            changeNum(data.orderItem[i].orderItemAttribute[0].orderItemId, customerId, $(this).val());
                            $("#shopCarlist").empty();
                            location.reload();
                        }
                    })
                    //删除产品
                    $(".del").eq(i).bind("click", function() {
                        //打开一个确认框
                        appcan.window.confirm({
                            title : '提示',
                            content : '确定删除？',
                            buttons : ['确定', '取消'],
                            callback : function(err, d, dataType, optId) {
                                if (err) {
                                    return;
                                    //如果出错了
                                }
                                //data 按照按钮的索引返回值
                                if (d == 0) {
                                    deletePro(data.orderItem[i].orderItemAttribute[0].orderItemId, customerId);
                                    location.reload();
                                }
                            }
                        });
                    })
                    //添加收藏
                    $(".share").eq(i).bind("click", function() {
                        //console.log(data.orderItem[i].orderItemAttribute[0].name)
                        //var option = decodeURIComponent("productOption." + $(".toDetail").eq(i).html() + "=" + $(".spec").eq(i).html());
                        var option = decodeURIComponent("productOption." +data.orderItem[i].orderItemAttribute[0].name + "=" + data.orderItem[i].orderItemAttribute[0].value);
                        collect(data.orderItem[i].productId, data.orderItem[i].categoryId, customerId, option);
                        $(".shareImg").eq(i).attr("src", "indexCon_3/css/myImg/share2.png");
                    })
                    //从购物车去产品详情页
                    $(".uinn-tb").eq(i).bind("click", function() {
                        appcan.locStorage.val("productsID", data.orderItem[i].productId);
                        appcan.window.open({
                            name : "detail",
                            data : "detail.html"
                        });
                    })
                })
                //选择购物车的产品
                var amountPrice = 0;
                $(".checkBox").each(function(i) {
                    amountPrice += $(".amount").eq(i).html() * $(".quantity").eq(i).html();
                    $(".checkBox").eq(i).change(function() {
                        if ($(".checkBox").eq(i).prop("checked") == true) {
                            amountPrice += $(".amount").eq(i).html() * $(".quantity").eq(i).html();
                            $("#AllPrice").html(amountPrice);
                        } else {
                            amountPrice -= $(".amount").eq(i).html() * $(".quantity").eq(i).html();
                            $("#AllPrice").html(amountPrice);
                            $("#chkYN").prop("checked", false);
                        }
                    })
                })
                $("#indexCon_3-listview1").find("input[type='checkbox']").change(function() {
                    var YorN = this.checked;
                    $(".checkBox").each(function(i) {
                        $(".checkBox").eq(i).prop("checked", YorN);
                        if (YorN == true) {
                            amountPrice = data.total.amount;
                        } else {
                            amountPrice = 0;
                        }
                        $("#AllPrice").html(amountPrice);
                    })
                });
            } else {
                // alert("购物车没有东西，快去逛逛吧！");
                // appcan.window.open({
                // name : "index",
                // data : "index.html"
                // })
                $("#shopCarlist").html("购物车没东西，快去逛逛吧！");
                $("#disAndPay").css({display:"none !important"});
                $("#totleMoney").css({display:"none !important"});
            }
            return true;
        },
        error : function(data) {
            //console.log('购物车数据error');
            var data = eval("(" + appcan.locStorage.val("datadenglu") + ")");
            if (data != null) {
                var customerId = data.id;
            } else if (appcan.locStorage.getVal("temporaryId") != undefined) {
                var customerId = appcan.locStorage.getVal("temporaryId");
            } else {
                addNewCar();
                var customerId = appcan.locStorage.getVal("temporaryId");
            }
            addNewCar(customerId);
        }
    })
}

//正则表达式判断是否是正整数
function isQuantity(str) {
    var reg = /^[1-9]\d*$/;
    if (reg.test(str)) {
        return true;
    } else {
        alert("请输入一个正整数");
        return false;
    }
}
