function localS(a, v) {
    return appcan.locStorage.setVal(a, v);
}

function locGet(v) {
    return appcan.locStorage.getVal(v);
}
//index页，打开不同的浮动窗口
function openCon(idx) {
            for (var i = 0,l = $("#header")[0].children.length; i < l; i++) {
                if (idx == i) {
                    $("#header")[0].children[i].className = "uh bc-text-head ub bc-head ";
                    if (!conArray[idx]) {
                        appcan.openPopoverByEle("content", "indexCon_" + idx + ".html", 0, titHeight, 0, 'content_' + idx);
                        uexWindow.setPopoverFrame("content_" + idx, 0, titHeight, $("#content").width(), $("#content").height());
                        //更改浮动窗口的位置和大小
                        appcan.frame.resize("content", 0, titHeight, 0, 'content_' + idx);
                        //设置指定的浮动窗口恢复到指定窗口的大小，并设置浮动窗口的位置
                        conArray[idx] = true;
                    } else {
                        appcan.bringPopoverToFront('content_' + idx);
                        //把指定的弹出窗口设置为最上层
                    }
                } else {
                    $("#header")[0].children[i].className = "uhide";
                }
            }
        }