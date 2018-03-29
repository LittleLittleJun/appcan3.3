
//38. 提交订单
function subOrder(customerId) {
    $.ajax({
        url : urlIP+'/api/v1/myresource/order?customerId='+customerId,
        type : 'put',
        dataType : 'json',
        async : false,
        contentType : 'application/json',
        success : function(data) {
            //console.log('订单')
            //console.log(data);
            alert('订单提交成功！'+data.subTotal.amount); 
            return true;
        },
        error : function(data) {
            alert("订单失败！")
            //console.log(data);
            return false;
        }
    })
}
//36. 得到订单列表根据customerId
function orderList(customerId) {
    $.ajax({
        url : urlIP+'/api/v1/myresource/order?customerId='+customerId,
        type : 'get',
        dataType : 'json',
        async : false,
        contentType : 'application/json',
        success : function(data) {
            //alert("订单列表");
            appcan.locStorage.val('orderList',data);
            return true;
        },
        error : function(data) {
            //alert("订单列表error")
            //console.log(data);
            return false;
        }
    })
}

//37. 提交物流信息//地址
function subAddress(customerId,customerAddressId) {
    $.ajax({
        url : urlIP+'/api/v1/myresource/fulfillment?customerId='+customerId+'&customerAddressId='+customerAddressId,
        type : 'put',
        dataType : 'json',
        async : false,
        contentType : 'application/json',
        success : function(data) {
           // console.log("地址");
            //console.log(data);
            return true;
        },
        error : function(data) {
            alert("请填写地址");
           // console.log(data);
            return false;
        }
    })
}

