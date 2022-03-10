package com.haem.esl.controller.tag;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.haem.esl.model.Box;
import com.haem.esl.service.TagService;
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
public class TagAjaxController {
    private Logger logger = LoggerFactory.getLogger(TagAjaxController.class);
    @Autowired
    TagService tagService;
    @PostMapping(value = "/getTagList")
    public PageInfo gettagList(@RequestBody Box param) {

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
            list = tagService.getTagList(param);
            returnBox.put("list", list);
            returnBox.put("status", Constant.STATUS_OK);
        } catch (Exception e) {
            logger.error("error",e);
            returnBox.put("status", Constant.STATUS_FAIL);
        }
        return PageInfo.of(list);
    }
    @PostMapping(value = "/deleteTag")
    public Box deletetag(@RequestBody Box param) {
        List<Box> list = null;
        Box returnBox = new Box();
        //LOGGER.debug("데이터 : {}",box);
        try {

            List<String> delList = Arrays.asList(param.getString("arrId").split(","));

            for(String code:delList) {
                logger.debug("delete Product Code="+code);
                Box deleteParam = new Box();
                deleteParam.put("code",code);
                tagService.deleteTagMapping(deleteParam);
                tagService.deleteTag(deleteParam);


            }
            returnBox.put("status", Constant.STATUS_OK);
        } catch (Exception e) {
            logger.error("error",e);
            returnBox.put("status", Constant.STATUS_FAIL);
        }
        return returnBox;
    }
    @PostMapping(value = "/insertTag")
    public Box inserttag(@RequestBody Box param) {
        Box data = null;
        Box returnBox = new Box();
        //LOGGER.debug("데이터 : {}",box);
        try {

            int tagCode = tagService.insertTag(param);

            param.put("tagCode",Integer.toString(tagCode));

            //상품 맵핑 정보 입력
            if(!"0".equals(param.getString("productCode"))){
                tagService.modifyTagMapping(param);
            }
            returnBox.put("data", data);
            returnBox.put("status", Constant.STATUS_OK);
        } catch (Exception e) {
            logger.error("error",e);
            returnBox.put("status", Constant.STATUS_FAIL);

        }
        return returnBox;
    }
    @PostMapping(value = "/modifyTag")
    public Box modifytag(@RequestBody Box param) {
        Box data = null;
        Box returnBox = new Box();
        //LOGGER.debug("데이터 : {}",box);
        try {

            //태그정보 업데이트
            tagService.modifyTag(param);

            //맵핑정보 업데이트
            if(!"0".equals(returnBox.getString("productCode"))){
                tagService.modifyTagMapping(param);
                tagService.modifyProductPair(param);
            }

            returnBox.put("data", data);
            returnBox.put("status", Constant.STATUS_OK);
        } catch (Exception e) {
            logger.error("error",e);
            returnBox.put("status", Constant.STATUS_FAIL);

        }
        return returnBox;
    }
    @PostMapping(value = "/getTagView")
    public Box gettagView(@RequestBody Box param) {
        Box data = null;
        Box returnBox = new Box();
        //LOGGER.debug("데이터 : {}",box);
        try {

            data = tagService.getTagView(param);
            returnBox.put("data", data);
            returnBox.put("status", Constant.STATUS_OK);
        } catch (Exception e) {
            logger.error("error",e);
            returnBox.put("status", Constant.STATUS_FAIL);

        }
        return returnBox;
    }
    @PostMapping(value = "/updateTagMapping")
    public Box updateTagMapping(@RequestBody Box param) {
        Box data = null;
        Box returnBox = new Box();
        //LOGGER.debug("데이터 : {}",box);
        try {

            List<String> list = Arrays.asList(param.getString("arrId").split(","));

            String productCode = param.getString("productCode");

            for(String code:list) {
                logger.debug("mapping tag="+code);
                Box updateParam = new Box();

                updateParam.put("tagCode",code);
                updateParam.put("productCode",productCode);
                tagService.modifyTagMapping(updateParam);
                tagService.modifyProductPair(updateParam);

            }

            returnBox.put("data", data);
            returnBox.put("status", Constant.STATUS_OK);
        } catch (Exception e) {
            logger.error("error",e);
            returnBox.put("status", Constant.STATUS_FAIL);

        }
        return returnBox;
    }
    @PostMapping(value = "/deleteTagMapping")
    public Box deleteTagMapping(@RequestBody Box param) {
        List<Box> list = null;
        Box returnBox = new Box();
        //LOGGER.debug("데이터 : {}",box);
        try {

            List<String> delList = Arrays.asList(param.getString("arrId").split(","));

            for(String code:delList) {
                logger.debug("delete Product Code="+code);
                Box deleteParam = new Box();
                deleteParam.put("code",code);
                tagService.deleteTagMapping(deleteParam);
            }
            returnBox.put("status", Constant.STATUS_OK);
        } catch (Exception e) {
            logger.error("error",e);
            returnBox.put("status", Constant.STATUS_FAIL);
        }
        return returnBox;
    }
    @PostMapping(value = "/getTagCount")
    public Box getTagCount(@RequestBody Box param) {
        Box data = new Box();
        Box returnBox = new Box();
        //LOGGER.debug("데이터 : {}",box);
        try {

            Box all = tagService.getTagAllCount(param);
            Box battery = tagService.getTagBatteryCount(param);
            Box signal = tagService.getTagSignalCount(param);
            Box call = tagService.getTagCallCount(param);

            data.put("countAll",all.getString("CountAll"));
            data.put("countBattery",battery.getString("batteryCount"));
            data.put("countSignal",signal.getString("signalCount"));
            data.put("countCall",call.getString("callCount"));
            returnBox.put("data", data);
            returnBox.put("status", Constant.STATUS_OK);
        } catch (Exception e) {
            logger.error("error",e);
            returnBox.put("status", Constant.STATUS_FAIL);

        }
        return returnBox;
    }
    @PostMapping(value = "/updateCallTag")
    public Box updateCallTag(@RequestBody Box param) {
        Box data = null;
        Box returnBox = new Box();
        //LOGGER.debug("데이터 : {}",box);
        try {

            //태그정보 업데이트
            tagService.updateTagCall(param);


            returnBox.put("data", data);
            returnBox.put("status", Constant.STATUS_OK);
        } catch (Exception e) {
            logger.error("error",e);
            returnBox.put("status", Constant.STATUS_FAIL);

        }
        return returnBox;
    }


}
