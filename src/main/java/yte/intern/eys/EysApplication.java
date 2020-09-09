package yte.intern.eys;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
@RequiredArgsConstructor
public class EysApplication {

	public static void main(String[] args) {
		SpringApplication.run(EysApplication.class, args);
	}
}
