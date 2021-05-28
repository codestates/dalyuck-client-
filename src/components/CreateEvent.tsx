import * as req from '../functions/Axios';
import { useSelector } from 'react-redux';
import { RootState } from "../reducers/index";

export default function CreateEvent() {

    const store = useSelector( (state:RootState) => state.userReducer )
    const testHanle = () =>{          // 악시오스 모듈 요청 테스트용 함수 중요한 함수 아님.
      const res = req.createTodo('1',0,'이름');
      console.log(res,'click')
      console.log(store)
    }

    return (
      <div className="create-event" onClick={()=>{testHanle()}}>
        <div className="create-event__inner">
          <div className="create-event__btn">
            <div className="create-event__btn-con">
              <div className="create-event__btn-con__svg">
                <div className="event-btn-svg-con">
                  <svg
                    style={{ width: 24 + "px", height: 24 + "px" }}
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12.35 20H10V17H12.09C12.21 16.28 12.46 15.61 12.81 15H10V12H14V13.54C14.58 13 15.25 12.61 16 12.35V12H20V12.35C20.75 12.61 21.42 13 22 13.54V5C22 3.9 21.1 3 20 3H4C2.9 3 2 3.9 2 5V20C2 21.1 2.9 22 4 22H13.54C13 21.42 12.61 20.75 12.35 20M16 7H20V10H16V7M10 7H14V10H10V7M8 20H4V17H8V20M8 15H4V12H8V15M8 10H4V7H8V10M17 14H19V17H22V19H19V22H17V19H14V17H17V14"
                    />
                  </svg>
                </div>
              </div>
              <div className="create-event__btn-con__text">만들기</div>
            </div>
          </div>
        </div>
      </div>
    );
  }