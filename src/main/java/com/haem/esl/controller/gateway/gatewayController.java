package com.haem.esl.controller.gateway;

import com.haem.esl.model.Box;
import com.haem.esl.service.GatewayService;
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
public class gatewayController {
    private Logger logger = LoggerFactory.getLogger(gatewayController.class);

    @RequestMapping(value = "/gatewayList")
    public String gatewayList(Locale locale, Model model, HttpServletRequest request){

        logger.debug("gatewayList");
        model.addAttribute("title", "게이트웨이 목록");
        return "gatewayList";
    }
    @RequestMapping(value = "/gatewayReg")
    public String gatewayReg(Locale locale, Model model, HttpServletRequest request){

        logger.debug("gatewayReg");
        model.addAttribute("title", "게이트웨이 등록");
        return "gatewayReg";
    }
    @RequestMapping(value = "/gatewayModify")
    public String gatewayModify(Locale locale, Model model, HttpServletRequest request){

        logger.debug("gatewayModify");
        Box box = MapUtil.getMap(request);
        model.addAttribute("title", "게이트웨이 수정");
        model.addAttribute("gatewayCode", box.getString("gatewayCode"));
        return "gatewayModify";
    }
}
