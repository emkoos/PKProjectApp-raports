import { RefObject } from "react";

export const MONTS = [
    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecień",
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Październik",
    "Listopad",
    "Grudzień"
];

export const WEEKDAYS_LONG = [
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
    "Niedziela"
];

export const WEEKDAYS_SHORT = ["Ndz", "Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Ndz"];

export interface IDatePickerProps{
    disabled? : boolean,
    inputRef? : RefObject<HTMLInputElement>
}