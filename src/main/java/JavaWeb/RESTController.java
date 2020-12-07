package javaweb;

import org.springframework.web.bind.annotation.*;
import org.springframework.context.annotation.Import;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import javaweb.dbschema.*;
import javaweb.httpschema.*;
import java.util.List;
import java.util.ArrayList;

import java.security.Principal;

@RestController
@Import(Database.class)
public class RESTController {
	@GetMapping("/api/login")
	public String login(HttpServletRequest req) {
		Principal userPrincipal = req.getUserPrincipal();
		System.out.println("Got one");
		return "Login";
	}

	@GetMapping("/api/posts")
	public List<Post> getPosts(HttpServletRequest request) {
		return Database.INSTANCE.getPost(request.getUserPrincipal().getName());
	}

	@PostMapping("/api/post")
	public boolean makeAPost(HttpServletRequest req, @RequestBody PostForm postForm) {
		boolean result = Database.INSTANCE.makeAPost(req.getUserPrincipal().getName(),postForm.post);
		if(!result) throw new IllegalArgumentException();
		return true;
	}

	@GetMapping("/api/search/friend/{querry}")
	public List<User> searchFriend(HttpServletRequest req,@PathVariable("querry") String querry) {
		querry = querry.replace("+"," ");
		List<User> friend = Database.INSTANCE.searchFriend(req.getUserPrincipal().getName(),querry);
		return friend;
	}

	@GetMapping("/api/search/nonfriend/{querry}")
	public List<User> searchNonfriend(HttpServletRequest req,@PathVariable("querry") String querry) {
		querry = querry.replace("+"," ");
		List<User> friend = Database.INSTANCE.searchNonfriend(req.getUserPrincipal().getName(),querry);
		return friend;
	}

	@PostMapping("/api/sendFriendReq")
	public boolean sendFriendReq(HttpServletRequest req, @RequestBody AcpReq body) {
		return Database.INSTANCE.sendFriendReq(req.getUserPrincipal().getName(),body.to);
	}

	@PostMapping("/api/cancelFriendReq")
	public boolean cancelFriendReq(HttpServletRequest req, @RequestBody AcpReq body) {
		return Database.INSTANCE.removeFriendReq(req.getUserPrincipal().getName(),body.to);
	}

	@PostMapping("/api/refFriendReq")
	public boolean refuseFriendReq(HttpServletRequest req, @RequestBody RefReq body) {
		return Database.INSTANCE.refuseFriendReq(req.getUserPrincipal().getName(),body.from);
	}

	@PostMapping("/api/acceptFriendReq")
	public boolean acpFriendReq(HttpServletRequest req, @RequestBody RefReq body) {
		return Database.INSTANCE.acpFriendReq(req.getUserPrincipal().getName(),body.from);
	}

	@GetMapping("/api/getFriendReqs")
	public List<User> getFriendReqs(HttpServletRequest req) {
		return Database.INSTANCE.getFriendReqs(req.getUserPrincipal().getName());
	}

	@GetMapping("/api/user/{id}")
	public User getUser(HttpServletRequest req, @PathVariable int id) {
		return Database.INSTANCE.getUser(id);
	}

	@GetMapping("/api/userpost/{id}")
	public List<Post> getPost(HttpServletRequest req, @PathVariable int id) {
		return Database.INSTANCE.getPostOfUser(id);
	}

	@PostMapping("/api/signup")
	public String signup(@RequestBody SignupForm signupForm) {
		return Database.INSTANCE.signup(signupForm.name, signupForm.email, signupForm.password);
	}

	@GetMapping("/api/getFriends")
	public List<User> getFriends(HttpServletRequest req) {
		return Database.INSTANCE.getFriends(req.getUserPrincipal().getName());
	}

	@PostMapping("/api/like/{postID}")
	public boolean likePost(HttpServletRequest req, @PathVariable int postID) {
		return Database.INSTANCE.likePost(req.getUserPrincipal().getName(), postID);
	}

	@PostMapping("/api/unlike/{postID}")
	public boolean unlikePost(HttpServletRequest req, @PathVariable int postID) {
		return Database.INSTANCE.unlikePost(req.getUserPrincipal().getName(), postID);
	}

	@PostMapping("/api/comment/{postID}")
	public List<Comment> commentPost(HttpServletRequest req, @PathVariable int postID, @RequestBody CommentForm commentForm) {
		return Database.INSTANCE.postComment(req.getUserPrincipal().getName(), postID, commentForm.data);
	}

	@GetMapping("/api/comment/{postID}")
	public List<Comment> getComment(@PathVariable int postID)
	{
		return Database.INSTANCE.getComment(postID);
	}

	@GetMapping("/api/user")
	public List<User> getUserData(HttpServletRequest req) {
		List<User> user = new ArrayList<>();
		user.add(Database.INSTANCE.getUser(req.getUserPrincipal().getName()));
		return user;
	}

}