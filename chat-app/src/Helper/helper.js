import axios from 'axios'
import appEndPoint from './endPoint'

const loginendPoint = `${appEndPoint}/api/auth/login`
const signupendPoint = `${appEndPoint}/api/auth/signup`
const addContactendPoint = `${appEndPoint}/api/chat/addNewContact`
const getContactendPoint = `${appEndPoint}/api/chat/getContact`
const updateProfileendPoint = `${appEndPoint}/api/chat/updateProfile`

const sendMessageendPoint = `${appEndPoint}/api/chat/sendMessage`
const getMessageendPoint = `${appEndPoint}/api/chat/receiveMessage`



const createConfig = (url, body, method) => {
    const Token = window.localStorage.getItem('token')
    const config = {
        method,
        url,
        headers: {
            'Content-Type': 'application/json',
            "Authorization": Token

        },
        data: body
    };

    return config
}

async function authApi(data, authType) {

    try {
        let url = ""
        if (authType === "login") {
            url = loginendPoint
        }
        if (authType === "signup") {
            url = signupendPoint
        }
        const config = createConfig(url, data, 'post')
        const loginResponse = await axios(config)
        // if (loginResponse.status === 200) {
        //     const msg = loginResponse?.data?.message;
        //     const token = JSON.stringify(loginResponse?.data?.sessionToken);
        //     if (token && typeof (token) === "string") {
        //         toast.success(msg)
        //         return loginResponse;
        //     }
        // }
        return loginResponse;
    } catch (error) {
        const msg = error?.response
        console.log("msging", msg)
        return msg;
        // if (msg) return toast.error(msg)
        // return toast.error("Something Went Wrong");
    }

}

async function forgetPassword(email) {
    return true;
}

const userApi = async (data, task) => {
    try {
        let url = ""
        let reqType = "post"
        if (task === "addNewContact") {
            url = addContactendPoint
            reqType = "post"
        }
        if (task === "getContact") {
            url = getContactendPoint
            reqType = "get"
        }
        if (task === "updateProfile") {
            url = updateProfileendPoint
            reqType = "post"
        }
        const config = createConfig(url, data, reqType)
        const res = await axios(config)
        return res;
    } catch (error) {
        const msg = error?.response
        console.log("msging", msg)
        return msg;
    }

}

const chatApi = async (data, task) => {
    try {
        let url = ""
        let reqType = "post"
        if (task === "sendMessage") {
            url = sendMessageendPoint
            reqType = "post"
        }
        if (task === "getMessage") {
            url = getMessageendPoint
            reqType = "post"
        }
        const config = createConfig(url, data, reqType)
        const res = await axios(config)
        return res;
    } catch (error) {
        const msg = error?.response
        console.log("msging", msg)
        return msg;
    }

}

export { authApi, forgetPassword, userApi, chatApi }
