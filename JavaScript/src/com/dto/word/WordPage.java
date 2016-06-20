package com.dto.word;

import java.util.List;

public class WordPage {

	private List<Word> Words;
	private int RecordCount;
	private int PageCount;
	
	public List<Word> getWords() {
		return Words;
	}
	public int getRecordCount() {
		return RecordCount;
	}
	public int getPageCount() {
		return PageCount;
	}
	public void setWords(List<Word> words) {
		Words = words;
	}
	public void setRecordCount(int recordCount) {
		RecordCount = recordCount;
	}
	public void setPageCount(int pageCount) {
		PageCount = pageCount;
	}
	
	
	
	
}
