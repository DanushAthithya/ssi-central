package com.stackroute.ssimanagement.service;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.stackroute.ssimanagement.model.SSI;
import com.stackroute.ssimanagement.repository.SSIRepository;

@Component
public class DeadlineNotificationTask {
    @Autowired
    private SSIRepository ssiRepository;

    @Autowired
    private SSIServiceImpl ssiService;

    @Scheduled(cron = "0 0 12 * * ?")  // Runs every day at noon
    public void checkAndNotifyApproachingDeadlines() throws Exception {
        // Calculate the approaching date (2 days before the deadline)
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DATE, 2);
        Date approachingDate = calendar.getTime();

        // Current date
        Date currentDate = new Date();

        // Find SSIs with approaching deadlines
        List<SSI> ssis = ssiRepository.findWithApproachingDeadlines(currentDate, approachingDate);
        for (SSI ssi : ssis) {
            String htmlBody = generateHtmlBody(ssi, approachingDate);
            ssiService.sendDeadlineNotification(ssi.getCounterPartyEmail(),ssi.getUserEmailId(), htmlBody);
        }
    }

    private String generateHtmlBody(SSI ssi, Date approachingDate) {
        SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
        String deadlineDate = sdf.format(ssi.getDeadlineDate());
        String approachingDeadline = sdf.format(approachingDate);
        return "<html><body>" +
                "<h2>SSI ID: " + ssi.getInstructionId() + "</h2>" +
                "<p>Approaching Deadline Date: " + approachingDeadline + "</p>" +
                "<p>Final Deadline Date: " + deadlineDate + "</p>" +
                "</body></html>";
    }
}
