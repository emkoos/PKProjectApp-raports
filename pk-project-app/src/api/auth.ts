import instance from './axiosConfig';

export const registerUser = (username: string, email: string, password: string, firstname: string, lastname: string, photo: string) => {
    const params = { username, email, password, firstname, lastname, photo };
    return instance.post("Users/register", params);
}

export const loginUser = (email: string, password: string) => {
    const params = { email, password };
    return instance.post("Users/login", params).then((response) => response.data);
}

export const infoUser = () => {
    const config = {
         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    return instance.get("Users/user/logged-in-user", config).then((response) => response.data);
}

export const addUserToTeam = (teamId: string, userEmail: string) => {
    const params = { teamId, userEmail };
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
   }
    return instance.post("Users/user/add-to-team", params, config).then((response) => response.data);
}

export const editUserInfo = (email: string, username: string, firstname: string, lastname: string, photo: string) => {
    const params = { email, username, firstname, lastname, photo };
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    return instance.put("Users/edit-profile", params, config);
}