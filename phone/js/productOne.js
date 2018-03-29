function productOne(proID) {
    $.ajax({
        url : urlIP+"/zsbio/api/v1/catalog/product/"+proID,
        type : 'get',
        dataType : 'json',
        contentType : 'application/json',
        success : function(data) {
            //console.log(data)
            alert("productOne");
        },
        error : function(data) {
            //console.log(data)
            alert("产品获取失败");
            return false;
        }
    })
}
//productOne("3441");
