package com.haem.esl.service;


import com.haem.esl.mapper.AdminMapper;
import com.haem.esl.model.Box;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class SettingService {

    @Autowired
    AdminMapper mapper;

    @Resource(name="SessionTemplate")
    private SqlSession sqlSession;

    public int getCountSetting() {
        int result = this.sqlSession.selectOne("SettingMapper.getCountSetting");
        return result;
    }

    public List<Box> getSetting() {
        List<Box> list = this.sqlSession.selectList("SettingMapper.getSetting");
        return list;
    }

    public int insertSetting(Box box) {
        int result = this.sqlSession.insert("SettingMapper.insertSetting", box);
        return result;
    }

    public int modifySetting(Box box) {
        int result = this.sqlSession.update("SettingMapper.modifySetting", box);
        return result;
    }

}
