import instance from './axiosConfig';

export const getColumnById = (Id: string) => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    return instance.get(`Columns/${Id}`, config).then((response) => response.data);
}

export const getColumnByBoardId = (boardId: string) => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    return instance.get(`Columns/Board/${boardId}`, config).then((response) => response.data?.columns);
}

export const createColumn = (title: string, position: number, boardId: string | undefined) => {
    const params = { title, position, boardId };
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    return instance.post("Columns/create", params, config);
}

export const editColumn = (Id: string, title: string, position: number, boardId: string) => {
    const params = { Id, title, position, boardId };
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    return instance.put("Columns/edit", params, config);
}

export const deleteColumn = (Id: string) => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    return instance.delete(`Columns/${Id}`, config);
}