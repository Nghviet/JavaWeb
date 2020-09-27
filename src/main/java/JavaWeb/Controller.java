package javaweb;

import org.springframework.web.bind.annotation.*;
import org.springframework.context.annotation.Import;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import javaweb.dbschema.*;

import java.util.List;

import java.security.Principal;

@RestController
@Import(Database.class)
public class Controller {

	@GetMapping("/api/login")
	public String login(HttpServletRequest req, HttpServletResponse res) {
		Principal userPrincipal = req.getUserPrincipal();
		HttpSession session = req.getSession(true);
		System.out.println();
		System.out.println(userPrincipal);
		System.out.println(session);
		System.out.println();
		return "Login";
	}

	@GetMapping("/api/posts")
	public List<Post> getPosts(HttpServletRequest request, HttpServletResponse response) {
		System.out.println(request);
		System.out.println(response);
		return null;
	}
}