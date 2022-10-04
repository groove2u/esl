package com.haem.esl.controller.cateM;

import com.haem.esl.model.Box;
import com.haem.esl.service.CateMService;
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
public class CateMController {
    private Logger logger = LoggerFactory.getLogger(CateMController.class);
    @Autowired
    CateMService cateMService;
    @Autowired
    MessageSource messageSource;

    @RequestMapping(value = "/cateMList")
    public String cateMList(Locale locale, Model model, HttpServletRequest request){

        logger.debug("cateMList");
        model.addAttribute("title", messageSource.getMessage("cateM.list", null, locale));
        return "cateMList";
    }
    @RequestMapping(value = "/cateMReg")
    public String cateMReg(Locale locale, Model model, HttpServletRequest request){

        Box box = MapUtil.getMap(request);
        model.addAttribute("cateLCode", box.getString("cateLCode"));
        logger.debug("cateMReg");
//        model.addAttribute("title", "중분류 등록");
        model.addAttribute("title", messageSource.getMessage("cateM.reg", null, locale));
        return "cateMReg";
    }
    @RequestMapping(value = "/cateMModify")
    public String cateMModify(Locale locale, Model model, HttpServletRequest request){

        logger.debug("cateMModify");
        Box box = MapUtil.getMap(request);
//        model.addAttribute("title", "중분류 수정");
        model.addAttribute("title", messageSource.getMessage("cateM.mod", null, locale));
        model.addAttribute("cateMCode", box.getString("cateMCode"));
        return "cateMModify";
    }

}
