//4、  新建购物车（可用于没有登录时，加入购物车）
function addNewCar(customerId) {
    $.ajax({
        url : urlIP+"/api/v1/cart?customerId="+customerId,
        type : 'post',
        dataType : 'json',
        async : false,
        contentType : 'application/json',
        success : function(data) {
            //console.log("新建购物车");
            appcan.locStorage.setVal("temporaryId", data.customer.id);//用户没有登录时加入购物车产生的临时用户id
            return true;
        },
        error : function(data) {
            return false;
        }
    })
}

// 6、加入购物车
function addToCar(productId, categoryId, customerId, productOption) {
    var urlAddToCar=decodeURIComponent(urlIP+"/api/v1/cart/" + productId + "?categoryId=" + categoryId + "&customerId=" + customerId + "&" + productOption)
    $.ajax({
        url : urlAddToCar,
        type : 'post',
        dataType : 'json',
        async : false,
        contentType : 'application/json',
        success : function(data) {
            alert("加入成功")
            return true;
        },
        error : function(data) {
            alert("error addToCar");
            return false;
        }
    })
}

//7.  删除购物车里面的项目（需要手机端测试）
function deletePro(order_item_id,customerId) {
    $.ajax({
        url : urlIP+"/api/v1/cart/items/" + order_item_id + "?customerId="+customerId,
        type : 'DELETE',
        dataType : 'json',
        async : false,
        contentType : 'application/json',
        success : function(data) {
            return true;
        },
        error : function(e) {
            return false;
        }
    })
}

//8.  更新购物车里某个项目的数量
function changeNum(order_item_id, customerId, quantity) {
    $.ajax({
        url : urlIP+'/api/v1/cart/items/' + order_item_id + '?customerId=' + customerId + '&quantity=' + quantity,
        type : 'PUT',
        dataType : 'json',
        async : false,
        contentType : 'application/json',
        success : function(data) {
             return true;
        },
        error : function(e) {
           // alert("changeNum error");
        }
    })
}
//13. 返回fulfillment groups
function fillGroups (customerId) {
  $.ajax({
      url:urlIP+"/api/v1/cart/fulfillment/groups?",
      type:"get",
      dataType:"json",
      data:{
          customerId:customerId,
      },
      contentType:"application/json",
      success:function(data){
          //console.log(data);
      },
      error:function(e){
          
      }
  })
}

//17. 返回某个客户的订单列表
function oneAllOrder(customerId) {
    $.ajax({
        url : urlIP+"/zsbio/api/v1/cart/fulfillment/options?",
        type : 'get',
        dataType : 'json',
        contentType : 'application/json',
        data : {
            customerId : customerId,
            fulfillmentType : 'PHYSICAL_SHIP',
            orderStatus : "SUBMITTED",
        },
        success : function(data) {
            //console.log(data);
            return true;
        },
        error : function(data) {
            //console.log(data);
            return false;
        }
    })
}

//18. 获取某个产品的信息
function getProInfo(productID) {
    $.ajax({
        url : urlIP+"/zsbio/api/v1/catalog/product/" + productID,
        type : 'get',
        dataType : 'json',
        contentType : 'application/json',
        success : function(data) {
            //console.log(data);
            return true;
        },
        error : function(data) {
           // console.log(data);
            return false;
        }
    })
}
//20. 某个分类的产品信息列表
//其他参数：page（默认值1），pageSize（默认值15）catelogList ('1','*')
// function catelogList (categoryId,q,page,pageSize) {
  // $.ajax({
      // url:urlIP+"/api/v1/catalog/search/category/"+categoryId+"?q="+q+"&page="+page+"&pageSize="+pageSize,
      // type:"get",
      // dataType:"json",
      // async : false,
      // contentType:"application/json",
      // success:function (data){
          // console.log('某个分类的产品信息列表');
          // console.log(data);
          // appcan.locStorage.val('catelogList',data);
      // },
      // error:function (e){
          // console.log(e);
      // }
  // })
