package javaweb;

import org.springframework.messaging.support.*;
import org.springframework.messaging.*;
import org.springframework.messaging.simp.stomp.*;
import org.springframework.messaging.simp.*;
import java.util.*;
import javaweb.dbschema.User;

public class UserInterceptor extends ChannelInterceptorAdapter {

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {

        StompHeaderAccessor accessor =
                MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

        System.out.println(accessor.getCommand());


        if (StompCommand.SEND.equals(accessor.getCommand())) {
            Object raw = message
                    .getHeaders()
                    .get(SimpMessageHeaderAccessor.NATIVE_HEADERS);
            System.out.println(raw);
            if (raw instanceof Map) {
                Object name = ((Map) raw).get("Username");
            }
        }

        return message;
    }
}