package yte.intern.eys.usecases.common;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;


@Controller
public class NotificationController {
    @MessageMapping("/notification")
    @SendTo("/topic/newNotification")
    public String newApplication(String notificationContent) throws Exception {
        System.out.println("I recived a message");
        return notificationContent;
    }
}
