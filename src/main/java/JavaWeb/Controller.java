package JavaWeb;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class Controller {

	@RequestMapping("/")
	public User index() {
		return new User("Viet","password");
	}

}