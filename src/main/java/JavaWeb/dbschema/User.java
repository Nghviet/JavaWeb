package javaweb.dbschema;

public class User implements Schema {
		
	public int id;
	public String email;
	public String password;
	public boolean verified;

	public User() {
		id = -1;
		email = null;
		password = null;
		verified = false;
	}

	public User(int _id, String _email, String _password, boolean _verified) {
		id = _id;
		email = _email;
		password = _password;
		verified = _verified;
	}


	public int getId(){return id;}
	public void setId(int id) {
		this.id = id;
	}


	public String getEmail(){
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	

	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}

	public boolean getVerified(){
		return verified;
	}
	public void setVerified(boolean verified) {
		this.verified = verified;
	}
	@Override
	public String toString() {
		return "User [" +
			"id: " + id + ", " +
			"email: " + email + ", " +
			"password: " + password + ", " +
			"verified: " + verified + ", " +
			"]";
	}
}