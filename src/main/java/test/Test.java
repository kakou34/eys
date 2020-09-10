package test;

import gui.ava.html.image.generator.HtmlImageGenerator;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;


public class Test {
    public static void main(String[] args) throws IOException {
        File input = new File("input.html");
        Document doc = Jsoup.parse(input, "UTF-8", "");
        Element usernameEl = doc.select("#username").first();
        usernameEl.text("Kaouther Mouheb");
        Element eventnameEl = doc.select("#eventname").first();
        eventnameEl.text("Event falan filan");
        String html = doc.html();

        //HTML String ready, Convert it to image
        HtmlImageGenerator hig = new HtmlImageGenerator();
        hig.loadHtml(html);

        BufferedImage originalImage = hig.getBufferedImage();

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write( originalImage, "png", baos );
        baos.flush();
        byte[] bytes = baos.toByteArray();
        System.out.println(bytes.length);

//        BufferedWriter htmlWriter =
//                new BufferedWriter(new OutputStreamWriter(new FileOutputStream("output.html"), "UTF-8"));
//        htmlWriter.write(html);
//        htmlWriter.close();
    }
}
