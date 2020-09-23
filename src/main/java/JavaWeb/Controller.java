package javaweb;

import org.springframework.web.bind.annotation.*;
import org.springframework.context.annotation.Import;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import javaweb.dbschema.*;

import java.util.List;

@RestController
@Import(Database.class)
public class Controller {

	@GetMapping("/")
	public User getUser() {
		return new User();
	}

	@GetMapping("/api/posts")
	public List<Post> getPosts(HttpServletRequest request, HttpServletResponse response) {
		System.out.println(request);
		System.out.println(response);
		return null;
	}
}