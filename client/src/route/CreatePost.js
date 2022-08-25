import React from "react";
import { useNavigate } from "react-router-dom";
import { PContext } from "../PostContext";
import './CreatePost.css';

function CreatePost(props) {

    const {create} = React.useContext(PContext);

    const navigate = useNavigate();

    const [formData, setFormData] = React.useState({
        title: "",
        description: "",

    })

    const handleChange = (e) => {
        e.preventDefault();
        const {value, name} = e.target;

        setFormData(prev=>({
            ...prev,
            [name] : value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        create(formData, props.token).then(res=>{
            setFormData({
                title: "",
                description: ""
            })
            navigate('/home');
        })
    }

    React.useEffect(() => {
        
    }, [])

    return (
        <div className="create-post">

            <div className="form-container">
                <div className="form-wrapper">

                    <h3>Create Political Issue</h3>

                    <form name="post" className="post-form" onSubmit={handleSubmit}>
                        <input name="title" id="title" onChange={handleChange} value={formData.title} placeholder="title" required/>
                        <input name="description" id="description" onChange={handleChange} value={formData.description} placeholder="description" required/>
                        <div className="create-btn">
                            <button>submit</button>
                        </div>
                    </form>
                    
                </div>

            </div>
        </div>
    )
}

export default CreatePost;