window.onload = init;

function getCookie(c_name) {
	if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + "=")
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1
			c_end = document.cookie.indexOf(";", c_start)
			if (c_end == -1)
				c_end = document.cookie.length
			return unescape(document.cookie.substring(c_start, c_end))
		}
	}
	return ""
}

function setCookie(c_name, value, expiredays) {
	var exdate = new Date()
	exdate.setDate(exdate.getDate() + expiredays)
	document.cookie = c_name + "=" + escape(value)
			+ ((expiredays == null) ? "" : "; expires=" + exdate.toGMTString())
}

function checkCookie() {
	var lest_url = getCookie('lest_word_group_id')
	var lest_text = getCookie('lest_word_text')
	// alert(lest_text);
	if (lest_url != null && lest_url != "") {
		document.getElementById("iframepage").src = lest_url;
	} else {
		document.getElementById("iframepage").src = "http://ec.ef.com.cn/community/dailylesson/lesson.aspx?lesson_id=265";
	}

	if (lest_text != null && lest_text != "") {
		document.getElementById("p_last_text").innerHTML = "您上次观看到: "
				+ lest_text;
	} else {
		document.getElementById("p_last_text").innerHTML = "您正在观看: Beginner 1-1";
	}
}

function checkPage() {

	var ua = navigator.userAgent;
	var ipad = ua.match(/(iPad).*OS\s([\d_]+)/), isIphone = ua
			.match(/(iPhone\sOS)\s([\d_]+)/), isAndroid = ua
			.match(/(Android)\s+([\d.]+)/), isMobile = isIphone || isAndroid
			|| ipad;
	if (isMobile) {
		// alert(screen.width);

//		var page = document.getElementById("iframepage");
//		page.width = "730sp";
//		page.height = "1000px";
		// alert("mobile");
	} else {
		// alert("pc");
		// alert(screen.width);
	}

}

function loadXMLDoc() {
	var xmlhttp;

	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else {// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			document.getElementById("juheweb").innerHTML = xmlhttp.responseText;
			navList(12);
			
			var a = document.links;
			for ( var i = 0; i < a.length; i++) {
				a[i].style.color = "black";
				a[i].onclick = change;
			}
			$(".loader").remove();
		}
	}
	xmlhttp.open("GET", "/JavaScript/Demo1", true);
	xmlhttp.send();
}

function init() {
	loadXMLDoc();
	// checkCookie();
	checkPage();
	
}


function change() {
	var a = document.links;
	for ( var i = 0; i < a.length; i++) {
		a[i].style.color = "black";
//		a[i].onclick = change;
	}
	this.style.color = "red";

	// --------------------------------------------
//	var group_id = this.href;
	var text = this.text;
	var group_id = this.attributes.wordgroup_id.value;
	
	
	setCookie('lest_word_group_id', group_id, 365)
	setCookie('lest_word_text', text, 365)
	var ht = document.getElementById("p_last_text");
	//ht.innerHTML = "您正在观看: " + text;
	loadWord(group_id,1);
	
	//window.open("wordPage.html", "group_id="+group_id+"&page="+1);
	window.location.href="wordPage.html?group_id="+group_id+"&page="+1; 
	
	return false;
}

function loadWord(id,page) {
	var url="/JavaScript/Demo2?group_id="+id+"&page_id="+page;
	var xmlhttp;

	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else {// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			
//			alert(xmlhttp.responseText)
			document.getElementById("p_last_word").innerHTML = xmlhttp.responseText;
			
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function loadSwf(str){
	var head_url ="http://ak-media.englishtown.com/etownresources/dictionary_mp3/"+str+".mp3";
	var a = document.getElementById("mp3");
	 a.src = head_url;
	 a.play();
}

function changeButton(){
	
	var test = this.test;
	
}
