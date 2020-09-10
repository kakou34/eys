package yte.intern.eys.usecases.afterevent.service;

import gui.ava.html.image.generator.HtmlImageGenerator;
import lombok.RequiredArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import yte.intern.eys.authentication.entity.User;
import yte.intern.eys.authentication.repository.UserRepository;
import yte.intern.eys.usecases.common.dto.MessageResponse;
import yte.intern.eys.usecases.events.dto.EventDTO;
import yte.intern.eys.usecases.events.entity.Event;
import yte.intern.eys.usecases.events.mapper.EventMapper;
import yte.intern.eys.usecases.events.repository.EventRepository;
import yte.intern.eys.usecases.events.repository.FormSubmissionRepository;

import javax.imageio.ImageIO;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeUtility;
import javax.mail.util.ByteArrayDataSource;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static yte.intern.eys.usecases.common.enums.MessageType.ERROR;
import static yte.intern.eys.usecases.common.enums.MessageType.SUCCESS;

@Service
@RequiredArgsConstructor
public class OldEventsService {

    private final EventRepository eventRepository;
    private final FormSubmissionRepository formSubmissionRepository;
    private final EventMapper eventMapper;
    private final UserRepository userRepository;
    private final JavaMailSender javaMailSender;

    public List<EventDTO> getOldEventsByUser(String username) {
        List<Long> eventIds = formSubmissionRepository.findEventsByAttendee(username);
        List<Event> events = eventRepository.findByIdIn(eventIds);
        return eventMapper.mapToDto(events);
    }

    public byte[] generateCertificate(String username, String eventName) throws IOException {
        return generateCertificateHelper( username, eventName);
    }

    public MessageResponse sendCertificateViaEmail(String eventName, String userName) throws IOException{
        String email = "";
        String name = "";
        Optional<User> userOptional = userRepository.findByUsername(userName);
        if (userOptional.isPresent()) {
            email = userOptional.get().getEmail();
            name= userOptional.get().getFirstname() + " " + userOptional.get().getLastname();
        }
        byte[] certificate = generateCertificateHelper( name , eventName);
        try {
            MimeMessage msg = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(msg, true);
            helper.setTo(email);
            helper.setSubject("Your Participation Certificate from EYS For :" + eventName);
            ByteArrayDataSource dataSource = new ByteArrayDataSource(certificate, "image/png");
            helper.addAttachment(MimeUtility.encodeText(""), dataSource);
            helper.setText("");
            javaMailSender.send(msg);
            return new MessageResponse("E-mail sent successfully", SUCCESS);
        } catch (Exception e) {
            return new MessageResponse("Your e-mail could not be sent!", ERROR);
        }

    }
    private byte[] generateCertificateHelper(String username, String eventName) throws IOException {
        File input = new File("input.html");
        Document doc = Jsoup.parse(input, "UTF-8", "");
        Element usernameEl = doc.select("#username").first();
        usernameEl.text(username);
        Element eventnameEl = doc.select("#eventname").first();
        eventnameEl.text(eventName);
        String html = doc.html();

        //HTML String ready, Convert it to image
        HtmlImageGenerator hig = new HtmlImageGenerator();
        hig.loadHtml(html);
        BufferedImage originalImage = hig.getBufferedImage();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write( originalImage, "png", baos );
        baos.flush();
        return baos.toByteArray();
//        BufferedWriter htmlWriter =
//                new BufferedWriter(new OutputStreamWriter(new FileOutputStream("output.html"), "UTF-8"));
//        htmlWriter.write(html);
//        htmlWriter.close();
    }
}
