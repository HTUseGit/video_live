/*
              ┏┓      ┏┓
            ┏┛┻━━━┛┻┓
            ┃       ☃      ┃
            ┃  ┳┛  ┗┳  ┃
            ┃      ┻      ┃
            ┗━┓     ┏-━┛
                ┃     ┗━━┓
                ┃  神兽保佑 ┣┓
                ┃　永无BUG！┏┛
                ┗┓┓┏━-┳┓┏┛
                  ┃┫┫   ┃┫┫
                  ┗┻┛   ┗┻┛
 
 */
function getNowFormatDate() {
    var date = new Date();
    // var seperator1 = "-";
    var seperator2 = ":";
    // var month = date.getMonth() + 1;
    // var strDate = date.getDate();
    // if (month >= 1 && month <= 9) {
    //     month = "0" + month;
    // }
    // if (strDate >= 0 && strDate <= 9) {
    //     strDate = "0" + strDate;
    // }
    var minute = date.getMinutes();
    var seconds = date.getSeconds();
    if (minute >= 1 && minute <= 9) {
        minute = "0" + minute;
    }
    if (seconds >= 0 && seconds <= 9) {
        seconds = "0" + seconds;
    }


    var currentdate =   date.getHours() + seperator2 + minute +seperator2+ seconds;
    return currentdate;
}
//锁定编辑器中鼠标光标位置。
function _insertimg(QQFaceStr){
    $('#msgIpt').focus();
    var selection= window.getSelection ? window.getSelection() : document.selection;
    var range= selection.createRange ? selection.createRange() : selection.getRangeAt(0);
    if (!window.getSelection){
        var selection= window.getSelection ? window.getSelection() : document.selection;
        var range= selection.createRange ? selection.createRange() : selection.getRangeAt(0);
        range.pasteHTML(QQFaceStr);
        range.collapse(false);
        range.select();
    }else{
        range.collapse(false);
        var hasR = range.createContextualFragment(QQFaceStr);
        var hasR_lastChild = hasR.lastChild;
        while (hasR_lastChild && hasR_lastChild.nodeName.toLowerCase() == "br" && hasR_lastChild.previousSibling && hasR_lastChild.previousSibling.nodeName.toLowerCase() == "br") {
            var e = hasR_lastChild;
            hasR_lastChild = hasR_lastChild.previousSibling;
            hasR.removeChild(e)
        }
        range.insertNode(hasR);
        if (hasR_lastChild) {
            range.setEndAfter(hasR_lastChild);
            range.setStartAfter(hasR_lastChild)
        }
        selection.removeAllRanges();
        selection.addRange(range)
    }
}