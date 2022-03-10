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
public class CateLService {

    @Autowired
    AdminMapper mapper;
    @Resource(name="SessionTemplate")
    private SqlSession sqlSession;
    @Resource(name="transactionManager")
    private DataSourceTransactionManager transactionManager;
    public List<Box> getCateLList(Box box) {
        List<Box> list = this.sqlSession.selectList("AdminMapper.getCateLList", box);
        return list;
    }
    public int deleteCateL(Box box) {
        int result = this.sqlSession.delete("AdminMapper.deleteCateL", box);
        return result;

    }
    public int modifyCateL(Box box) {
        int result = this.sqlSession.insert("AdminMapper.modifyCateL", box);
        return result;

    }

    public int insertCateL(Box box) {
        int result = this.sqlSession.insert("AdminMapper.insertCateL", box);
        return result;

    }
    public Box getCateLView(Box box) {
        Box data = this.sqlSession.selectOne("AdminMapper.getCateLView", box);
        return data;

    }


}
