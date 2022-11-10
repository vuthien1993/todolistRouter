import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import DatePicker from "react-date-picker";
const useWrapper = () => {
  const display = useSelector((state) => state.nextStep.display);
  const [showDate, setShowDate] = useState(false);
  const [value, onChange] = useState(new Date());
  const showDateHandler = () => {
    setShowDate(true);
  };
  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowDate(false);
          console.log(showDate);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, showDate]);
  };
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  const datePicker = showDate && (
    <div ref={wrapperRef} className={`${display ? "dateDue" : "dateDue1"}`}>
      <div className="due">
        <span>Due</span>
      </div>
      <div>
        <DatePicker onChange={onChange} value={value} className="datePicker" />
      </div>
    </div>
  );
  const timeNow = new Date().getDate();
  const time = new Date(value).getDate();
  const monthNow = new Date().getMonth();
  const month = new Date(value).getMonth();
  return {
    timeNow,
    time,
    monthNow,
    month,
    value,
    showDateHandler,
    datePicker,
  };
};
export default useWrapper;
