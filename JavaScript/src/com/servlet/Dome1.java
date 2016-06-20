package com.servlet;

import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.dto.left.FirstMemu;
import com.dto.left.MainMemu;
import com.dto.left.SecondMemu;
import com.google.gson.Gson;
import com.util.PropertiesConfig;

public class Dome1 extends HttpServlet {

	private ServletConfig config;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub

//		String leftList = config.getInitParameter("str");
		String leftList = PropertiesConfig.readData("menu");
//		PropertiesConfig.writeData("menu",leftList);
//		String leftList = PropertiesConfig.readData("list");
		// PrintWriter out = resp.getWriter();
		// out.print(leftList.getBytes("UTF-8"));
		// out.close();
		MainMemu memu = new MainMemu();

		Gson gson = new Gson();

		memu = gson.fromJson(leftList, MainMemu.class);

		List<FirstMemu> firstlist = new ArrayList<FirstMemu>();

		firstlist = memu.getJson();

		StringBuilder ab = new StringBuilder();
		
		for (FirstMemu firstMemu : firstlist) {
			ab.append(" <li >");
//			System.err.println(" <li>");
			ab.append("<h4>"+firstMemu.getLevelName()+"</h4>");
//			System.err.println("<h4 >"+firstMemu.getLevelName()+"</h4>");
			ab.append("<div class=\"list-item none\">");
//			System.err.println("<div class=\"list-item none\">");

			List<SecondMemu> secondlist = new ArrayList<SecondMemu>();
			secondlist = firstMemu.getUnits();
			for (SecondMemu secondMemu : secondlist) {
				ab.append("<p><a href=\"javascritp:void(0);\" wordGroup_id=\""+secondMemu.getWordGroup_id()+"\">"+secondMemu.getUnitName()+"</a></p>");
//				System.err.println("<p><a href=\"javascritp:void(0);\" wordGroup_id=\""+secondMemu.getWordGroup_id()+"\">"+secondMemu.getUnitName()+"</a></p>");
			}
			ab.append("</div>");
//			System.err.println("</div>");
			ab.append(" </li >");
//			System.err.println(" </li >");

		}

		OutputStream stream = resp.getOutputStream();
		stream.write(ab.toString().getBytes("UTF-8"));
		stream.close();
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(req, resp);
	}

	@Override
	public void init(ServletConfig config) throws ServletException {
		// TODO Auto-generated method stub
		super.init(config);
		this.config = config;
		// context =this.getServletConfig().getServletContext();
	}

	public static void main(String[] args) {
		Gson gson = new Gson();

		List<Object> list = new ArrayList<Object>();

		list.add("ssss");
		list.add("ssss");
		list.add("ssss");
		list.add("ssss");

		String str = gson.toJson(list);

		MainMemu memu = new MainMemu();
		memu = gson.fromJson(str, MainMemu.class);

		System.err.println(memu);
	}

}
