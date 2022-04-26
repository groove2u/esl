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
public class ProductService {

    @Resource(name="SessionTemplate")
    private SqlSession sqlSession;
    @Resource(name="transactionManager")
    private DataSourceTransactionManager transactionManager;


    public List<Box> getProductList(Box box) {
        List<Box> list = this.sqlSession.selectList("AdminMapper.getProductList", box);
        return list;

    }
    public List<Box> getProductTagList(Box box) {
        List<Box> list = this.sqlSession.selectList("AdminMapper.getProductTagList", box);
        return list;
    }
    public Box getProductView(Box box) {
        Box data = this.sqlSession.selectOne("AdminMapper.getProductView", box);
        return data;

    }
    public Box getProductLocation(Box box) {
        Box data = this.sqlSession.selectOne("AdminMapper.getProductLocation", box);
        return data;

    }

    public int modifyProduct(Box box) {
        int result = this.sqlSession.update("AdminMapper.modifyProduct", box);
        return result;

    }
    public int modifyProductMapping(Box box) {
        int result = this.sqlSession.update("AdminMapper.modifyProductMapping", box);
        return result;

    }
    public int deleteProduct(Box box) {
        int result = this.sqlSession.delete("AdminMapper.deleteProduct", box);
        return result;

    }
}
