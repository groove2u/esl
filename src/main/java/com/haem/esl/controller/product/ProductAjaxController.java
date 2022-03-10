package com.haem.esl.controller.product;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.haem.esl.model.Box;
import com.haem.esl.service.ProductService;
import com.haem.esl.util.Constant;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.util.StringUtils;

import java.util.Arrays;
import java.util.List;

@RestController
public class ProductAjaxController {
    private Logger logger = LoggerFactory.getLogger(ProductAjaxController.class);
    @Autowired
    ProductService productService;


    @PostMapping(value = "/getProductTagList")
    public Box getProductTagList(@RequestBody Box param) {
        List<Box> list = null;
        Box returnBox = new Box();
        //LOGGER.debug("데이터 : {}",box);
        try {
            list = productService.getProductTagList(param);
            returnBox.put("list", list);
            returnBox.put("status", Constant.STATUS_OK);
        } catch (Exception e) {
            logger.error("error",e);
            returnBox.put("status", Constant.STATUS_FAIL);
        }
        return returnBox;
    }
    @PostMapping(value = "/productModify")
    public Box productModify(@RequestBody Box param) {
        Box data = null;
        Box returnBox = new Box();
        //LOGGER.debug("데이터 : {}",box);
        try {

            if(StringUtils.isEmpty(param.getString("discount"))){
                param.remove("discount");
            }
            if(StringUtils.isEmpty(param.getString("saleStart"))){
                param.remove("saleStart");
            }
            if(StringUtils.isEmpty(param.getString("saleEnd"))){
                param.remove("saleEnd");
            }
            productService.modifyProduct(param);
            productService.modifyProductMapping(param);


            returnBox.put("data", data);
            returnBox.put("status", Constant.STATUS_OK);
        } catch (Exception e) {
            logger.error("error",e);
            returnBox.put("status", Constant.STATUS_FAIL);

        }
        return returnBox;
    }
    @PostMapping(value = "/deleteProduct")
    public Box deleteProduct(@RequestBody Box param) {
        List<Box> list = null;
        Box returnBox = new Box();
        //LOGGER.debug("데이터 : {}",box);
        try {

            List<String> delList = Arrays.asList(param.getString("arrId").split(","));

            for(String productCode:delList) {
                logger.debug("delete Product Code="+productCode);
                Box deleteParam = new Box();
                deleteParam.put("productCode",productCode);
                productService.deleteProduct(deleteParam);


            }
            returnBox.put("status", Constant.STATUS_OK);
        } catch (Exception e) {
            logger.error("error",e);
            returnBox.put("status", Constant.STATUS_FAIL);
        }
        return returnBox;
    }

    @PostMapping(value = "/getProductList")
    public PageInfo<Box> getProductList(@RequestBody Box param) {
        List<Box> list = null;
        Box returnBox = new Box();
        PageHelper.startPage(param.getInt("page"), param.getInt("pageSize"));


        logger.debug("데이터 : {}",param);
        try {
            list = productService.getProductList(param);
            returnBox.put("list", list);
            returnBox.put("status", Constant.STATUS_OK);
        } catch (Exception e) {
            logger.error("error",e);
            returnBox.put("status", Constant.STATUS_FAIL);

        }
        return PageInfo.of(list);
    }
    @PostMapping(value = "/getProductView")
    public Box getProductView(@RequestBody Box param) {
        Box data = null;
        Box returnBox = new Box();
        //LOGGER.debug("데이터 : {}",box);
        try {
            data = productService.getProductView(param);
            returnBox.put("data", data);
            returnBox.put("status", Constant.STATUS_OK);
        } catch (Exception e) {
            logger.error("error",e);
            returnBox.put("status", Constant.STATUS_FAIL);

        }
        return returnBox;
    }
}
