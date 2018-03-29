//产品中心列表
function prodCentList() {
    $.ajax({
        url : urlIP+"/api/v1/myresource/categoryTree",
        type : 'get',
        dataType : 'json',
        contentType : 'application/json',
        success : function(data) {
            //console.log(data);
            for (var i = 0; i < data.length; i++) {
                var html='<p class="listOne"><span class="listName" data-index='+data[i].id+'>'+data[i].name+'</span></p>';
                if (data[i].category != undefined) {
                    html+='<ul class="listTwo">'
                    for (var j = 0; j < data[i].category.length; j++) {
                        html+='<li class="listLi" data-index='+data[i].category[j].id+'>'+data[i].category[j].name+'</li>'
                    
                          if(data[i].category[j].category!=undefined){
                       html+='<ul class="listThree">';
                       for(var k=0;k<data[i].category[j].category.length;k++){
                           html+='<li class="listLi3" data-index='+data[i].category[j].category[k].id+'>'+data[i].category[j].category[k].name+'</li>'
                       } 
                        html+='</ul>'
                    }
                    
                    
                    }
                    html+='</ul>'
                    
                    
                    // if (data[i].category != undefined){
                        // for (var j = 0; j < data[i].category.length; j++) {
//                       
                        // }
                    // }
                    
                    
                }
                $("#list").append(html);
            }
            $(".listLi").each(function(i){
                $(this).bind('click',function(){
                    appcan.locStorage.val('cateId',$(this).attr("data-index"));
                    // appcan.locStorage.val('firstName',$(".listName").eq(i).html());
                    appcan.locStorage.val('lastName',$(this).html());
                    appcan.window.open({
                        name : "proCentInfo",
                        data : "proCentInfo.html"
                    });
                })
            })
            $(".listName").each(function(i){
                $(this).bind('click',function(){
                    appcan.locStorage.val('cateId',$(this).attr("data-index"));
                    appcan.locStorage.val('firstName',$(this).html());
                    appcan.window.open({
                        name : "proCentInfo",
                        data : "proCentInfo.html"
                    });
                })
            })
            $(".listLi3").each(function(i){
                $(this).bind('click',function(){
                    appcan.locStorage.val('cateId',$(this).attr("data-index"));
                    appcan.locStorage.val('firstName',$(this).html());
                    appcan.window.open({
                        name : "proCentInfo",
                        data : "proCentInfo.html"
                    });
                })
            })
        },
        error : function(data) {
            //console.log(data);
            return;
        }
    })
}

