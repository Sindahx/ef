package com.servlet;

import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.dto.word.WordPage;
import com.google.gson.Gson;
import com.util.HttpUtil;
import com.util.PropertiesConfig;
import com.util.Validator;

public class Dome2 extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub

		String group_id = req.getParameter("group_id");
		String page_id = req.getParameter("page_id");
		
		String url = "http://ec.ef.com.cn/services/school/studytools/notebook/word/LoadWordListV2/?&wordGroup_id="
				+ group_id
				+ "&startPageNo="
				+ page_id
				+ "&endPageNo="
				+ page_id
				+ "&pageSize=15&sortType=1&categoryType=1&languageCode=cs&siteVersion=2-1&member_id=29830035&marketCode=cn&partnerCode=Cool&cultureCode=zh-CN"
				+"&token=8ce2b2a3937d1f2ae49ee9663b47d131|3%2f25%2f2016+1%3a22%3a47+AM"
				+"&sourceMemberType_id=1&jsoncallback=_jsonp_F560D278C893BB7ABC07A8FDD05AA6CF";

		String word = null;
		WordPage page = new WordPage();
		Gson gson = new Gson();
		try {
			
			word = PropertiesConfig.readData(group_id+"_"+page_id);
			if (Validator.isBlank(word)) {
				word = HttpUtil.sendGet(url);
				PropertiesConfig.writeData(group_id+"_"+page_id, word);	
			} 
			
			int start = word.indexOf("(");
			int end = word.lastIndexOf(")");
			word = word.substring(start + 1, end);
			page = gson.fromJson(word, WordPage.class);	//解析json
			word = gson.toJson(page);	//生成json

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		OutputStream stream = resp.getOutputStream();
		stream.write(word.getBytes("UTF-8"));
		stream.close();

	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(req, resp);
	}
}
