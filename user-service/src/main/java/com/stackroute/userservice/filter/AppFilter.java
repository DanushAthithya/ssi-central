package com.stackroute.userservice.filter;

import java.io.IOException;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
@Component
public class AppFilter extends OncePerRequestFilter {

	public AppFilter() {
		// TODO Auto-generated constructor stub
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String jwtToken=null;
		String emailId=null;
        String role=null;
		String headerStr=request.getHeader("Authorization");
		if(headerStr!=null && headerStr.startsWith("Bearer") && headerStr.length()>7  ) {
			String token=headerStr.substring(7);
            Claims claims = Jwts.parser().setSigningKey("BATON-SUCCESS").parseClaimsJws(token).getBody();
			emailId=claims.getSubject();
			
            role = (String) claims.get("role"); // Fetch the role from claims
            
            // Set emailId and role as request attributes
            request.setAttribute("emailId", emailId);
            request.setAttribute("role", role);
            System.out.println(emailId+" "+role);
            if (!"Admin".equals(role)) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED,"Not Admin");
				return;
            }
		}else {
			response.sendError(HttpServletResponse.SC_UNAUTHORIZED,"Invalid Token");
			return;
			
		}
		filterChain.doFilter(request, response);
		
		
		
		// TODO Auto-generated method stub

	}

}
