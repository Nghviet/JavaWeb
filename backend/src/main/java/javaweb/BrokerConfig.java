package javaweb;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.*;
import org.springframework.messaging.converter.*;
import org.springframework.messaging.simp.config.*;
import org.springframework.messaging.handler.invocation.*;
import java.util.*;

@Configuration
@EnableWebSocketMessageBroker
public class BrokerConfig implements WebSocketMessageBrokerConfigurer {
	static final String MESSAGE_PREFIX = "/message";

	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		registry.addEndpoint("/message").setAllowedOrigins("*").withSockJS();

	}

	@Override
	public void configureMessageBroker(MessageBrokerRegistry registry) {
		registry.enableSimpleBroker(MESSAGE_PREFIX);
		registry.setApplicationDestinationPrefixes("/app");
	}

	@Override
	public void configureClientInboundChannel(ChannelRegistration registration) {
	    registration.setInterceptors(new UserInterceptor());
	}
}