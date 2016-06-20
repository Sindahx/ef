package com.dto.word;

public class Word {

//	private int Word_id; //": 1401619,
	private String WordText; //": "be into sth",
//	private String WordDisplayText; //": "be into sth",
//	private String POS; //": "",
//	private int Rating; //": 0,
//	private boolean IsPredefined; //": false,
	private String Translation; //": "to be interested in sth in an active way",
	private String AudioPath; //": "Idiom/US/b/be_into_sth",
//	private int ExternalWord_id; //": 177684,
//	private int IsKnown; //": 0,
//	private String Sense_id; //": null,
//	private boolean HasPicture; //": false,
	private int EtownDefinition_id; //": 90660
	
	public String getWordText() {
		return WordText;
	}
	public void setWordText(String wordText) {
		WordText = wordText;
	}
	public String getTranslation() {
		return Translation;
	}
	public void setTranslation(String translation) {
		Translation = translation;
	}
	public String getAudioPath() {
		return AudioPath;
	}
	public void setAudioPath(String audioPath) {
		AudioPath = audioPath;
	}
	public int getEtownDefinition_id() {
		return EtownDefinition_id;
	}
	public void setEtownDefinition_id(int etownDefinitionId) {
		EtownDefinition_id = etownDefinitionId;
	}
	
}
