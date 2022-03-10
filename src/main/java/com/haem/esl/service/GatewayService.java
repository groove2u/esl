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
public class GatewayService {

    @Autowired
    AdminMapper mapper;
    @Resource(name="SessionTemplate")
    private SqlSession sqlSession;
    @Resource(name="transactionManager")
    private DataSourceTransactionManager transactionManager;
    public List<Box> getGatewayList(Box box) {
        List<Box> list = this.sqlSession.selectList("AdminMapper.getGatewayList", box);
        return list;
    }
    public int deleteGateway(Box box) {
        int result = this.sqlSession.delete("AdminMapper.deleteGateway", box);
        return result;

    }
    public int modifyGateway(Box box) {
        int result = this.sqlSession.insert("AdminMapper.modifyGateway", box);
        return result;

    }

    public int insertGateway(Box box) {
        int result = this.sqlSession.insert("AdminMapper.insertGateway", box);
        return result;

    }
    public Box getGatewayView(Box box) {
        Box data = this.sqlSession.selectOne("AdminMapper.getGatewayView", box);
        return data;

    }


}
