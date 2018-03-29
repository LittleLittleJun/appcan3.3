if(appcan.locStorage.val('orderList')!=null){
    var data = eval("(" + appcan.locStorage.val('orderList') + ")");
    for (var i = 0; i < data.length; i++) {
        var html = '  <div class="uinn-a1 ub ub-ver">' + '<div class="ub ub-ver uba bc-border c-wh umar-at1">' + '    <div class="ub ub-ac ub-pc uinn-a11 ubb bc-border">' + '      <div class="uw-order1 uinn-order1 sc-bg-active uc-a1 tx-c ulev-4 sc-text">' + data[i].id + '  </div>' + '</div>' + '<div class="uinn-a7 ub ub-ver">';
        for (var j = 0; j < data[i].orderItem.length; j++) {
            for (var s = 0; s < data[i].orderItem[j].orderItemAttribute.length; s++) {
                getMedia(data[i].orderItem[j].skuId);
                var imgUrl = appcan.locStorage.val("mediaImg") != null ? urlIP+appcan.locStorage.val("mediaImg") : "indexCon_3/css/myImg/zanwu.png";
                html += '<div class="uinn-a1 b-gra-d6 ub ub-ac eachOrder" data-index=' + data[i].orderItem[j].productId + '>' + '<img class="uh-app1 uw-app2 mar-ar1 ub-img" src=' + imgUrl + '>' + ' <div class=" ub-f1 ulev-1 mar-ar1 ub-ver">' + ' <div class="ub ub-f1">' + data[i].orderItem[j].orderItemAttribute[s].name + ' </div>' + '  <div class="ub ub-f1 uinn">' + data[i].orderItem[j].orderItemAttribute[s].value + ' </div>' + '</div>' + '<div class="ub ub-ver ub-ac">' + '  <div class="ub-f1 ub-ac sc-text-warn ufm1 ulev-4">' + data[i].orderItem[j].retailPrice.amount + '</div>' + '<div class="ub-f1 ub-ac sc-text ufm1 ulev-2">X' + data[i].orderItem[j].quantity + '</div>' + '</div>' + '</div>';
                appcan.locStorage.remove("mediaImg");
            }
        }
        html += '<div class="ub uinn-a11">' + '  <div class="ub ub-ver ub-f1 umar-r-order2">' + '    <div class="ub">' + '      <div class="ulev-4 sc-text umar-r">' + '        合计' + '  </div>' + '<div class="ub-f1 tx-r sc-text-warn ufm1 ulev-app1">' + data[i].total.amount + '</div>' + '</div>' + '</div>' + '<div class="ub ub-ac ub-pe ulev-1">' + '<div class="btn ub ub-ac bc-text-head ub-pc bc-btn uc-a1 mar-ar1">' + '  查看物流' + '</div>' + '<div class="btn ub ub-ac bc-text-head ub-pc sc-bg-alert uc-a1">' + '   确认收货' + '</div>' + '</div>' + '       </div>' + '     </div>' + '   </div>' + ' </div>'
        $("#allorders").append(html);
     }
    $(".eachOrder").each(function(i) {
        $(".eachOrder").eq(i).bind('click', function() {
            appcan.locStorage.val("productsID", $(this).attr('data-index'));
            appcan.window.open({
                name : "detail",
                data : "detail.html"
            });
        })
    })
}


