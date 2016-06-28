window.onload = init;

function init() {

	var group_id = getQueryString("group_id");
	var page = getQueryString("page");
	loadWord(group_id, page);

}

var word_id = 0;
var word_page = 0;
var load_first = 0;
/**
 * 加载word 页面
 * @param id
 * @param page
 * @return
 */
function loadWord(id, page) {

	if (word_page == page) {
		if (id == word_id) {
			return;
		}
	}

	if (word_page != 0 && word_id != 0) {

		$("#div_body").after("<div class=\"loader\"></div>");
	}

	var url = "/JavaScript/Demo2?group_id=" + id + "&page_id=" + page;
	
	if (load_first != 0) {
		 $(".white").css("background"," -webkit-gradient(linear, left top, left bottom, from(#fff),to(#ededed) )");
		 $("#input" + page).css("background"," -webkit-gradient(linear, left top, left bottom, from(#fff),to(#999999) )");
		 word_page = page;
		 word_id = id;
	}
	 
	 $.get(url,function(data,stat){
		 if (stat=="success") {
			 var pageCount = build_page(data);
			 
			 if (id!=word_id) {
				 build_button(pageCount, id);
			 }
			 if (load_first == 0) {
				 $(".white").css("background"," -webkit-gradient(linear, left top, left bottom, from(#fff),to(#ededed) )");
				 $("#input" + page).css("background"," -webkit-gradient(linear, left top, left bottom, from(#fff),to(#999999) )");
				 word_page = page;
				 word_id = id;
			}
			
			 $(".loader").remove();
			
			 load_first ++;
		 }
		}
	 );
	
	
//	var xmlhttp;
//
//	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
//		xmlhttp = new XMLHttpRequest();
//	} else {// code for IE6, IE5
//		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
//	}
//	xmlhttp.onreadystatechange = function() {
//		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//
//			// alert(xmlhttp.responseText)
//			document.getElementById("p_last_word").innerHTML = xmlhttp.responseText;
//			
//			$("#input" + page).css("background"," -webkit-gradient(linear, left top, left bottom, from(#fff),to(#999999) )")
//			$(".loader").remove();
//			word_page = page;
//			word_id = id;
//		}
//	}
//	xmlhttp.open("GET", url, true);
//	xmlhttp.send();
}

var desid = null;

/**
 * 加载单词详情
 * @param obj
 * @return
 */
