// QQ表情插件
(function($){  
	$.fn.qqFace = function(options){
		var defaults = {
			id : 'facebox',
			path : 'face/',
			assign : 'content',
			tip : 'em_'
		};
		var option = $.extend(defaults, options);
		var assign = $('#'+option.assign);
		var id = option.id;
		var path = option.path;
		var tip = option.tip;

		if(assign.length<=0){
			alert('缺少表情赋值对象。');
			return false;
		}
		$(this).click(function(e){
			var strFace,strFaceTable, labFace,strFaceWidth;
			if($('#'+id).length<=0){
				strFace ='<div id="'+id+'"  class="qqFace"></div>';
				$(this).parent().append(strFace);
                strFaceWidth = $('#'+id).width();
                strFaceTable = '<table border="0" cellspacing="0" cellpadding="0" style="margin-left: 12px"><tr>';
                for(var i=1; i<=75; i++){
					labFace = '['+tip+i+']';
                    strFaceTable += '<td style="padding: 0 4px"><img src="'+path+i+'.gif" onclick="' +
						'$(\'#'+option.assign+'\').insertAtCaret(\'' + labFace + '\');" /></td>';
					if( i % (Math.floor(strFaceWidth/33)) == 0 ) strFaceTable += '</tr><tr>';
                }
                strFaceTable += '</table>';
			}
            $('#'+id).append(strFaceTable);
			// $(this).parent().append(strFace);
			$('#'+id).show();
			e.stopPropagation();
			e.preventDefault();
		});

		$(document).click(function(){
			$('#'+id).hide();
			$('#'+id).remove();
		});
	};

})(jQuery);

jQuery.extend({ 
unselectContents: function(){ 
	if(window.getSelection) 
		window.getSelection().removeAllRanges(); 
	else if(document.selection) 
		document.selection.empty(); 
	} 
});

jQuery.fn.extend({ 
	selectContents: function(){ 
		$(this).each(function(i){ 
			var node = this; 
			var selection, range, doc, win; 
			if ((doc = node.ownerDocument) && (win = doc.defaultView) && typeof win.getSelection != 'undefined' && typeof doc.createRange != 'undefined' && (selection = window.getSelection()) && typeof selection.removeAllRanges != 'undefined'){ 
				range = doc.createRange(); 
				range.selectNode(node); 
				if(i == 0){ 
					selection.removeAllRanges(); 
				} 
				selection.addRange(range); 
			} else if (document.body && typeof document.body.createTextRange != 'undefined' && (range = document.body.createTextRange())){ 
				range.moveToElementText(node); 
				range.select(); 
			} 
		}); 
	},
	setCaret: function(){ 
		if(!$.browser.msie) return;
		var initSetCaret = function(){
			var textObj = $(this).get(0);
			textObj.caretPos = document.selection.createRange().duplicate();
		};
		$(this).click(initSetCaret).select(initSetCaret).keyup(initSetCaret); 
	},
	insertAtCaret: function(textFeildValue){
        _insertimg(replace_em(textFeildValue))
        // var textObj = $(this).get(0);
        // if(document.all && textObj.createTextRange && textObj.caretPos){
			// var caretPos=textObj.caretPos;
			// caretPos.text = caretPos.text.charAt(caretPos.text.length-1) == '' ?
        //         textFeildValue+'' : textFeildValue;
        // } else if(textObj.setSelectionRange){
			// var rangeStart=textObj.selectionStart;
			// var rangeEnd=textObj.selectionEnd;
			// var tempStr1=textObj.innerText.substring(0,rangeStart);
			// var tempStr2=textObj.innerText.substring(rangeEnd);
			// textObj.innerHtml=tempStr1+textFeildValue+tempStr2;
			// textObj.focus();
        //     var len=textFeildValue.length;
        //     textObj.setSelectionRange(rangeStart+len,rangeStart+len);
        //     textObj.blur();
        // }else if(window.getSelection){
        //     // $(textObj).html($(textObj).html()+replace_em(textFeildValue));
        //     console.log(replace_em(textFeildValue))
        //
        //     // el=document.getElementById('msgIpt');
        //     // el.focus();
        //     // if($.support.msie){
        //     //     var range = document.selection.createRange();
        //     //     this.last = range;
        //     //     range.moveToElementText(el);
        //     //     range.select();
        //     //     document.selection.empty(); //取消选中
        //     // } else {
        //     //     var range = document.createRange();
        //     //     range.selectNodeContents(el);
        //     //     range.collapse(false);
        //     //     var sel = window.getSelection();
        //     //     sel.removeAllRanges();
        //     //     sel.addRange(range);
        //     // }
        // } else{
        //     textObj.value+=textFeildValue;
        // }
	}
});
