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
public class CateMService {

    @Autowired
    AdminMapper mapper;
    @Resource(name="SessionTemplate")
    private SqlSession sqlSession;
    @Resource(name="transactionManager")
    private DataSourceTransactionManager transactionManager;

    public List<Box> getCateMList(Box box) {
        List<Box> list = this.sqlSession.selectList("AdminMapper.getCateMList", box);
        return list;
    }
    public int deleteCateM(Box box) {
        int result = this.sqlSession.delete("AdminMapper.deleteCateM", box);
        return result;

    }
    public int insertCateM(Box box) {
        int result = this.sqlSession.insert("AdminMapper.insertCateM", box);
        return result;

    }
    public int modifyCateM(Box box) {
        int result = this.sqlSession.insert("AdminMapper.modifyCateM", box);
        return result;

    }
    public Box getCateMView(Box box) {
        Box data = this.sqlSession.selectOne("AdminMapper.getCateMView", box);
        return data;

    }

}
