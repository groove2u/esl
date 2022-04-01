package com.haem.esl.controller.setting;

import com.haem.esl.model.Box;
import com.haem.esl.service.SettingService;
import com.haem.esl.util.Constant;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SettingAjaxController {
    private Logger logger = LoggerFactory.getLogger(SettingAjaxController.class);

    @Autowired
    SettingService settingService;

    @PostMapping(value = "/getSetting")
    public Box getSetting(@RequestBody Box param) {
        List<Box> data = null;
        Box returnBox = new Box();

        try {
            data = settingService.getSetting();
            returnBox.put("data", data);
            returnBox.put("status", Constant.STATUS_OK);
        } catch (Exception e) {
            logger.error("error",e);
            returnBox.put("status", Constant.STATUS_FAIL);
        }

        return returnBox;
    }

    @PostMapping(value = "/modifySetting")
    public Box modifySetting(@RequestBody Box param) {
        Box returnBox = new Box();

        try {
            int count = settingService.getCountSetting();
            int result = 0;
            if(count == 1) {
                result = settingService.modifySetting(param);
            } else {
                result = settingService.insertSetting(param);
            }
            if(result == 1) {
                returnBox.put("status", Constant.STATUS_OK);
            } else {
                throw new Exception();
            }
        } catch (Exception e) {
            logger.error("error",e);
            returnBox.put("status", Constant.STATUS_FAIL);
        }

        return returnBox;
    }
}