function loadDes(obj) {
	
	var b = obj.id;

	if (b == desid) {
		$(".word_des").remove();
		desid = null;
		splitid = null;
		return;
	}else{
		$(obj).prepend("<a class=\"load_des\"></a>");
	}

	$(".word_des").remove();

	var url = "/JavaScript/Demo3?EtownDefinition_id=" + b;

	// $.get(url,function(data,status){
	// $("#"+b).parent().after("<tr id=\"word_des\"><td
	// colspan=\"4\">"+data+"</td></tr>");
	// desid = b;
	// }
	// );

	var xmlhttp;

	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else {// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			$(obj).parent().after("<tr class=\"word_des\"><td colspan=\"3\">"+ xmlhttp.responseText + "</td></tr>");
			desid = b;
			splitid = null;
			/*给加载的a标签添加监听事件*/
			$('.audioplaceholder').click(function() {
				playVoice(this);
				return false;
			});

			/*计算屏幕宽度*/
			var div_width = $(".exampleblock").width();
			var li_width = 0;
			if (div_width > 325) {
				li_width = div_width - 52;
			} else {
				li_width = div_width - 67;
			}
			$(".right").css("width", li_width);
			
			$(".load_des").remove();
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

}

var splitid = null;

function loadSplit(obj){
	var id =  $(obj).attr("id");
	
	if (id == splitid) {
		$(".word_des").remove();
		splitid = null;
		desid = null;
		return;
	}else{
		$(obj).prepend("<a class=\"load_des\"></a>");
	}
	
	$(".word_des").remove();

	var url = "/JavaScript/split?word=" + id;
	
	var xmlhttp;

	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else {// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			$(obj).parent().after("<tr class=\"word_des\"><td colspan=\"3\">"+ xmlhttp.responseText + "</td></tr>");
			splitid = id;
			desid = null;
			/*计算屏幕宽度*/
			var div_width = $(".exampleblock").width();
			var li_width = 0;
			if (div_width > 325) {
				li_width = div_width - 52;
			} else {
				li_width = div_width - 67;
			}
			$(".right").css("width", li_width);
			
			$(".load_des").remove();
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
	
}

function loadSwf(obj, str) {
	$(".fp-container").css("background","url(http://cnc2.ef-cdn.com/_imgs/tts/tts_btn_listen2.png) 0 0 no-repeat");
//	var id = "#" + obj.id;
	$("#" + obj.id).css("background","url(http://cnc1.ef-cdn.com/_imgs/tts/tts_btn_listen_loading.gif) 4px 4px no-repeat");
	var head_url = "http://ak-media.englishtown.com/etownresources/dictionary_mp3/" + str + ".mp3";

	playBox(head_url, obj);
	
}

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}

function playVoice(obj) {
	var url = $(obj).attr("data-url");
	playBox(url, obj);
}

/**
 * 音乐播放器
 * @param url
 * @param obj
 * @return
 */
function playBox(url, obj) {
	$("a.audioplaceholder").css("background","url(http://cnc2.ef-cdn.com/_imgs/tts/tts_btn_listen2.png) 0 0 no-repeat");
	$(obj).css("background","url(http://cnc1.ef-cdn.com/_imgs/tts/tts_btn_listen_loading.gif) 4px 4px no-repeat");
	var a = document.getElementById("mp3");

	a.src = url;
	a.play();

	a.onended = function() {
		$(obj).css("background","url(http://cnc2.ef-cdn.com/_imgs/tts/tts_btn_listen2.png) 0 0 no-repeat");
	};

}

/**
 * 创建word_page
 * @param data
 * @return
 */
function build_page(data){
	
	var obj = JSON.parse(data);
	var page_word = "<tr><th colspan=\"2\">词汇</th><th>翻译/定义</th></tr>";
	
	for ( var i = 0; i < obj.Words.length; i++) {
		var w = obj.Words[i];
//		var str = "<tr id=\"tr_"+i+"\" class=\"ui-draggable click_tr\">";
		var str = "<tr>";
		str+= "<td><a id=\"mp3_img"+i+"\" class=\"fp-container\" onclick=\"loadSwf(this,'"+w.AudioPath+"');\"></a></td><td id=\""+w.WordText+"\" onclick=\"loadSplit(this)\">" + w.WordText + "</td><td id =\""+w.EtownDefinition_id+"\"  onclick=\"loadDes(this)\">" + w.Translation + "</td>";
		str+="</tr>";
		if (page_word == null) {
			page_word = str;
		}else{
			page_word += str;
		}
	}
	$("table").html(page_word);
//	$("#nb-right-pan-content-table").html(page_word);
	return obj.PageCount;
	
}

///**
// * 创建word_page
// * @param data
// * @return
// */
//function build_page(data){
//	
//	var obj = JSON.parse(data);
//	var page_word = "<tr><th colspan=\"2\">词汇</th><th>翻译/定义</th><th>词性</th></tr>";
//	
//	for ( var i = 0; i < obj.Words.length; i++) {
//		var w = obj.Words[i];
////		var str = "<tr id=\"tr_"+i+"\" class=\"ui-draggable click_tr\">";
//		var str = "<tr>";
//		str+= "<td><a id=\"mp3_img"+i+"\" class=\"fp-container\" onclick=\"loadSwf(this,'"+w.AudioPath+"');\"></a></td><td><span>" + w.WordText + "</span></td><td id =\""+w.EtownDefinition_id+"\"  onclick=\"loadDes(this)\">" + w.Translation + "</td><td>" + w.POS + "</td>";
//		str+="</tr>";
//		if (page_word == null) {
//			page_word = str;
//		}else{
//			page_word += str;
//		}
//	}
//	$("table").html(page_word);
////	$("#nb-right-pan-content-table").html(page_word);
//	return obj.PageCount;
//	
//}

/**
 * 创建底部的翻页按钮
 * @param pageCount
 * @param id
 * @return
 */
function build_button(pageCount,id){
	var page=null;
	for ( var i = 1; i <= pageCount; i++) {
		var str2 = "<input id=\"input"+i+"\" class=\"button white\" group_id=\""+id+"\" type=\"button\" value=\"" + i + "\" onclick=\"loadWord("+id+","+i+",this);\"/>&nbsp;";
		if (page == null) {
			page = str2;
		}else{
			page = page+ str2;
		}
	}
	$(".buttom").html(page);	
	
	
//	for ( var i = 1; i <= pageCount; i++) {
//		var index = "<li><a href=\"#\" onclick=\"loadWord("+id+","+i+",this);\">"+i+"</a></li>"
//		$(".pagination").append(index);
//		}
}
