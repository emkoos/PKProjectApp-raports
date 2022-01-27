import instance from './axiosConfig';

export const getBoardById = (Id: string) => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    return instance.get(`Boards/${Id}`, config).then((response) => response.data);
}

export const getBoardByTeamId = (teamId: string) => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    return instance.get(`Boards/Team/${teamId}`, config).then((response) => response.data?.boards);
}

export const getMyAllBoards = () => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    return instance.get(`Boards/Teams/my`, config).then((response) => response.data?.boards);
}

export const createBoard = (name: string, teamId: string, boardTypeId: string) => {
    const params = { name, teamId, boardTypeId };
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    return instance.post("Boards/create", params, config).then((response) => response.data);
}

export const editBoard = (Id: string, name: string, teamId: string, boardTypeId: string) => {
    const params = { Id, name, teamId, boardTypeId };
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    return instance.put("Boards/edit", params, config);
}

export const deleteBoard = (Id: string) => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    return instance.delete(`Boards/${Id}`, config);
}