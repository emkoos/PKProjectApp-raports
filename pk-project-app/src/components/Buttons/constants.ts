import { IBoard, IColumn } from "../../state";

export interface IButtonProps {
    route: string
}

export interface ICardButtonProps {
    route: string,
    selectedColumn: IColumn
}

export interface IColumnButtonProps {
    route: string,
    selectedBoard: IBoard
}

export interface IBoardButtonProps {
    route: string,
    selectedBoard: IBoard
}