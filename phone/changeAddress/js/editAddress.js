//修改地址，显示要修改地址信息
var data = eval("(" + appcan.locStorage.val("editAddress") + ")");
console.log(data);
$("#fname2").val(data.fullName);
$("#telNum2").val(data.phonePrimary.phoneNumber);
$("#detaildress2").val(data.addressLine1);
$("#city2").val(data.city);
$("#provence2").val(data.stateProvinceRegion);
$("#company2").val(data.addressLine2);
$("#chAddressBtn");

appcan.button("#chAddressBtn", "btn-cat", function() {
    changeAddress($("#fname2").val(), $("#telNum2").val(), $("#detaildress2").val(),$("#company2").val(), $("#city2").val(), $("#provence2").val(),data.customerAddressId,'false');
    // appcan.window.open("chooseAddress", "chooseAddress.html");
    appcan.window.evaluatePopoverScript({
        name : 'chooseAddress',
        popName : 'content',
        scriptContent : ' addressC() '
    });
    appcan.window.evaluatePopoverScript({
        name : 'order',
        popName : 'content',
        scriptContent : ' useNewAddress() '
    });
})

