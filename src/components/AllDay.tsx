import { EventType } from "../fakeData/Events"

export default function allDay({event}:{event:EventType}) {

    return (
      <div className="all-day" >
        <div className="all-day__inner" style={{backgroundColor:event.colour}}>
          <span className="all-day-span">
            <span className="all-day-span__inner">{event.eventName}</span>
          </span>
        </div>
      </div>
    );
  }