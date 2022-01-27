import instance from './axiosConfig';

export const getStatuses = () => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    return instance.get("Statuses", config).then((response) => response.data?.statuses);
};

export const getStatus = (Id: string) => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    return instance.get(`Statuses/${Id}`, config).then((response) => response.data?.status);
}