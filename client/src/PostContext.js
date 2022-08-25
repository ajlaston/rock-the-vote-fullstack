import React from "react";

const PContext = React.createContext();

function PostContext(props){

    const getAllPosts = async (token) => {
       const fetchData =  await fetch('/api/issue', {
            headers : {
                "Authorization" : `Bearer ${token}`,
                "Content-Type" : "applicatiion/json"
            }
        })

        const response = await fetchData.json();

        return response;
    }

    const getMyPosts = (token) => {
        return fetch('/api/issue/user', {
            headers : {
                "Authorization" : `Bearer ${token}`,
                "Content-Type" : "applicatiion/json"
            }
        })
    }

    const upvote = (id, email, token) => {
        return fetch(`api/issue/upvote/${id}`, {
 
             method : "put",
 
             headers : {
                 "Authorization" : `Bearer ${token}`,
                 "Content-Type" : "application/json"
             },
 
             body : JSON.stringify({ 
                 email : email
             })
         })
     }

    const downvote = (id, email, token) => {
       return fetch(`api/issue/downvote/${id}`, {

            method : "put",

            headers : {
                "Authorization" : `Bearer ${token}`,
                "Content-Type" : "application/json"

            },

            body : JSON.stringify({ 
                email : email
            })
        })
    }

    const create = (obj, token) => {
       return fetch('api/issue', {
            method: 'post',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                title: obj.title,
                description: obj.title,
            })
        })
    }

    const deletePost = (id, token) => {
        return fetch(`api/issue/${id}`, {
            method : 'delete',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
    }

    const updatePost = (id, token, data) => {
        return fetch(`/api/issue/${id}`, {
            method : 'put',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }, 
            
            body : JSON.stringify(data)
        })
    }

    const app = {
        getAllPosts,
        getMyPosts,
        upvote,
        downvote,
        create,
        deletePost,
        updatePost
    }

    return (
        <PContext.Provider value={app}>
            {props.children}
        </PContext.Provider>
    )
}

export {PostContext as PostContextProvider, PContext}