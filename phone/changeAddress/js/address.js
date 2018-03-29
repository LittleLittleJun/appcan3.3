//31. 新建地址
function newAddress(fullName, primaryPhone, addressLine1,addressLine2, city, stateProvinceRegion, postalCode, customerid) {
    var newAddressUrl=decodeURIComponent(urlIP+"/api/v1/myresource/address?fullName="+fullName+"&primaryPhone="+primaryPhone+"&addressLine1="+addressLine1+"&addressLine2="+addressLine2+"&city="+city+"&stateProvinceRegion="+stateProvinceRegion+"&postalCode="+postalCode+"&isDefault=true&addressName=001&customerid="+customerid)
    console.log(newAddressUrl);
    $.ajax({
        url : newAddressUrl,
        type : 'post',
        dataType : 'json',
        async : false,
        contentType : 'application/json',
        success : function(data) {
            alert("保存成功");
            appcan.locStorage.val("newAddress", data);
        },
        error : function(data) {
            //console.log(data);
            return 'error';
        }
    })

}

//30. 根据customerId查找地址列表
function addressList(customerid) {
    $.ajax({
        url : urlIP+"/api/v1/myresource/address?customerid=" + customerid,
        type : 'get',
        dataType : 'json',
        async : false,
        contentType : 'application/json',
        success : function(data) {
            //console.log("35656253600")
            //console.log(data)
            appcan.locStorage.val("addressList", data);
            for (var i = 0; i < data.address.length; i++) {
                if (data.address[i].isDefault) {
                    appcan.locStorage.val('morenAddressId', data.address[i]);
                }
            }
        },
        error : function(data) {
            //console.log(data);
            return 'error';
        }
    })
}

//33. 删除地址
function deleAddress(customerAddressId) {
    $.ajax({
        url : urlIP+'/api/v1/myresource/address?customerAddressId=' + customerAddressId,
        type : 'delete',
        dataType : 'json',
        async : false,
        contentType : 'application/json',
        success : function(data) {
            //console.log(data);
        },
        error : function(data) {
            //console.log(data);
            return 'error';
        }
    })
}

//32. 修改地址
function changeAddress(fullName, phone, addressLine1,addressLine2, city, province, addressId, isDefault) {
    var cAddressName=decodeURIComponent(urlIP+'/api/v1/myresource/address?fullName=' + fullName + '&primaryPhone=' + phone + '&addressLine1=' + addressLine1 +'&addressLine2='+addressLine2+ '&city=' + city + '&stateProvinceRegion=' + province + '&postalCode=10000&isDefault=true&addressName=001&customerAddressId=' + addressId);
    $.ajax({
        url : cAddressName,
        type : 'put',
        dataType : 'json',
        async : false,
        contentType : 'application/json',
        success : function(data) {
            alert("修改成功");
            //appcan.window.open("order", "order.html");
            appcan.window.evaluatePopoverScript({
                name : 'order',
                popName : 'content',
                scriptContent : 'useNewAddress() '
            });
        },
        error : function(data) {
            return 'error';
        }
    })
}
      function addressC() {
            $("#addressList").empty();
            var data = eval("(" + appcan.locStorage.val("datadenglu") + ")");
            if (data != null) {
                var customerId = data.id;
            } else if (appcan.locStorage.getVal("temporaryId") != undefined) {
                var customerId = appcan.locStorage.getVal("temporaryId");
            } else {
                addNewCar();
                var customerId = appcan.locStorage.getVal("temporaryId");
            }
            addressList(customerId);
            //填充地址列表/////////////
            //console.log('填充地址列表填充地址列表');
            var datalist = eval("(" + appcan.locStorage.val("addressList") + ")");
            //console.log(datalist);
            if (datalist.address != '') {
                for (var i = 0; i < datalist.address.length; i++) {
                    var list = '<div class="ub c-gra-48 uinn-eo1 ub-ac btn bor chAddress"><div class="ub ub-f1 ub-ver  t-wh"><div class="chooseAddress" data-index='+
                    datalist.address[i].customerAddressId+'><div class="ub uinn"><div class="ulev-app2 ub-f1">' 
                    + ' 收货人：' + datalist.address[i].fullName 
                    + '</div><div class="ulev-app2 ub-pe ufm1">'
                     + datalist.address[i].phonePrimary.phoneNumber + '</div></div><div class="ulev-4 line-hei umar-t">' + '收货地址：'
                      + datalist.address[i].stateProvinceRegion + datalist.address[i].city + datalist.address[i].addressLine1 
                      + '</div></div><div class="ub ub-pc ub=ac"><div class="ub ub-f1 umar-r ub-ac ub-pc editAddress"><img src="css/icons/icon-edit-act.png" />' 
                      + '<div class="ulev2 sc-text umar-l ulev-3">编辑</div></div><div class="ub ub-f1 umar-r ub-ac ub-pc deldress" data-index=' 
                      + datalist.address[i].customerAddressId + '><img src="css/icons/icon-close-act.png" /><div class="ulev2 sc-text umar-l ulev-3">删除</div></div>'
                     
                      + '<div class="ub ub-f1 umar-r ub-ac ub-pc check"><input class="tf" type="radio" style="width:2.5em;height:2.5em;" name="check">' 
                      + '<div class="ulev2 sc-text umar-l ulev-3">默认</div></div>'
                      
                      +'</div></div></div>'
                    $("#addressList").append(list);
                    if(datalist.address[i].isDefault){
                        $(".tf").eq(i).attr("checked",'true');
                        //默认地址
                        appcan.locStorage.val('morenAddressId', datalist.address[i]);
                    }
                }
            } else {
                $("#addressList").html("暂无收货地址，请点击底部添加新的地址");
                $("#addressList").css({
                    padding : "1em"
                })
            }
            //选择地址
            if(appcan.locStorage.val("address")=="chooseaddress"){
                $(".chooseAddress").each(function(i) {
                $(this).bind('click', function() {
                    appcan.locStorage.val('customerAddressId', datalist.address[i].customerAddressId);
                    appcan.locStorage.val('useAdname', datalist.address[i].fullName);
                    appcan.locStorage.val('useAdphone', datalist.address[i].phonePrimary.phoneNumber);
                    appcan.locStorage.val('useAddress', datalist.address[i].city + datalist.address[i].stateProvinceRegion + datalist.address[i].addressLine1)
                    appcan.window.open("order", "order.html");
                    appcan.window.evaluatePopoverScript({
                        name : 'order',
                        popName : 'content',
                        scriptContent : 'chooseAddress() '
                    });
                 })  
              })
            }
            //删除地址
            $(".deldress").each(function(i) {
                $(this).bind("click", function() {
                    deleAddress($(".deldress").eq(i).attr("data-index"));
                    location.reload();
                })
            })
            //编辑地址
            $(".editAddress").each(function(i) {
                $(this).bind("click", function() {
                    appcan.locStorage.val("editAddress", datalist.address[i]);
                    appcan.window.open("mailAddress", "mailAddress.html");
                })
            })
            $(".check").each(function(i){
                $(this).bind("click",function(){             
                    var data = datalist.address[i];
                     appcan.locStorage.val('morenAddressId', datalist.address[i]);
                    changeAddress(data.firstName, data.lastName, data.phonePrimary.phoneNumber, data.addressLine1, data.city, data.stateProvinceRegion, data.postalCode, data.customerAddressId,'true');           
                })
            })
        }
      

