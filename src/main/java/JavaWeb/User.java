package JavaWeb;

import java.lang.String;

public class User {
	public String username;
	private String password;

	User() {
		username = null;
		password = null;
	}

	User(String _username,String _password) {
		username = _username;
		password = _password;
	}


	@Override
	public String toString() {
		return "User {"+
			"username: " + username + "; " +
			"password: " + password + " }";
	}
}