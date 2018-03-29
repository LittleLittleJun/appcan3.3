  appcan.button("#zhuCe", "ani-act", function() {
            if(isEmail($("#email").val())&&isMima ($("#password").val())&&conpassword ()){ 
                zhuce($("#email").val(),$("#name").val(),$("#password").val(),$("#password2").val());           
                $("form").submit();
            }
        })
        function conpassword () {
          if($("#password").val()==$("#password2").val()){
              return true;
          }else{
              alert("两次密码输入不一致");
              return false;
          }
        }