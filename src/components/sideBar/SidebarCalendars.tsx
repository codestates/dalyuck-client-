import Tooltip from "@material-ui/core/Tooltip";

const CalendarsOpen = () => {
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

const CalendarsClose = () => {
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

export default function SidebarCalendars({
  myOrOther,
  setIsOpen,
  isOpen,
}: {
  myOrOther: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}) {
  let subject: string = "";
  myOrOther === "my" ? (subject = "내 캘린더") : (subject = "다른 캘린더");

  const openHandler = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="sidebar-calendars" onClick={() => openHandler()}>
      <span className="sidebar-calendars__inner">
        <span className="sidebar-calendars__text-con">
          <div className="calendars">
            <Tooltip
              title={
                <h1
                  style={{
                    color: "white",
                    fontSize: "13px",
                  }}
                >
                  {subject}
                </h1>
              }
            >
              <div className="calendars__text">{subject}</div>
            </Tooltip>
            {isOpen ? <CalendarsOpen /> : <CalendarsClose />}
          </div>
        </span>
      </span>
    </div>
  );
}
