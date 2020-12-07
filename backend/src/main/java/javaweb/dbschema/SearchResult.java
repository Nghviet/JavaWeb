package javaweb.dbschema;

import java.util.List;

public class SearchResult {
	List<User> friend;
	List<User> nonFriend;

	public SearchResult(List<User> _friend, List<User> _nonFriend) {
		friend = _friend;
		nonFriend = _nonFriend;
	}

	
}