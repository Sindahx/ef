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
	var lest_url = getCookie('lest_url')
	var lest_text = getCookie('lest_text')
	//alert(lest_text);
	if (lest_url != null && lest_url != "") {
		document.getElementById("iframepage").src = lest_url;
	}
	else{
		document.getElementById("iframepage").src = "http://ec.ef.com.cn/community/dailylesson/lesson.aspx?lesson_id=265";
	}
	
	if (lest_text != null && lest_text != "") {
		document.getElementById("p_last_text").innerHTML="您上次观看到: " +lest_text;
	}
	else{
		document.getElementById("p_last_text").innerHTML="您正在观看: Beginner 1-1";
	}
}

function checkPage(){
	
	var ua = navigator.userAgent;
	var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
	    isIphone = ua.match(/(iPhone\sOS)\s([\d_]+)/),
	    isAndroid = ua.match(/(Android)\s+([\d.]+)/),
	    isMobile = isIphone || isAndroid || ipad;
	    if(isMobile) {
	    	//alert(screen.width);
	    	//var page= document.getElementById("iframepage");
	    	//page.width="730sp";
	    	//page.height="1000px";
	    	//alert("mobile");
	    	self.location='ef2.html';
	    }else{
	    	//alert("pc");
			//alert(screen.width);
	    }
	
}




function init() {
	checkCookie();	
	checkPage();
	var a = document.links;
	for ( var i = 0; i < a.length; i++) {
		a[i].style.color = "black";
		a[i].onclick = change;
	}
}

function changeColor(){
	
	
}

function change() {
	var a = document.links;
	for ( var i = 0; i < a.length; i++) {
		a[i].style.color = "black";
		a[i].onclick = change;
	}
	this.style.color = "red";
	
	//-------------------------------------------
	
	var url = this.href;
	
	var text = this.text;	
	setCookie('lest_url', url, 365)
	setCookie('lest_text', text, 365)
	var ht = document.getElementById("p_last_text");
	 ht.innerHTML ="您正在观看: " +text;
}

