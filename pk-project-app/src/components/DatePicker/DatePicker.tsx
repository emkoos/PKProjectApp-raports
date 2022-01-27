import { useFormikContext } from "formik";
// import { useState } from "react";
// import { Form } from "react-bootstrap";
// import DayPicker from "react-day-picker";
// import { useDispatch } from "react-redux";
// import { useLocation } from "react-router";
// import { IForm } from "../AddNewCardComponent/constants";
// import { IDatePickerProps, WEEKDAYS_LONG, WEEKDAYS_SHORT } from "./constants";

// const DatePicker = ({ disabled, inputRef } : IDatePickerProps) => {
//     const [selectedDate, setSelectedDate] = useState<Date | undefined>();
//     const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
//     const dispatch = useDispatch();
//     const location = useLocation();

//     const {
//         values,
//         handleChange,
//         errors,
//         setFieldValue
//     } = useFormikContext<IForm>();

//     const outsideClickHandler = () => setIsInputFocused(false);
//     const handleFocus = () => setIsInputFocused(true);

//     const handleDayClick = (date: Date, modifiers: any = []) => {
//         if(modifiers.disabled){
//             return;
//         }
//         setSelectedDate(modifiers.selected ? undefined : date)
//         setIsInputFocused(false);
//     }

//     const todayDateString = () => {
//         const date = new Date();

//         return `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}.${date.getMonth()+1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}.${date.getFullYear()}`
//     }

//     return (
//         <div
//             className="day-picker-input-wrapper"
//             onClick={(event) => event.stopPropagation()}
//         >
//             {/* <Calendar3 /> - ikona*/}
//             <Form.Control 
//                 className="date-input"
//                 ref={inputRef}
//                 type="text"
//                 name="date"
//                 value={values.date.length ? values.date : todayDateString()}
//                 onFocus={handleFocus}
//                 onChange={handleChange}
//                 autoComplete="off"
//                 readOnly={true}
//                 disabled={disabled}
//             />
//             <Form.Control.Feedback type="invalid">
//                 {errors.date}
//             </Form.Control.Feedback>
//             {isInputFocused && (
//                 <div id="app-dayPicker-wrapper" className="shadow rounded">
//                     <DayPicker 
//                         className="bg-white rounded"
//                         onDayClick={handleDayClick}
//                         selectedDays={selectedDate}
//                         locale="pl"
//                         months={MONTHS}
//                         month={selectedDate}
//                         weekdaysLong={WEEKDAYS_LONG}
//                         weekdaysShort={WEEKDAYS_SHORT}
//                         firstDayOfWeek={1}
//                         modifiers={modifiers}
//                         modifiersStyles={modifiersStyles}
//                     />
//                 </div>
//             )}
//         </div>
//     )
// }

// export default DatePicker;