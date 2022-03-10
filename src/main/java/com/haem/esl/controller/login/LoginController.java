package com.haem.esl.controller.login;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class LoginController {
    private Logger logger = LoggerFactory.getLogger(LoginController.class);
    @RequestMapping(value = "/")
    public String home(){

        return "redirect:/cateLList";
    }

    @RequestMapping(value = "/login")
    public String login(@RequestParam(value = "error", required = false) String error,
                        @RequestParam(value = "exception", required = false) String exception,
                        Model model){
        model.addAttribute("error",error);
        logger.debug("login view");
        return "login";
    }

}
