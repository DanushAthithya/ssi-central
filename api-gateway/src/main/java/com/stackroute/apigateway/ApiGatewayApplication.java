package com.stackroute.apigateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableDiscoveryClient
public class ApiGatewayApplication {
	public static void main(String[] args) {
		SpringApplication.run(ApiGatewayApplication.class, args);
	}
	@Bean
	public RouteLocator gatewayRoutes(RouteLocatorBuilder builder) {
		
		return builder.routes()
				.route(r->r.path("/authorization/**").uri("lb://AUTHORIZATION"))
				.route(r->r.path("/user-service/**").uri("lb://USER_SERVICE"))
				.route(r->r.path("/product-webapp/**").uri("lb://PRODUCT_WEBAPP"))
				.route(r->r.path("/ssi-management/**").uri("lb://SSI_MANAGEMENT"))
				.build();
	}

}
