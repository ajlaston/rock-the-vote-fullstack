import React from "react";
import './Comment.css';
import CommentPost from "./CommentPost";

function Comment(props) {

    const { user, token, issueId } = props;

    const [commentText, setCommentText] = React.useState('show comments')
    const [visible, setVisible] = React.useState(false)
    const [comments, setComments] = React.useState([]);
    const [toggle, setToggle] = React.useState(false);
    const [formData, setFormData] = React.useState({
        email : user.email,
        description: "",
        issue: props.issueId
    })

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    //toggles comment form
    const toggleForm = (bool) => {
        setToggle(bool);
    }

    //shows/hides comment section
    const toggleComments = () => {
        if (visible === true) {
            setCommentText('show comments');
        } else {
            setCommentText('hide comments');
        }
        setVisible(prev => !prev);
    }

    //post comment to db
    const createComment = (data) => {
        return fetch('/api/comment', {
            method: "post",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)
        })
    }

    //handles comment creation for the front end
    const publish = (e) => {
        e.preventDefault();

        createComment(formData)
        .then(res => res.json())
            .then(data => {
                setComments(prev => ([
                    ...prev,
                    data
                ]))

                //closes form
                toggleForm(false);

                //clears form
                setFormData({
                    email : user.email,
                    description: "",
                    issue: props.issueId
                })

                //shows the "show/hide comments" button
                if (visible === false) {
                    toggleComments();
                }
            })
    }

    //gets comments for the issue
    const getComments = (issueId) => {
        return fetch(`/api/comment/${issueId}`, {

            headers : {
                "Authorization" : `Bearer ${token}`,
                "Content-Type" : "application/json"
            }
        })
    }

    const deleteComment = (commentId) => {
        return fetch(`/api/comment/${commentId}`, {
            method : "delete",
            headers : {
                "Authorization" : `Bearer ${token}`,
                "Content-Type" : "application/json"
            }
        }).then(res=>res.json())
            .then(data=>{
                setComments(prev=>{
                    const updated = prev.filter(comment=> comment._id !== data._id);
                    return updated;
                })
            })
    }



    React.useEffect(() => {

        getComments(issueId).then(res=>res.json())
            .then(data=>{
                setComments(data);
            })
    }, [])

    return (
        <div className="comment-container">


            {toggle === false ?

                <button onClick={() => toggleForm(true)}>Add Comment</button>

                :

                <form className="comment-form" onSubmit={publish}>
                    <input name="description" onChange={handleChange} value={formData.description} placeholder="Add Comment" required/>
                    <div>
                        <button onClick={() => toggleForm(false)}>cancel</button>
                        <button>publish</button>
                    </div>
                </form>
            }

            {
                comments.length > 0 &&
                <div>
                    <button className="comment-toggle-btn" onClick={toggleComments}>{commentText}</button>
                </div>

            }


            {
                visible === true &&

                <div className="all-comments">
                    {comments.map((comment, index) => {
                        return <CommentPost deleteComment={deleteComment} user={user} comment={comment} key={index} />
                    })}
                </div>
            }





        </div>
    )
}

export default Comment;