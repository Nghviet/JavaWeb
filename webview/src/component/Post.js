import React from 'react'

import {
	Card
} from 'react-bootstrap'

export default function Post(props) {
	const post = props.post;
	console.log(post);

	const user = post.owner	

	const link = "/user/" + user.id;

	return (
		<Card className = "mt-4">  
                <Card.Header>
                    <a href = {link}> {user.name} </a>
                    <p> {post.timeDiff}</p>
                </Card.Header>
                <Card.Body>
                    {post.data}
                </Card.Body>
                <Card.Footer>
                    
                </Card.Footer>
        </Card>
	)
}