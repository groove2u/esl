package com.haem.esl.controller.tag;

import com.haem.esl.model.Box;
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
public class TagController {
    @Autowired
    MessageSource messageSource;

    private Logger logger = LoggerFactory.getLogger(TagController.class);

    @RequestMapping(value = "/tagList")
    public String tagList(Locale locale, Model model, HttpServletRequest request){

        logger.debug("tagList");
        model.addAttribute("title", messageSource.getMessage("tag.list", null, locale));
        Box box = MapUtil.getMap(request);

        box.forEach((key, value)->{
            model.addAttribute(key, value);
        });

        return "tagList";
    }
    @RequestMapping(value = "/tagReg")
    public String tagReg(Locale locale, Model model, HttpServletRequest request){

        logger.debug("tagReg");
        Box box = MapUtil.getMap(request);
        model.addAttribute("title", messageSource.getMessage("tag.regist", null, locale));
        model.addAttribute("gatewayCode", box.getString("gatewayCode"));
        return "tagReg";
    }
    @RequestMapping(value = "/tagModify")
    public String tagModify(Locale locale, Model model, HttpServletRequest request){

        logger.debug("tagModify");
        Box box = MapUtil.getMap(request);
        model.addAttribute("title", messageSource.getMessage("tag.modify", null, locale));

        box.forEach((key, value)->{
            model.addAttribute(key, value);
        });
        //model.addAttribute("tagCode", box.getString("tagCode"));
        //model.addAttribute("param1", box.getString("param"));
        return "tagModify";
    }
}
