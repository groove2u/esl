package com.haem.esl.service;


import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.haem.esl.mapper.AdminMapper;
import com.haem.esl.model.Box;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class AdminService {

    @Autowired
    AdminMapper mapper;
    @Resource(name="SessionTemplate")
    private SqlSession sqlSession;
    @Resource(name="transactionManager")
    private DataSourceTransactionManager transactionManager;


    public Box getAdmin(Box box) {

        return (Box) this.sqlSession.selectOne("AdminMapper.getAdmin", box);
    }
    public List<Box> getCateSList(Box box) {
        List<Box> list = this.sqlSession.selectList("AdminMapper.getCateSList", box);
        return list;
    }
    public int deleteCateS(Box box) {
        int result = this.sqlSession.delete("AdminMapper.deleteCateS", box);
        return result;

    }


}
