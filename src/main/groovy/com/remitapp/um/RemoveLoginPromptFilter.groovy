package com.remitapp.um

import org.springframework.web.filter.GenericFilterBean

import javax.servlet.FilterChain
import javax.servlet.ServletException
import javax.servlet.ServletRequest
import javax.servlet.ServletResponse
import javax.servlet.http.HttpServletResponse
import javax.servlet.http.HttpServletResponseWrapper

class RemoveLoginPromptFilter extends GenericFilterBean{

    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
                         FilterChain chain) throws IOException, ServletException{
        HttpServletResponseWrapper wrapper = new HttpServletResponseWrapper((HttpServletResponse)response){
            @Override
            public void addHeader(String name, String value){
                if(!name.equalsIgnoreCase("www-authenticate")){
                    this.setHeader(name,value)
                }
            }
        }
        chain.doFilter(request,wrapper)
    }
}




