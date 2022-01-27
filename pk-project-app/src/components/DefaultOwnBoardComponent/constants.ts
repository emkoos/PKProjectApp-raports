export interface BoardTypes{
    boardTypeId: string;
    name: string;
}

export interface Columns{
    id: string;
    title: string;
    position: number;
    boardId: string;
    cards: Cards[];
}

export interface Cards{
    id: string;
    title: string;
    description: string;
    userEmail: string;
    columnId: string;
    commentId: string;
    stateId: string;
    createdDate: string;
    updatedStatusDoneDate: string;
    deadlineDate: string;
    priority: number;
    estimate: number;
}