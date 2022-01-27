import instance from './axiosConfig';

export const getBoardTypes = () => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    return instance.get("BoardTypes", config).then((response) => response.data?.boardTypes);
};

export const getBoardType = (Id: string) => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    return instance.get(`BoardTypes/${Id}`, config).then((response) => response.data);
}