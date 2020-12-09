package javaweb.dbschema;

import java.security.Principal;

public class User implements Schema {
		
	public int id;
	public String email;
	public String name;
	public boolean requested = false;
	public boolean received = false;

	public User() {
		id = -1;
		email = null;
		name = null;
	}

	public User(int _id, String _email, String _name) {
		id = _id;
		email = _email;
		name = _name;
	}

	public User(int _id, String _email, String _name, boolean _requested, boolean _received) {
		id = _id;
		email = _email;
		name = _name;
		requested = _requested;
		received = _received;
	}

	public User(String _email) {
		id = -1;
		email = _email;
		name = null;
		requested = false;
		received = false;
	}

	@Override
	public String toString() {
		return "User [" +
			"id: " + id + ", " +
			"email: " + email + ", " +
			"name : " + name + "," +
			"]";
	}
}