import React from "react";
import Comment from "../component/Comment";
import { PContext } from "../PostContext";
import './Post.css'

function Post(props) {

    // _id is the id of the post
    const { user, token, voted, _id, handleDelete, title } = props;

    const { upvote, downvote, updatePost } = React.useContext(PContext);

    const [upVotes, setUpVotes] = React.useState(props.upvotes);
    const [downVotes, setDownVotes] = React.useState(props.downvotes);
    const [hasVoted, setHasVoted] = React.useState(false);
    const [totalVotes, setTotalVotes] = React.useState(props.voted.length);

    //edit btn
    const [toggleEdit, setToggleEdit] = React.useState(false);
    const [editForm, setEditForm] = React.useState({
        title: props.title,
        description: props.description
    })

    const checkVotes = (voted) => {
        if (voted.includes(user.email)) {
            setHasVoted(true);
        }
    }

    //upvotes handler
    const handleUpvote = () => {
        upvote(props._id, props.user.email, props.token)
            .then(res => res.json())
            .then(data => {
                checkVotes(data.voted);
            })

        setUpVotes(prev => prev + 1);
        setTotalVotes(prev => prev + 1);
    }

    //downvotes downvote handler
    const handleDownvote = () => {
        downvote(props._id, props.user.email, props.token)
            .then(res => res.json())
            .then(data => {
                checkVotes(data.voted);
            })

        setDownVotes(prev => prev - 1);
        setTotalVotes(prev => prev + 1);
    }

    const deleteAdapter = () => {
        handleDelete(_id, token);
    }

    const handleEditToggle = () => {
        setToggleEdit(prev => !prev);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        updatePost(_id, token, editForm);
        handleEditToggle();
    }

    React.useEffect(() => {
        checkVotes(voted);
    }, [])

    return (
        <div className="single-post-container">

            <div className="single-post">

                {
                    toggleEdit === true ?

                        <div className="edit-form-container">
                            <h4>Edit</h4>
                            <form className="edit-form" onSubmit={handleUpdate}>
                                <input name="title" onChange={handleChange} value={editForm.title} placeholder="title" required />
                                <input name="description" onChange={handleChange} value={editForm.description} placeholder="description" required />

                                <div className="edit-form-btns">
                                    <button onClick={handleEditToggle}>cancel</button>
                                    <button>update</button>
                                </div>
                            </form>

                        </div>

                        :

                        <div className="single-post-wrapper">
                            <div className="single-post-wrapper">
                                <h4>{editForm.title}</h4>
                                <p>{editForm.description}</p>
                            </div>

                            <div className="votes-container">
                                {
                                    hasVoted && <p>you voted already</p>
                                }

                                <div className="votes">
                                    <div className="voting-btns">
                                        <div className="upvote">
                                            <button onClick={handleUpvote} disabled={hasVoted}>↑</button>
                                            <p>{upVotes}</p>
                                        </div>

                                        <div className="downvote">
                                            <button onClick={handleDownvote} disabled={hasVoted}>↓</button>
                                            <p>{downVotes}</p>
                                        </div>
                                    </div>

                                    <div className="total-votes">
                                        <p>Total Votes</p>
                                        <p>{totalVotes}</p>
                                    </div>
                                </div>

                                {
                                    props.type === 'myposts' &&

                                    <div className="delete-btn-container">
                                        <button onClick={deleteAdapter}>delete</button>
                                        <button onClick={handleEditToggle}>edit</button>
                                    </div>
                                }
                            </div>
                        </div>

                }


            </div>

            {
              toggleEdit === false &&   <Comment issueId={_id} user={user} token={token} />
            }
            

        </div>
    )
}

export default Post;