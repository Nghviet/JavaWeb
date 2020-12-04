package javaweb.dbschema;

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

	@Override
	public String toString() {
		return "User [" +
			"id: " + id + ", " +
			"email: " + email + ", " +
			"]";
	}
}