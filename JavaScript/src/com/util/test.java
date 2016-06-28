package com.util;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.parser.Parser;
import org.jsoup.parser.XmlTreeBuilder;
import org.jsoup.select.Elements;



public class test {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		String word = "document";
		String url = "http://www.dictionaryapi.com/api/v1/references/collegiate/xml/"+word+"?key=7755bf95-dd22-436b-89a7-1be9f384f09f";
		
		
//		String str = "<?xml version=\"1.0\" encoding=\"utf-8\" ?><entry_list version=\"1.0\">	<entry id=\"hello\">" +
//				"<ew>hello</ew><hw>hel*lo</hw><sound><wav>hello001.wav</wav><wpr>hu-!lO</wpr></sound><pr>hə-ˈlō, he-</pr>" +
//				"<fl>noun</fl><in><il>plural</il> <if>hellos</if></in><et>alteration of <it>hollo</it></et><def><date>1877</date>" +
//				"<dt>:an expression or gesture of greeting <un>used interjectionally in greeting, in answering the telephone, or to express surprise</un>" +
//				"</dt></def></entry>	<entry id=\"hullo\"><ew>hullo</ew><hw>hul*lo</hw><sound><wav>hullo001.wav</wav><wpr>(+)hu-!lO</wpr></sound><pr>(ˌ)hə-ˈlō</pr><cx>" +
//				"<cl>chiefly British variant of</cl> <ct>hello</ct></cx></entry></entry_list>";
		try {
		
		String str = HttpUtil.sendGet(url);
		
		Document  doc = Jsoup.parse(str,"",new Parser(new XmlTreeBuilder()));
		
		Element ele = doc.getElementById(word);
		if (ele== null) {
			ele = doc.getElementById(word+"[1]");
		}
		Elements a = ele.getElementsByTag("hw");
		Elements b = ele.getElementsByTag("pr");
		Element c = b.first();
//		     Document doc = DocumentHelper.parseText(str);
		
//		     Element rootElm = doc.getRootElement();
//		     Element ec = rootElm.element("entry");
//		     List rootList = rootElm.selectNodes("entry"); 
		
//		     System.out.println(ec.getTextTrim()); //print "test1"
		
		System.err.println(a.html());
		System.err.println(c.html());
		} catch (Exception e) {
		    e.printStackTrace();
		}
		
	}

}
