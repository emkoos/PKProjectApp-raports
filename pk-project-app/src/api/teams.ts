import instance from './axiosConfig';

export const getUserTeams = () => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    return instance.get(`Teams/teams/my`, config).then((response) => response.data?.teams);
}

export const getUsersByTeamId = (teamId: string) => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    return instance.get(`Teams/teams/users/${teamId}`, config).then((response) => response.data?.users);
}

export const createTeam = (name: string) => {
    const params = { name };
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    return instance.post("Teams/create", params, config);
}

export const deleteTeam = (Id: string) => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    return instance.delete(`Teams/${Id}`, config);
}

export const getTeamById = (Id: string) => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    return instance.get(`Teams/${Id}`, config).then((response) => response.data);
}