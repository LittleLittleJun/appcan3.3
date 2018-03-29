function  cusId() {
  var data = eval("(" + appcan.locStorage.val("datadenglu") + ")");
    if (data != null) {
        return data.id;
    } else if (appcan.locStorage.getVal("temporaryId") != undefined) {
        return appcan.locStorage.getVal("temporaryId");
    } else {
        addNewCar();
        return appcan.locStorage.getVal("temporaryId");
    }
}

