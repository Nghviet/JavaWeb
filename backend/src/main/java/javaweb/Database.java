package javaweb;
import java.sql.*;

import java.util.List;
import java.util.ArrayList;

import javaweb.dbschema.*;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.MessageDigest;
import java.util.Arrays;
import java.util.Base64;

public class Database {

	private Connection conn = null;

	private Database() {
		try {
			Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection("jdbc:mysql://pekq8n50z7dr91mc:va03libed2naxc3j@ixnzh1cxch6rtdrx.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/f6p5q26rq25b3qiw", 
            	"pekq8n50z7dr91mc", "va03libed2naxc3j");
		}
		catch(Exception ex) {
			ex.printStackTrace();
		}
	}

	private class AES {
		private byte[] key;
		private  SecretKeySpec secretKey;
 		private AES() {
			MessageDigest sha = null;
			try {
				key = "int3139-12".getBytes("UTF-8");
				sha = MessageDigest.getInstance("SHA-1");
				key = sha.digest(key);
				key = Arrays.copyOf(key,16);
				secretKey = new SecretKeySpec(key,"AES");
			}
			catch(Exception ex) {
				ex.printStackTrace();
			}
		}

		public String encrypt(String input) {
			try {
				Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
            	cipher.init(Cipher.ENCRYPT_MODE, secretKey);
            	return Base64.getEncoder().encodeToString(cipher.doFinal(input.getBytes("UTF-8"))).replace("/","-");
			}
			catch(Exception ex) {
				ex.printStackTrace();
			}
			return null;
		}

		public String decrypt(String input) {
			try {
	            Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5PADDING");
	            cipher.init(Cipher.DECRYPT_MODE, secretKey);
	            return new String(cipher.doFinal(Base64.getDecoder().decode(input.replace("-","/"))));
	        } 
	        catch (Exception ex) 
	        {
	            ex.printStackTrace();
	        }
	        return null;
		}
	}

	private AES aes = new AES();

	protected static final int COMPLETE = 0;
	protected static final int USER_NOT_FOUND = -1;
	protected static final int WRONG_PASSWORD = -2;
	protected int login(String email, String password) {
		try {
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery("select * from user where user_email = '" + email + "';");
			while(rs.next()) {
				if (aes.encrypt(password).equals(rs.getString("user_password"))) return rs.getInt("user_id");
				else return WRONG_PASSWORD;
			}
			stmt.close();
			return USER_NOT_FOUND;
		}
		catch(Exception ex) {
			return USER_NOT_FOUND;
		}
	}

	private int getID(String email) {
		try {
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery("select user_id from user where user_email = '" + email +"'");
			while(rs.next()) {
				return rs.getInt("user_id");
			}
			return -1;
		}
		catch(Exception ex) {
			return -1;
		}
	}

	public List<Post> getPost(String email) {
		try {
			int userID = getID(email);
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery("select user_id,user_email,user_name,post_data,post_id,if(exists(select * from reactions where post.post_id = reactions.reactions_postID and reactions.reactions_userID = '" + userID + "'),1,0) as reacted from post inner join user on post.post_userID = user.user_id where user_id in (select friend_to from friend where friend_from = " + userID + ")order by post_date desc");
			List<Post> result = new ArrayList<Post>();
			while(rs.next()) {
				User user = new User(rs.getInt("user_id"),
									 rs.getString("user_email"),
									 rs.getString("user_name"));
				Post post = new Post(rs.getInt("post_id"),user,rs.getString("post_data"),rs.getBoolean("reacted"));
				result.add(post);
			}
			stmt.close();
			return result;
		}
		catch(Exception ex) {
			 ex.printStackTrace();
			 return null;
		}
	}

