package javaweb;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import javaweb.dbschema.Post;
import java.util.*;
public class Database {

	private Connection conn = null;

	private Database() {
		try {
			Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/INT3139", "root", "1111");
		}
		catch(Exception ex) {
			ex.printStackTrace();
		}
	}


	protected static final int COMPLETE = 0;
	protected static final int USER_NOT_FOUND = 1;
	protected static final int WRONG_PASSWORD = 2;
	protected int login(String username, String password) throws UsernameNotFoundException{
		if (username == null){
			throw new UsernameNotFoundException("User"+ username + " WAS NOT IN DATABASE!");
		}
		//else if(User.

		return COMPLETE;
	}

	public List<Post> getPost(String userId, int from, int to) {
		try {
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery("select * from student");
		}
		catch(Exception ex) {
			 ex.printStackTrace();
		}
		return null;
	}


	public static Database INSTANCE = new Database();
}