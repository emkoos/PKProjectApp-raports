export interface Status{
    id: string;
    name: string;
}

export interface Comment{
    id: string;
    userEmail: string;
    cardId: string;
    content: string;
    date: string;
}