	public User getUser(String email) {
		try {
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery("select * from user where user_email = '" + email +"'");
			
			while(rs.next()) {
				User user = new User(rs.getInt("user_id"),
									 rs.getString("user_email"),
									 rs.getString("user_name"));
				stmt.close();
				return user;
			}
			stmt.close();
			return null;
		}

		catch(Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}

	public boolean makeAPost(String email, String post) {
		try {
			PreparedStatement stmt = conn.prepareStatement("insert into post(post_userID,post_data,post_date) values(?,?,NOW())");
			Statement tmpStmt = conn.createStatement();
			ResultSet rs = tmpStmt.executeQuery("select user_id from user where user_email = '" + email +"'");
			int userID = -1;
			while(rs.next()) {
				userID = rs.getInt("user_id");
			}
			stmt.setInt(1,userID);
			stmt.setString(2,post);
			stmt.execute();
			stmt.close();
			tmpStmt.close();
			return true;	
		}
		catch(Exception ex) {
			ex.printStackTrace();
			return false;
		}
	}

	public List<User> searchFriend(String email, String querry) {
		try {
			Statement stmt = conn.createStatement();
			ResultSet rs = 
				stmt.executeQuery("select user_id,user_email,user_name from user inner join friend on user.user_id = friend.friend_to where user_name like '%" + querry +"%' and friend.friend_from in (select user_id from user where user_email = '" + email + "') ");
			List<User> result = new ArrayList<User>();
			while(rs.next()) {
				if (rs.getString("user_email").equals(email)) continue;
				User user = new User(rs.getInt("user_id"),
									 rs.getString("user_email"),
									 rs.getString("user_name"));
				result.add(user);
			}
			stmt.close();
			return result;
		}
		catch(Exception ex) {
			 ex.printStackTrace();
			 return null;
		}
	}

	public List<User> searchNonfriend(String email, String querry) {
		try {
			Statement stmt = conn.createStatement();
			int user_id = getID(email);
			ResultSet rs = 
				stmt.executeQuery("select user_id,user_email,user_name, if(exists(select request_to from request where request_from = " + user_id + " and request_to = user_id),1,0) as requested, if(exists(select request_to from request where request_to = " + user_id + " and request_from = user_id),1,0) as received from user where user_name like '%" + querry +"%' and user_id not in (select friend_to from friend where friend.friend_from = '" + user_id + "' )");
			List<User> result = new ArrayList<User>();
			while(rs.next()) {
				User user = new User(rs.getInt("user_id"),
									 rs.getString("user_email"),
									 rs.getString("user_name"),
									 rs.getBoolean("requested"),
									 rs.getBoolean("received"));
				result.add(user);
			}
			stmt.close();
			return result;
		}
		catch(Exception ex) {
			 ex.printStackTrace();
			 return null;
		}
	}

	public boolean sendFriendReq(String email, int id) {
		int userID = getID(email);
		try {
			PreparedStatement stmt = conn.prepareStatement("insert into request(request_from,request_to) values(?,?)");
			stmt.setInt(1,userID);
			stmt.setInt(2,id);
			stmt.execute();
			stmt.close();
			return true;
		}
		catch(Exception ex) {
			ex.printStackTrace();
			return false;
		}
	}

	public boolean removeFriendReq(String email, int id) {
		int userID = getID(email);
		try {
			PreparedStatement remove = conn.prepareStatement("delete from request where request_from = " + userID + " and request_to = " + id );
			remove.execute();
			remove.close();
			return true;
		}
		catch(Exception ex) {
			ex.printStackTrace();
			return false;
		}
	}

	public boolean refuseFriendReq(String email, int id) {
		int userID = getID(email);
		try {
			PreparedStatement remove = conn.prepareStatement("delete from request where request_from = " + id + " and request_to = " + userID );
			remove.execute();
			remove.close();
			return true;
		}
		catch(Exception ex) {
			ex.printStackTrace();
			return false;
		}
	}

	public boolean acpFriendReq(String email, int id) {
		int userID = getID(email);
		try {
			PreparedStatement remove = conn.prepareStatement("delete from request where request_from = " + id + " and request_to = " + userID );
			remove.execute();
			remove.close();
			PreparedStatement stmt = conn.prepareStatement("insert into friend(friend_from,friend_to) values(?,?)");
			stmt.setInt(1,userID);
			stmt.setInt(2,id);
			stmt.executeUpdate();
			stmt.setInt(1,id);
			stmt.setInt(2,userID);
			stmt.executeUpdate();
			stmt.close();
			return true;
		}
		catch(Exception ex) {
			ex.printStackTrace();
			return false;
		} 
	}	

	public List<User> getFriendReqs(String email) {
		try {
			int userID = getID(email);
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery("select user_id,user_name from user where user_id in (select request_from from request where request_to = " + userID +")");
			List<User> result = new ArrayList<>();
			while(rs.next()) {
				User user = new User(rs.getInt("user_id"),
								null,
								rs.getString("user_name"));
				result.add(user);
			}
			stmt.close();
			return result;
		}
		catch(Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}

	public User getUser(int id) {
		try {
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery("select user_id, user_name from user where user_id = " + id);
			while(rs.next()) {
				User user = new User(rs.getInt("user_id"),
									null,
									rs.getString("user_name"));
				return user;
			}
			return null;
		}
		catch(Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}

	public List<Post> getPostOfUser(int id) {
		try {
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery("select user_id,user_email,user_name,post_data,post_id,if(exists(select * from reactions where post.post_id = reactions.reactions_postID and reactions.reactions_userID = user.user_id),1,0) as reacted from post inner join user on post.post_userID = user.user_id where user.user_id = " + id + " order by post_date desc");
			List<Post> result = new ArrayList<Post>();
			while(rs.next()) {
				User user = new User(rs.getInt("user_id"),
									 rs.getString("user_email"),
									 rs.getString("user_name"));
				Post post = new Post(rs.getInt("post_id"),user,rs.getString("post_data"),rs.getBoolean("reacted"));
				result.add(post);
			}
			stmt.close();
			return result;
		}
		catch(Exception ex) {
			 ex.printStackTrace();
			 return null;
		}
	}

	public String signup(String name, String email, String password) {
		try {
			PreparedStatement stmt = conn.prepareStatement("insert into user(user_name,user_email,user_password) values(?,?,?)");
			stmt.setString(1,name);
			stmt.setString(2,email);
			stmt.setString(3,aes.encrypt(password));
			stmt.execute();
			stmt.close();
			return "OK";
		}
		catch(Exception ex) {
			ex.printStackTrace();
			return "Err";
		}
	}

	public List<User> getFriends(String email) {
		try {
			int userId = getID(email);
			Statement stmt = conn.createStatement(); 
			ResultSet rs = stmt.executeQuery("select user_id , user_name from friend inner join user on friend.friend_to = user.user_id where friend.friend_from = " + userId);
			List<User> result = new ArrayList();
			while(rs.next()) {
				User user = new User(rs.getInt("user_id"), null, rs.getString("user_name"));
				result.add(user);
			}
			stmt.close();
			return result;
		}
		catch(Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}

	public boolean likePost(String email, int postID) {
		try {
			int userID = getID(email);
			PreparedStatement prepareStatement = conn.prepareStatement("insert into reactions(reactions_userID,reactions_postID) values(?,?)");
			prepareStatement.setInt(1,userID);
			prepareStatement.setInt(2,postID);
			prepareStatement.execute();
			prepareStatement.close();
			return true;
		}
		catch(Exception ex) {
			ex.printStackTrace();
			return false;
		}
	}

	public boolean unlikePost(String email, int postID) {
		try {
			int userID = getID(email);
			PreparedStatement prepareStatement = conn.prepareStatement("delete from reactions where reactions_userID = ? and reactions_postID = ?");
			prepareStatement.setInt(1,userID);
			prepareStatement.setInt(2,postID);
			prepareStatement.execute();
			prepareStatement.close();
			return true;
		}
		catch(Exception ex) {
			ex.printStackTrace();
			return false;
		}
	}

	public List<Comment> postComment(String email, int postID, String data) {
		try {
			int userID = getID(email);
			PreparedStatement prepareStatement = conn.prepareStatement("insert into comment(comment_userID, comment_postID, comment_data) values (?,?,?)");
			prepareStatement.setInt(1,userID);
			prepareStatement.setInt(2,postID);
			prepareStatement.setString(3, data);
			prepareStatement.execute();
			prepareStatement.close();

			List<Comment> result = new ArrayList<>();
			User user = getUser(email);
			result.add(new Comment(0, user, postID, data));
			System.out.println("Returned");
			return result;
		}
		catch(Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}

	public List<Comment> getComment(int postID) {
		try {
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery("select * from comment inner join user on comment.comment_userID = user.user_id where comment_postID ='" + postID +"'");
			List<Comment> result = new ArrayList<>();
			while(rs.next()) {
				User user = new User(rs.getInt("user_id"), null, rs.getString("user_name"));
				Comment comment = new Comment(rs.getInt("comment_id"),user,postID,rs.getString("comment_data"));
				result.add(comment);
			}
			stmt.close();
			return result;
		}
		catch(Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}

	public static Database INSTANCE = new Database();
}