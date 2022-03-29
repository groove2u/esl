package com.haem.esl.controller.setting;

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
public class SettingController {
    private Logger logger = LoggerFactory.getLogger(SettingController.class);


    @Autowired
    MessageSource messageSource;

    @RequestMapping(value = "/setting")
    public String setting(Locale locale, Model model, HttpServletRequest request){

        logger.debug("setting");
        model.addAttribute("title", messageSource.getMessage("setting", null, null));
        return "setting";
    }
}
