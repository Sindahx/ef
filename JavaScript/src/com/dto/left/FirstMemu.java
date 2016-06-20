package com.dto.left;

import java.util.List;

public class FirstMemu {
	
	private int WordGroup_id;
	private int DisplayOrder;
	private String LevelCode;
	private int LevelNo;
	private String LevelName;
	private boolean IsImported;
	private List<SecondMemu> Units;
	
	public int getWordGroup_id() {
		return WordGroup_id;
	}
	public void setWordGroup_id(int wordGroupId) {
		WordGroup_id = wordGroupId;
	}
	public int getDisplayOrder() {
		return DisplayOrder;
	}
	public void setDisplayOrder(int displayOrder) {
		DisplayOrder = displayOrder;
	}
	public String getLevelCode() {
		return LevelCode;
	}
	public void setLevelCode(String levelCode) {
		LevelCode = levelCode;
	}
	public int getLevelNo() {
		return LevelNo;
	}
	public void setLevelNo(int levelNo) {
		LevelNo = levelNo;
	}
	public String getLevelName() {
		return LevelName;
	}
	public void setLevelName(String levelName) {
		LevelName = levelName;
	}
	public boolean isIsImported() {
		return IsImported;
	}
	public void setIsImported(boolean isImported) {
		IsImported = isImported;
	}
	public List<SecondMemu> getUnits() {
		return Units;
	}
	public void setUnits(List<SecondMemu> units) {
		Units = units;
	}
	
	

}
