package javaweb.dbschema;

public class Message implements Schema {
		
	public int id = -1;
	public int sender = -1;
	public int recv = -1;
	public String message = null;

	public Message() {
	}

	public Message(int _id, int _sender, int _recv, String _message) {
		id = _id;
		sender = _sender;
		recv = _recv;
		message = _message;
	}

	@Override
	public String toString() {
		return "Message " + id + " " + sender + " " + recv + " " + message;
	}

}