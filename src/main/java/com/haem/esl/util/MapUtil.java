package com.haem.esl.util;

import com.haem.esl.model.Box;

import java.util.Enumeration;

import javax.servlet.http.HttpServletRequest;
/**
 * <PRE>
 * CommandMapUtils
 * </PRE>
 */
public class MapUtil{
	/**
	 * get Map
	 * @param request
	 * @return Box
	 */
	public static Box getMap(HttpServletRequest request){
		Box command = new Box();
		// 파라메터 네임을 문자열 번호 배열로 저장
		@SuppressWarnings("unchecked")
		Enumeration<String> en = request.getParameterNames();
		//enumeration에 존재 하는 만큼 반복문
		while(en.hasMoreElements()){
			String key  = en.nextElement();
			// request의 파라메터의 키 값을 String 배열에 저장
			String []value = request.getParameterValues(key);
			// 배열이 존재 한다면
			if(value.length > 1){
				command.put2(key,value);
			} else {
				command.put2(key,value[0]);
			}
		}
		return command;
	}
}