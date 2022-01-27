import { IColumn } from "..";
import { EColumnActions, IAddColumnAction } from "./types";

export const setColumns = (column: IColumn): IAddColumnAction => {
    return {
        type: EColumnActions.SETCOLUMNSTATE,
        payload: { column }
    };
}