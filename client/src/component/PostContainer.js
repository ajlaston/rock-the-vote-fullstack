import React from "react";
import './PostContainer.css'
import Loader from "./Loader";
import { PContext } from "../PostContext";
import Post from "./Post";
import { VoteContext } from "../RTVContext";

function PostContainer(props) {

    const { token, user } = React.useContext(VoteContext);

    const { getAllPosts, getMyPosts, deletePost } = React.useContext(PContext);

    const [loading, setLoading] = React.useState(true);
    const [mappedData, setMappedData] = React.useState([]);
    const [title, setTitle] = React.useState('');

    const getPosts = () => {
        if (props.type === 'allposts') {
            getAllPosts(token).then(res => {

                setTitle('Political Issues');

                //sorts from most upvotes to least upvotes
                const sorted = res.sort((a,b)=> a.upvotes - b.upvotes).reverse();

                setMappedData(sorted);
                setLoading(false);
            })
        } else if (props.type === 'myposts') {
            getMyPosts(token).then(res => res.json()).then(data => {

                setTitle('My Posts');

                setMappedData(data);
                setLoading(false);
            })
        }

    }

    const handleDelete = (id, token) => {
        deletePost(id, token).then(res=>res.json())
            .then(data=>{
                setMappedData(prev=>{
                    const updated = prev.filter(post=>post._id !== data._id);
                    return updated;
                })
            })
    }

    React.useEffect(() => {
        getPosts();
    }, [])


    return (
        <div className="posts">

            <h3 className="post-title">{title}</h3>

            <div className="all-posts-container">
                {
                    loading ?

                        <Loader />

                        :

                        <div className="all-posts">
                            {
                                mappedData.map(item => {
                                    return <Post 
                                        {...item} 
                                        handleDelete={handleDelete} 
                                        type={props.type} 
                                        token={token}
                                         user={user} 
                                         key={item._id} 
                                         />
                                })
                            }
                        </div>
                }
            </div>

        </div>
    )
}

export default PostContainer;