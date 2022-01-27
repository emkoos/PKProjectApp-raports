import instance from './axiosConfig';

export const getCardById = (Id: string) => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    return instance.get(`Cards/${Id}`, config).then((response) => response.data);
}

export const getCardByUserEmail = (email: string) => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    return instance.get(`Cards/User/${email}`, config).then((response) => response.data);
}

export const getCardByColumnId = (columnId: string) => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    return instance.get(`Cards/Column/${columnId}`, config).then((response) => response.data?.cards);
}

export const createCard = (title: string, description: string, userEmail: string, columnId: string | undefined, statusId: string, deadlineDate: string, priority: number, estimate: number, attachement: string) => {
    const params = { title, description, userEmail, columnId, statusId, deadlineDate, priority, estimate, attachement };
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    return instance.post("Cards/create", params, config);
}

export const editCard = (Id: string, title: string, description: string, userEmail: string, columnId: string, statusId: string, createdDate: string, updatedStatusDoneDate: string, deadlineDate: string, priority: number, estimate: number, attachement: string) => {
    const params = { Id, title, description, userEmail, columnId, statusId, createdDate, updatedStatusDoneDate, deadlineDate, priority, estimate, attachement };
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    return instance.put("Cards/edit", params, config);
}

export const deleteCard = (Id: string) => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    return instance.delete(`Cards/${Id}`, config);
}