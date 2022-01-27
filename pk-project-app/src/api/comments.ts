import instance from './axiosConfig';

export const getCommentById = (Id: string) => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    return instance.get(`Comments/${Id}`, config).then((response) => response.data);
}

export const getCommentByCardId = (cardId: string) => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    return instance.get(`Comments/Card/${cardId}`, config).then((response) => response.data?.comments);
}

export const getCommentByUserEmail = (email: string) => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    return instance.get(`Comments/Card/${email}`, config).then((response) => response.data);
}

export const createComment = (userEmail: string, cardId: string, content: string ) => {
    const params = { userEmail, cardId, content };
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    return instance.post("Comments/create", params, config);
}

export const editComment = (Id: string, userEmail: string, cardId: string, content: string ) => {
    const params = { Id, userEmail, cardId, content };
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    return instance.put("Comments/edit", params, config);
}

export const deleteComment = (Id: string) => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    return instance.delete(`Comments/${Id}`, config);
}