// }
//21. 得到某个产品下sku列表
//必填参数：productId(1000就是参数)
function oneProSku (productId) {
  $.ajax({
      url:urlIP+'/api/v1/catalog/product/'+productId+'/skus',
      type:'get',
      dataType:'json',
      contentType:'application/json',
      success:function (data){
          //console.log('得到某个产品下sku列表');
         // console.log(data);
      },
      error:function (e){
         // console.log(e);
      }
  })
}
//22. 得到该名字的category信息
//其他参数：limit（默认值20），offset （默认值0）
function getCategoryInfo(name){
    $.ajax({
        url:urlIP+'/api/v1/catalog/categories?name='+name,
        data:'get',
        dataType:'json',
        contentType:'application/json',
        success:function (data){
           // console.log('catalog信息');
           // console.log(data);
        },
        error:function (e){
            //console.log(e);
        }
    })
}
//23. 根据categoryID得到下面的子分类信息
//其他参数：limit（默认值20），offset （默认值0）
function categoryChild(categoryID){
     $.ajax({
        url:urlIP+'/api/v1/catalog/category/'+categoryID+'/activeSubcategories',
        data:'get',
        dataType:'json',
        contentType:'application/json',
        success:function (data){
           // console.log('根据categoryID得到下面的子分类信息');
            //console.log(data);
        },
        error:function (e){
           // console.log(e);
        }
    })
}
// 24. 根据ID或者Name，得到category信息，已经子分类信息和它下面的产品信息
// urlIP+/zsbio/api/v1/catalog/category?searchParameter=3
// type： get
// 必填参数：ductLimit （默认值20），productOffset（默认值1）, subcategoryLimit（默认值20），subcategoryOffset（默认值1）
function CategoryDetail() {
    $.ajax({
        url : urlIP+"/api/v1/catalog/category?searchParameter=3",
        type : 'get',
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
//27. 根据sku ID得到相关的媒体信息
//urlIP/zsbio/api/v1/catalog/sku/5111/media
var urlIP="http://10.7.65.21:8080";
function getMedia (skuId) {
     $.ajax({
        url : urlIP+"/api/v1/catalog/sku/"+skuId+"/media",
        type : 'get',
        dataType : 'json',
        async : false,
        contentType : 'application/json',
        success : function(data) {
            if(data[0]!=null){
                appcan.locStorage.val("mediaImg",data[0].url);
            }
        },
        error : function(data) {
           //console.log(data);
           return error;
        }
    })
}
//28. 根据product ID得到该产品所属分类
function getCategoryId(productID) {
    $.ajax({
        url : urlIP+"/api/v1/catalog/product/" + productID + "/categories",
        type : 'get',
        dataType : 'json',
        async : false,
        contentType : 'application/json',
        success : function(data) {
            //console.log(data);
            appcan.locStorage.setVal("catalog", data.category[0].id);
            //console.log(appcan.locStorage.getVal("catalog"));
            return data.category[0].id;
        },
        error : function(data) {
            //console.log(data);
            return 'error';
        }
    })
}

//29. 返回订单付款信息
function orderInfo(customerId) {
    $.ajax({
        url : urlIP+"/api/v1/cart/checkout/payments?",
        type : 'get',
        dataType : 'json',
        contentType : 'application/json',
        data : {
            customerId : customerId,
        },
        success : function(data) {
            //console.log(data);
            return true;
        },
        error : function(data) {
            //console.log(data);
            return false;
        }
    })
}
//38. 加入收藏夹
function collect (productId,categoryId,customerId,productOption) {
    $.ajax({
        url:urlIP+'/api/v1/myresource/wish/'+productId+'?categoryId='+categoryId+'&customerId='+customerId+'&'+productOption,
        type:'post',
        dataType:'json',
        contentType:'application/json',
        success:function(data){
            appcan.locStorage.val("collectFlag",'true');
            alert("收藏成功");
            return true;
        },
        error:function(e){
            appcan.locStorage.val("collectFlag",'false');
            alert("收藏失败");
            return false;
        }
    })
}

//39. 查看收藏夹
function collectList (customerId) {
   $.ajax({
       url:urlIP+'/api/v1/myresource/wish?customerId='+customerId,
       type:'get',
       dataType:'json',
       contentType:'application/json',
       success:function(data){
           appcan.locStorage.val('collect',data);
       },
       error:function(e){
           //console.log(e);
       }
   })
}

