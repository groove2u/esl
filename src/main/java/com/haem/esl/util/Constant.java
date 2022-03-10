package com.haem.esl.util;

import java.io.FileInputStream;
import java.util.Properties;

public class Constant {
	
	//세션
	public static final String SESSION_MEM = "sess_mem_info";				//사용자 정보
	public static final String SESSION_MEM_ID = "sess_mem_id";				//사용자 관리 아이디
	public static final String SESSION_MEM_NM = "sess_mem_nm";				//사용자명
	public static final String SESSION_LOGIN_ID = "sess_login_id";			//로그인용 아이디
	public static final String SESSION_LOGIN_PW = "sess_login_pw";			//로그인용 패스워드
	
	//쿠키
	public static final String COOKIE_LOGIN_ID = "cookie_login_id";
	public static final String COOKIE_LOGIN_PW = "cookie_login_pw";
	public static final String COOKIE_MEM_NM = "cookie_mem_nm";
	
	
	public static final String STATUS_OK = "0000";
	public static final String STATUS_FAIL = "9999";
	
	
	//예약 정보 확인 API 개발

	
	public static final String DEV_URL = PropertiesUtil.get("globals", "common.api.url");

	
	//public static final String DEV_URL = "http://prd-bwapi.amorepacific.com";
	
	//예약 정보 확인 API 운영
	public static final String REAL_URL = "";
	
	//예약 정보 확인 API 구분 site code
	public static final String SITE_CD = "iopekrkofss";

	//예약 정보 확인 API 구분 site code 온라인	
	public static final String SITE_CD_ONLINE = "iopekrko";
	
	//Skin예약 리스트 조회
	public static final String RESERVATION_LIST    =  DEV_URL   +   "/api/v1/reservation/skin/list";
	//Skin예약 등록
	public static final String RESERVATION_CREATE  =  DEV_URL   +  	"/api/v1/reservation/skin/create";
	//Skin예약 확인
	public static final String RESERVATION_CONFIRM =  DEV_URL   +  	"/api/v1/reservation/skin/confirm";
	//Skin예약 취소
	public static final String RESERVATION_DELETE  =  DEV_URL   +  	"/api/v1/reservation/skin/delete";
	//Skin예약 체크인
	public static final String RESERVATION_CHECKIN =  DEV_URL  	+   "/api/v1/reservation/skin/checkin";

	
	
	
}