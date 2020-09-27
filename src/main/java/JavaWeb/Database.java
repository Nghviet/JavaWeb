package javaweb;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

import java.util.List;

import javaweb.dbschema.Post;

public class Database {

	private Connection conn = null;

	private Database() {
		try {
			Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/INT3139", "root", "1111");
			String sql = "Select * from login-database where username=? and password=?";
			PreparedStatement pst = conn.prepareStatement(sql);
			pst.setString(1, username.getText());
			pst.setString(2, username.getText());
			ResultSet rs = pst.executeQuery();

			//tai khoan va mat khau matched
			if(rs.next()){
				JOptionPane.showMessageDialog(null, "Username and Password MATCHED");

			}
			//tai khoan va mat khau khong khop nhau
			else{
				JOptionPane.showMessageDialog(null, "Username and Password DO NOT MATCHED");
				username.setText("");
				password.setText("");
			}
		}
		catch(Exception ex) {
			ex.printStackTrace();
		}
	}

	protected static final int COMPLETE = 0;
	protected static final int USER_NOT_FOUND = 1;
	protected static final int WRONG_PASSWORD = 2;
	protected int login(String username, String password) {
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