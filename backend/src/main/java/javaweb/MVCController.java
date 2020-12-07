package javaweb;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
@Controller
public class MVCController {
	@RequestMapping(value = "/")
	public String index() {
		System.out.println("Called");
		return "index.html";
	}
}	