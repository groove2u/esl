package com.haem.esl.service;


import com.haem.esl.mapper.AdminMapper;
import com.haem.esl.model.Box;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class TagService {

    @Autowired
    AdminMapper mapper;
    @Resource(name="SessionTemplate")
    private SqlSession sqlSession;
    @Resource(name="transactionManager")
    private DataSourceTransactionManager transactionManager;
    public List<Box> getTagList(Box box) {
        List<Box> list = this.sqlSession.selectList("AdminMapper.getTagList", box);
        return list;
    }
    public int deleteTag(Box box) {
        int result = this.sqlSession.delete("AdminMapper.deleteTag", box);
        return result;

    }
    public int deleteTagMapping(Box box) {
        int result = this.sqlSession.delete("AdminMapper.deleteTagMapping", box);
        return result;

    }
    public int modifyTag(Box box) {
        int result = this.sqlSession.insert("AdminMapper.modifyTag", box);
        return result;

    }
    public int modifyTagMapping(Box box) {
        int result = this.sqlSession.insert("AdminMapper.modifyTagMapping", box);
        return result;
    }
    public int modifyProductPair(Box box) {
        int result = this.sqlSession.insert("AdminMapper.modifyProductPair", box);
        return result;
    }

    public int insertTag(Box box) {
        int result = this.sqlSession.insert("AdminMapper.insertTag", box);
        return box.getInt("tagCode");

    }
    public Box getTagView(Box box) {
        Box data = this.sqlSession.selectOne("AdminMapper.getTagView", box);
        return data;

    }
    public Box getTagAllCount(Box box) {
        Box data = this.sqlSession.selectOne("AdminMapper.getTagAllCount", box);
        return data;

    }
    public Box getTagBatteryCount(Box box) {
        Box data = this.sqlSession.selectOne("AdminMapper.getTagBatteryCount", box);
        return data;

    }
    public Box getTagSignalCount(Box box) {
        Box data = this.sqlSession.selectOne("AdminMapper.getTagSignalCount", box);
        return data;

    }
    public Box getTagCallCount(Box box) {
        Box data = this.sqlSession.selectOne("AdminMapper.getTagCallCount", box);
        return data;

    }
    public int updateTagCall(Box box) {
        int result = this.sqlSession.update("AdminMapper.updateTagCall", box);
        return result;

    }


}
