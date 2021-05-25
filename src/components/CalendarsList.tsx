const CheckBox = () => {
    return (
      <div className="check-box">
        <div className="check-box__inner">
          <div className="check-box__padding"></div>
          <div className="check-box__mid"></div>
          {/* <div className="isChecked" /> */}
          <div className="check-box__bot">
            <div className="check-box-shape">
              <div className="check-box-shape__1"></div>
              <div className="check-box-shape__2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default function CalendarsList() {
    return (
      <div className="calendars-list">
        <div className="calendars-list__inner">
          <div className="calendar-label">
            <li className="calendar-label__li">
              <label className="calendar-label__li-inner">
                <div className="check-box-con">
                  <CheckBox />
                </div>
                <div className="calendar-label-name">
                  <span className="calendar-label-name__span">강정환</span>
                </div>
              </label>
            </li>
          </div>
        </div>
      </div>
    );
  }