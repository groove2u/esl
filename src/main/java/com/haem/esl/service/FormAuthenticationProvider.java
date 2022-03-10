package com.haem.esl.service;

import com.haem.esl.model.Box;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class FormAuthenticationProvider implements AuthenticationProvider {

    @Autowired
    private AdminService adminService;


    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();
        String password = (String) authentication.getCredentials();
        Box param = new Box();
        param.put("id",username);
        Box data = adminService.getAdmin(param);

        String passwordFromDb = data.getString("pw");

        if (!password.equals(passwordFromDb)) {
            throw new BadCredentialsException("비밀번호가 틀립니다.");
        }

        return new UsernamePasswordAuthenticationToken(data, null, null);
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
    }
}