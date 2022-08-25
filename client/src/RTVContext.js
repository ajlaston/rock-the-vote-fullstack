import React from "react";
import axios from 'axios';

const VoteContext = React.createContext();

const userAxios = axios.create();
userAxios.interceptors.request.use(config => {
    const { token } = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

function RTVContext(props) {

    //checks if credentials aree saved to local storage. used to log in
    const initState = {
        user: JSON.parse(localStorage.getItem('user')) || {},
        token: localStorage.getItem('token') || "",
        issues: [],
        errMsg: ""
    }

    const [userState, setUserState] = React.useState(initState);


    const signup = (credentials) => {
        return axios.post('/auth/signup', credentials)
            .then(res => {
                const { user, token } = res.data;

                //save to localstorage
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));

                setUserState(prev => ({
                    ...prev,
                    user,
                    token
                }))
            })
            .catch(err => handleAuthError(err.response.data.errMsg));
    }

    const login = (credentials) => {
        return axios.post('/auth/login', credentials)
            .then(res => {
                const { user, token } = res.data;

                //save to localstorage
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));

                setUserState(prev => ({
                    ...prev,
                    user,
                    token
                }))
            })
            .catch(err => handleAuthError(err.response.data.errMsg));
    }

    const addIssue = (newIssue) => {
        userAxios.post('/api/issues', newIssue)
            .then(res => {
                setUserState(prev => ({
                    ...prev,
                    issues: [...prev.issues, res.data]
                }))
            })
            .catch(err => console.error(err));
    }

    const getIssues = () => {
        userAxios.get('/api/issues/user')
            .then(res => {
                setUserState(prev => ({
                    ...prev,
                    issues: res.data
                }))
            })
            .catch(err => console.error(err));
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUserState({
            user: {},
            token: "",
            issues: [],
            errMsg: ""
        });
    }

    function handleAuthError(errMsg) {
        setUserState(prev => ({
            ...prev,
            errMsg
        }))
    }

    function resetAuthError() {
        setUserState(prev => ({
            ...prev,
            errMsg: ""
        }))
    }

    const app = {
        ...userState,
        login,
        signup,
        logout,
        addIssue,
        getIssues,
        resetAuthError,
        userAxios
    }


    return (
        <VoteContext.Provider value={app}>
            {props.children}
        </VoteContext.Provider>
    )
}

export { RTVContext as RTVContextProvider, VoteContext }