import React from "react";
import './CommentPost.css';

function CommentPost(props) {

    const {comment, deleteComment, user} = props;

    const handleDelete = (e) => {
        e.preventDefault()
        deleteComment(comment._id);
    }

    return (
        <div className="comment-post">
            <hr />
            <div className="comment-post-header">
                <p>{comment.email}</p>
                <p>{comment.created}</p>
            </div>
            <div className="comment-post-description">
                {comment.description}
            </div>

            { user._id === comment.user &&
                <button onClick={handleDelete}>delete</button>
            }
            
        </div>
    )
}

export default CommentPost;