const CalendarsClose = () => {
    return (
    <div className="calendars__close-open">
        <svg>
        <path
            fill="currentColor"
            d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"
        />
        </svg>
    </div>
    );
};

const CalendarsOpen = () => {
    return (
    <div className="calendars__close-open">
        <svg>
        <path
            fill="currentColor"
            d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
        />
        </svg>
    </div>
    );
};
export default function SidebarCalendars() {
    let myOrOther = "내 캘린더";

    return (
    <div className="sidebar-calendars">
        <span className="sidebar-calendars__inner">
        <span className="sidebar-calendars__text-con">
            <div className="calendars">
            <div className="calendars__text">{myOrOther}</div>
            <CalendarsClose />
            </div>
        </span>
        </span>
    </div>
    );
}