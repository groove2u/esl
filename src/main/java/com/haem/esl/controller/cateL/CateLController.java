package com.haem.esl.controller.cateL;

import com.haem.esl.model.Box;
import com.haem.esl.service.CateLService;
import com.haem.esl.util.MapUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.util.Locale;

@Controller
public class CateLController {
    private Logger logger = LoggerFactory.getLogger(CateLController.class);
    @Autowired
    CateLService cateLService;

    @Autowired
    MessageSource messageSource;

    @RequestMapping(value = "/cateLList")
    public String cateLList(Locale locale, Model model, HttpServletRequest request){

        logger.debug("cateLList");
        model.addAttribute("title", messageSource.getMessage("cateL.list", null, null));
        return "cateLList";
    }
    @RequestMapping(value = "/cateLReg")
    public String cateLReg(Locale locale, Model model, HttpServletRequest request){

        logger.debug("cateLReg");
        model.addAttribute("title", messageSource.getMessage("cateL.reg", null, null));
        return "cateLReg";
    }
    @RequestMapping(value = "/cateLModify")
    public String cateLModify(Locale locale, Model model, HttpServletRequest request){

        logger.debug("cateLModify");
        Box box = MapUtil.getMap(request);
        model.addAttribute("title", messageSource.getMessage("cateL.mod", null, null));
        model.addAttribute("cateLCode", box.getString("cateLCode"));
        return "cateLModify";
    }
}
