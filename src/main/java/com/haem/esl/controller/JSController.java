package com.haem.esl.controller;


import java.util.Enumeration;
import java.util.Locale;
import java.util.ResourceBundle;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.context.ServletContextAware;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.support.RequestContextUtils;

import ch.qos.logback.classic.Logger;

@Controller
public class JSController implements ServletContextAware {
    static final Logger logger = (Logger) LoggerFactory.getLogger("JsController");

    private ServletContext servletContext;
    public void setServletContext(ServletContext servletContext) {
        this.servletContext = servletContext;
    }

    @RequestMapping(value="/resources/assets/js/strings.js")
    public String strings(Locale locale, Model model, HttpServletRequest request) {


        // Use the path to your bundle
        ResourceBundle bundle = ResourceBundle.getBundle("messages");
        logger.debug("country="+locale.getDisplayName());
	    for (Enumeration<String> en = bundle.getKeys(); en.hasMoreElements(); ) {
	    	String key = en.nextElement();
	    	logger.debug("key="+key);

	      }

        model.addAttribute("keys", bundle.getKeys());
        return "test";

        // Call the string.jsp view
//        return new ModelAndView("strings", "keys", bundle.getKeys());
    }
}
