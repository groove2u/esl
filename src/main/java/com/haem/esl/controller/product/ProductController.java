package com.haem.esl.controller.product;

import com.haem.esl.model.Box;
import com.haem.esl.service.ProductService;
import com.haem.esl.util.MapUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import java.util.Locale;

@Controller
public class ProductController {
    private Logger logger = LoggerFactory.getLogger(ProductController.class);
    @Autowired
    ProductService productService;

    @RequestMapping(value = "/productList")
    public String productList(Locale locale, Model model, HttpServletRequest request){

        logger.debug("productList");
        model.addAttribute("title", "상품정보 목록");
        return "productList";
    }
    @RequestMapping(value = "/productView", method = RequestMethod.POST)
    public String productView(Locale locale, Model model, HttpServletRequest request){
        Box box = MapUtil.getMap(request);

        model.addAttribute("title", "상품정보 상세");
        model.addAttribute("productCode", box.getString("productCode"));
        logger.debug("productView");
        return "productView";
    }
}
