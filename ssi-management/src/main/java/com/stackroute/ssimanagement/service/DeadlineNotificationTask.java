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
        return "<!DOCTYPE html>"
                + "<html lang='en'>"
                + "<head>"
                + "<meta charset='UTF-8'>"
                + "<meta name='viewport' content='width=device-width, initial-scale=1.0'>"
                + "<style>"
                + "body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #ecf0f5; color: #333; margin: 0; padding: 0; }"
                + ".container { width: 80%; max-width: 600px; background: #fff; border-radius: 12px; box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12); margin: 5% auto; padding: 20px; border-top: 4px solid #3498db; }"
                + ".header { background: linear-gradient(145deg, #3498db, #9b59b6); color: #ffffff; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; font-size: 24px; }"
                + ".logo { width: 80px; height: auto; display: block; margin: 0 auto 10px; }"
                + "h2 { font-size: 22px; margin: 0; }"
                + "p { font-size: 16px; color: #666; line-height: 1.8; text-align: center; margin: 20px 0; }"
                + ".footer { font-size: 14px; text-align: center; color: #888; padding-top: 15px; border-top: 1px solid #dee2e6; margin-top: 20px; }"
                + "a { color: #3498db; text-decoration: none; font-weight: bold; }"
                + "</style>"
                + "</head>"
                + "<body>"
                + "<div class='container'>"
                + "<div class='header'>"
                + "<h2>SSI ID: " + ssi.getInstructionId() + "</h2>"
                + "</div>"
                + "<p>Approaching Deadline Date: " + approachingDeadline + "</p>"
                + "<p>Final Deadline Date: " + deadlineDate + "</p>"
                + "<div class='footer'>"
                + "Need help? Contact us at <a href='mailto:support@example.com'>support@example.com</a>"
                + "</div>"
                + "</div>"
                + "</body>"
                + "</html>";
    }
}
