package yte.intern.eys.usecases.events.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import yte.intern.eys.authentication.entity.User;
import yte.intern.eys.authentication.repository.UserRepository;
import yte.intern.eys.usecases.common.ZXingHelper;
import yte.intern.eys.usecases.common.dto.MessageResponse;
import yte.intern.eys.usecases.events.entity.Event;
import yte.intern.eys.usecases.events.entity.FormAnswer;
import yte.intern.eys.usecases.events.entity.FormQuestion;
import yte.intern.eys.usecases.events.entity.FormSubmission;
import yte.intern.eys.usecases.events.repository.EventRepository;
import yte.intern.eys.usecases.events.repository.FormAnswerRepository;
import yte.intern.eys.usecases.events.repository.FormSubmissionRepository;

import javax.activation.DataHandler;
import javax.imageio.ImageIO;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeUtility;
import javax.mail.util.ByteArrayDataSource;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.Optional;

import static yte.intern.eys.usecases.common.enums.MessageType.ERROR;
import static yte.intern.eys.usecases.common.enums.MessageType.SUCCESS;

@Service
@RequiredArgsConstructor
public class ApplicationService {
    private final FormAnswerRepository formAnswerRepository;
    private final FormSubmissionRepository formSubmissionRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final JavaMailSender javaMailSender;


    public MessageResponse addSubmission(String eventName, String username) {
        Optional<Event> eventOptional = eventRepository.findByName(eventName);
        Optional<User> userOptional = userRepository.findByUsername(username);
        if (eventOptional.isPresent()) {
            Event event = eventOptional.get();
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                if (event.getQuota() > event.getFormSubmissions().size()) {
                    FormSubmission formSubmission = new FormSubmission();
                    formSubmission.setEvent(event);
                    formSubmission.setUser(user);
                    formSubmission.setCheckIn(false);
                    formSubmission.setAppDate(LocalDate.now());
                    formSubmissionRepository.save(formSubmission);
                } else
                    return new MessageResponse(String.format("Sorry, the quota is full for this event - %s -", eventName), ERROR);
            } else {
                return new MessageResponse(String.format("User - %s - can't be found!", username), ERROR);
            }
            return new MessageResponse("Your application has been submitted successfully", SUCCESS);
        } else {
            return new MessageResponse(String.format("Event - %s - can't be found!", eventName), ERROR);
        }
    }

    public MessageResponse addAnswer(String eventName, String username, String question, FormAnswer formAnswer) {
        Optional<Event> eventOptional = eventRepository.findByName(eventName);
        Optional<User> userOptional = userRepository.findByUsername(username);
        if (eventOptional.isPresent()) {
            Event event = eventOptional.get();
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                Optional<FormQuestion> formQuestionOptional = event.getQuestion(question);
                if (formQuestionOptional.isPresent()) {
                    FormQuestion formQuestion = formQuestionOptional.get();
                    formAnswer.setFormQuestion(formQuestion);
                    formAnswer.setUser(user);
                    formAnswerRepository.save(formAnswer);
                } else {
                    return new MessageResponse(String.format("Event - %s - does not have the question %s!", eventName, question), ERROR);
                }
            } else {
                return new MessageResponse(String.format("User - %s - can't be found!", username), ERROR);
            }
            return new MessageResponse("The question has been successfully added", SUCCESS);
        } else {
            return new MessageResponse(String.format("Event - %s - can't be found!", eventName), ERROR);
        }
    }

    public byte[] getQrCode(String eventName, String username) {
        Optional<FormSubmission> formSubmissionOptional = formSubmissionRepository.findByUserAndEvent(username, eventName);
        if (formSubmissionOptional.isPresent()) {
            FormSubmission formSubmission = formSubmissionOptional.get();
            String firstname = formSubmission.getUser().getFirstname();
            String lastname = formSubmission.getUser().getLastname();
            String tc = formSubmission.getUser().getTurkishID();
            String event = formSubmission.getEvent().getName();
            String qrContent = String.format("Applicant Name: %s \nApplicant Surname: %s\nApplicant TC: %s\nEvent Name: %s", firstname, lastname, tc, event);
            return ZXingHelper.getQRCodeImage(qrContent, 300, 300);
        } else return null;
    }


    public MessageResponse deleteSubmission(String eventName, String userName) {
        Optional<FormSubmission> formSubmissionOptional = formSubmissionRepository.findByUserAndEvent(userName, eventName);
        if (formSubmissionOptional.isPresent()) {
            formSubmissionRepository.delete(formSubmissionOptional.get());
            return new MessageResponse("Submission deleted successfully", SUCCESS);
        } else return new MessageResponse("Submission not found", ERROR);
    }


    public MessageResponse sendQrCodeViaEmail(String eventName, String userName) {
        String email = "";
        Optional<User> userOptional = userRepository.findByUsername(userName);
        if (userOptional.isPresent()) email = userOptional.get().getEmail();
        byte[] qrCode = getQrCode(eventName, userName);
        try {
            MimeMessage msg = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(msg, true);
            helper.setTo(email);
            helper.setSubject("Your QR Code from EYS For :" + eventName);
            ByteArrayDataSource dataSource = new ByteArrayDataSource(qrCode, "image/jpg");
            helper.addAttachment(MimeUtility.encodeText(""), dataSource);
            helper.setText("");
            javaMailSender.send(msg);
            return new MessageResponse("Email sent successfully", SUCCESS);
        } catch (Exception e) {
            return new MessageResponse(e.getMessage(), ERROR);
        }

    }


}
