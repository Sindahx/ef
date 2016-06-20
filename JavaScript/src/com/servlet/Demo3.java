package com.servlet;

import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

public class Demo3 extends HttpServlet{

	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String etownDefinition_id = req.getParameter("EtownDefinition_id");
		String url ="http://ec.ef.com.cn/translator/Translating/TranslateByEtownDefId/?toolbar=notebook&translateCultureCode=cs&src=all&etowndef_id="+etownDefinition_id;
//		String des = null;
		try {
			
//			des = HttpUtil.sendGet(url);
			
			Document doc = Jsoup.connect(url).get();
			Elements content = doc.getElementsByClass("guidewordblock");
			
			String str = content.toString();
			
			OutputStream stream = resp.getOutputStream();
			stream.write(str.getBytes("UTF-8"));
			stream.close();
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(req, resp);
	}
	
}
