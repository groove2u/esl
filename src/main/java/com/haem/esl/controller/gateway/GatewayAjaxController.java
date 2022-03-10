package com.haem.esl.controller.gateway;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.haem.esl.model.Box;
import com.haem.esl.service.GatewayService;
import com.haem.esl.util.Constant;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
public class GatewayAjaxController {
    private Logger logger = LoggerFactory.getLogger(GatewayAjaxController.class);
    @Autowired
    GatewayService gatewayService;
    @PostMapping(value = "/getGatewayList")
    public PageInfo getgatewayList(@RequestBody Box param) {

        int page = param.getInt("page");
        int pageSize = param.getInt("pageSize");

        if(page == 0){
            page = 1;
        }
        if(pageSize == 0){
            pageSize = 1000;
        }
        PageHelper.startPage(page, pageSize);



        List<Box> list = null;
        Box returnBox = new Box();
        //LOGGER.debug("데이터 : {}",box);
        try {
            list = gatewayService.getGatewayList(param);
            returnBox.put("list", list);
            returnBox.put("status", Constant.STATUS_OK);
        } catch (Exception e) {
            logger.error("error",e);
            returnBox.put("status", Constant.STATUS_FAIL);
        }
        return PageInfo.of(list);
    }
    @PostMapping(value = "/deleteGateway")
    public Box deletegateway(@RequestBody Box param) {
        List<Box> list = null;
        Box returnBox = new Box();
        //LOGGER.debug("데이터 : {}",box);
        try {

            List<String> delList = Arrays.asList(param.getString("arrId").split(","));

            for(String code:delList) {
                logger.debug("delete Product Code="+code);
                Box deleteParam = new Box();
                deleteParam.put("code",code);
                gatewayService.deleteGateway(deleteParam);


            }
            returnBox.put("status", Constant.STATUS_OK);
        } catch (Exception e) {
            logger.error("error",e);
            returnBox.put("status", Constant.STATUS_FAIL);
        }
        return returnBox;
    }
    @PostMapping(value = "/insertGateway")
    public Box insertgateway(@RequestBody Box param) {
        Box data = null;
        Box returnBox = new Box();
        //LOGGER.debug("데이터 : {}",box);
        try {

            gatewayService.insertGateway(param);
            returnBox.put("data", data);
            returnBox.put("status", Constant.STATUS_OK);
        } catch (Exception e) {
            logger.error("error",e);
            returnBox.put("status", Constant.STATUS_FAIL);

        }
        return returnBox;
    }
    @PostMapping(value = "/modifyGateway")
    public Box modifygateway(@RequestBody Box param) {
        Box data = null;
        Box returnBox = new Box();
        //LOGGER.debug("데이터 : {}",box);
        try {

            gatewayService.modifyGateway(param);
            returnBox.put("data", data);
            returnBox.put("status", Constant.STATUS_OK);
        } catch (Exception e) {
            logger.error("error",e);
            returnBox.put("status", Constant.STATUS_FAIL);

        }
        return returnBox;
    }
    @PostMapping(value = "/getGatewayView")
    public Box getgatewayView(@RequestBody Box param) {
        Box data = null;
        Box returnBox = new Box();
        //LOGGER.debug("데이터 : {}",box);
        try {

            data = gatewayService.getGatewayView(param);
            returnBox.put("data", data);
            returnBox.put("status", Constant.STATUS_OK);
        } catch (Exception e) {
            logger.error("error",e);
            returnBox.put("status", Constant.STATUS_FAIL);

        }
        return returnBox;
    }


}
