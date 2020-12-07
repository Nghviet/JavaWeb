package javaweb.dbschema;

public class Post implements Schema {
	public int id;
	public User user;
	public String data;
	public boolean reacted;

	public Post(int _id, User _user, String _data, boolean _reacted) {
		id = _id;
		user = _user;
		data = _data;
		reacted = _reacted;
	}

	public String toString() {
		return "Post";
	}
}