package javaweb.dbschema;

public class Comment implements Schema {
	
	public int id;
	public User user;
	public int postID;
	public String data;

	public Comment(int _id, User _user, int _postID, String _data) {
		id = _id;
		user = _user;
		postID = _postID;
		data = _data;
	}

	public String toString() {
		return "Post";
	}
}