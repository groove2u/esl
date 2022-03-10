package com.haem.esl.controller.cateS;

import com.haem.esl.model.Box;
import com.haem.esl.service.CateSService;
import com.haem.esl.util.MapUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.util.Locale;

@Controller
public class CateSController {
    private Logger logger = LoggerFactory.getLogger(CateSController.class);
    @Autowired
    CateSService cateSService;

    @RequestMapping(value = "/cateSList")
    public String cateSList(Locale locale, Model model, HttpServletRequest request){

        logger.debug("cateSList");
        model.addAttribute("title", "소분류 목록");
        return "cateSList";
    }
    @RequestMapping(value = "/cateSReg")
    public String cateSReg(Locale locale, Model model, HttpServletRequest request){

        Box box = MapUtil.getMap(request);
        model.addAttribute("cateLCode", box.getString("cateLCode"));
        model.addAttribute("cateMCode", box.getString("cateMCode"));
        logger.debug("cateSReg");
        model.addAttribute("title", "소분류 등록");
        return "cateSReg";
    }
    @RequestMapping(value = "/cateSModify")
    public String cateSModify(Locale locale, Model model, HttpServletRequest request){

        logger.debug("cateSModify");
        Box box = MapUtil.getMap(request);
        model.addAttribute("title", "소분류 수정");
        model.addAttribute("cateSCode", box.getString("cateSCode"));
        return "cateSModify";
    }

}
