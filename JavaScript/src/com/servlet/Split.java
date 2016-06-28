package com.servlet;

import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.parser.Parser;
import org.jsoup.parser.XmlTreeBuilder;
import org.jsoup.select.Elements;

import com.dto.word.Sound;
import com.util.HttpUtil;

public class Split extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(req, resp);

	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String word = (String) req.getParameter("word");
		String url = "http://www.dictionaryapi.com/api/v1/references/collegiate/xml/" + word + "?key=7755bf95-dd22-436b-89a7-1be9f384f09f";
		try {
			String str = HttpUtil.sendGet(url);
			Document doc = Jsoup.parse(str, "", new Parser(new XmlTreeBuilder()));

			Elements totle = doc.getElementsByTag("entry");
			
//			Element ele = doc.getElementById(word);
//			if (ele == null) {
//				ele = doc.getElementById(word + "[1]");
//			}
			
			Element ele = totle.first();
			Elements a = ele.getElementsByTag("hw");
			Elements b = ele.getElementsByTag("pr");
			Element c = b.first();

			
			
			// Sound sound = new Sound();
			// sound.setSplit(a.html());
			// sound.setSoundMark(c.html());

			String split = a.html();
			String soundMark = null;
			if (c != null) {
				soundMark = c.html();
			}

			split = split.replace("*", "-");

			StringBuffer sb = new StringBuffer();
			sb.append("<div class=\"split\">");
			sb.append("<span class=\"word_split\">" + split + "</span>");
			sb.append("</br>");
			if (c != null) {
				sb.append("<span class=\"word_sound\">[" + soundMark + "]</span>");
			}
			sb.append("</div>");

			String res = sb.toString();

//			System.err.println(res);
			OutputStream stream = resp.getOutputStream();
			stream.write(res.getBytes("UTF-8"));
			stream.close();

		} catch (Exception e) {
			// TODO: handle exception
		}
	}

}
