package com.haem.esl.controller.gateway;

import com.haem.esl.model.Box;
import com.haem.esl.service.GatewayService;
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
public class gatewayController {
    @Autowired
    MessageSource messageSource;

    private Logger logger = LoggerFactory.getLogger(gatewayController.class);

    @RequestMapping(value = "/gatewayList")
    public String gatewayList(Locale locale, Model model, HttpServletRequest request){
        logger.debug("gatewayList");
        model.addAttribute("title", messageSource.getMessage("gateway.list", null, locale));
        return "gatewayList";
    }

    @RequestMapping(value = "/gatewayReg")
    public String gatewayReg(Locale locale, Model model, HttpServletRequest request){
        logger.debug("gatewayReg");
        model.addAttribute("title", messageSource.getMessage("gateway.regist", null, locale));
        return "gatewayReg";
    }

    @RequestMapping(value = "/gatewayModify")
    public String gatewayModify(Locale locale, Model model, HttpServletRequest request){
        logger.debug("gatewayModify");
        Box box = MapUtil.getMap(request);
        model.addAttribute("title", messageSource.getMessage("gateway.modify", null, locale));
        model.addAttribute("gatewayCode", box.getString("gatewayCode"));
        return "gatewayModify";
    }
}
