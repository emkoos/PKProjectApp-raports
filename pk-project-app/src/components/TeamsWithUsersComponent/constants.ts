export interface Team{
    id: string;
    name: string;
    users: User[];
}

export interface User{
    email: string,
    firstname: string,
    lastname: string,
    photo: string
}

export interface InitialTeam{
    id: string;
    name: string;
}