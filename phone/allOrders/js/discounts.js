//9.  给某个订单添加促销code
function addDiscount(promoCode, customerId) {
    $.ajax({
        url : urlIP+"/api/v1/cart/offer?promoCode=" + promoCode + "&customerId=" + customerId,
        type : 'post',
        dataType : 'json',
        async : false,
        contentType : 'application/json',
        success : function(data) {
            //console.log("给某个订单添加促销code");
            //console.log(data);
             if(data.total.amount==data.subTotal.amount){
                    alert(data.subTotal.amount);
                }else{
                    $("#AllPrice").html('￥' + data.subTotal.amount);
                    $(".zhekoujia").html("折扣价：");
                    $("#AllPrice2").html('￥'+data.total.amount);     
                       }
            appcan.locStorage.val("discount",data);
            $("#AllPrice").css({
                textDecoration : 'line-through'
            });          
             $(".coded").css({
                color : "red"
            });
            $(".coded").attr("disabled",'disabled')
        },
        error : function(data) {
            //console.log('促销失败');
            $(".zhekoujia").html('已经是折扣价 或者 折扣码无效');
            $(".zhekoujia").css({color:'red'})
            $("#AllPrice2").html('');
            $("#AllPrice").css({
                textDecoration : 'none'
            });
        }
    })
}

//10. 删除某个订单某个促销code
function deletDiscount(promoCode, customerId) {
    $.ajax({
        url : urlIP+"/api/v1/cart/offer?promoCode=" + promoCode + "&customerId=" + customerId,
        type : 'DELETE',
        dataType : 'json',
        async : false,
        contentType : 'application/json',
        success : function(data) {
            //console.log("删除某个订单某个促销code")
            //console.log(data);
        },
        error : function(data) {
            //console.log(data);
        }
    })
}

//11. 删除某个订单所有促销code
function deletAllDiscount(customerId) {
    $.ajax({
        url : urlIP+'/api/v1/cart/offers?customerId=' + customerId,
        type : 'DELETE',
        dataType : 'json',
        async : false,
        contentType : 'application/json',
        success : function(data) {
            //console.log("删除某个订单所有促销code");
            //console.log(data);
        },
        error : function(data) {
            //console.log(data);
        }
    })
}

