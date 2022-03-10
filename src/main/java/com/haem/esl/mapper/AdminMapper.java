package com.haem.esl.mapper;

import com.github.pagehelper.Page;
import com.haem.esl.model.Box;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;

@Mapper
@Repository
public interface   AdminMapper {
    Page<Box> getProductList();

}


