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
public class CateSService {

    @Autowired
    AdminMapper mapper;
    @Resource(name="SessionTemplate")
    private SqlSession sqlSession;
    @Resource(name="transactionManager")
    private DataSourceTransactionManager transactionManager;

    public List<Box> getcateSList(Box box) {
        List<Box> list = this.sqlSession.selectList("AdminMapper.getcateSList", box);
        return list;
    }
    public int deletecateS(Box box) {
        int result = this.sqlSession.delete("AdminMapper.deletecateS", box);
        return result;

    }
    public int insertcateS(Box box) {
        int result = this.sqlSession.insert("AdminMapper.insertcateS", box);
        return result;

    }
    public int modifycateS(Box box) {
        int result = this.sqlSession.insert("AdminMapper.modifycateS", box);
        return result;

    }
    public Box getcateSView(Box box) {
        Box data = this.sqlSession.selectOne("AdminMapper.getcateSView", box);
        return data;

    }

}
