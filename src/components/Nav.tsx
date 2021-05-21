const Nav = () => {
    return(
        <div className="nav">
        <div className="nav-con">
          <div className="menu-logo-name-con">
            <div className="menu-con">
              {/* sidebar 접었다 폇다하는 버튼 */}
              <svg focusable="false" viewBox="0 0 24 24">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
              </svg>
            </div>
            <div className="logo-name-con">
              {/* 로고 사진, 프로젝트명 기입 */}
              <span className="project-name">달력</span>
            </div>
          </div>
          <div className="today-direction-search-period-con">
            <div className="today-direction-con">
              <div className="navigator-con">
                {/* 위치 버튼 3개 */}
                <div className="navigator">
                  <div className="today-btn">
                    <span className="today-btn-span">오늘</span>
                  </div>
                  <div className="previous-btn">
                    <div className="pre-next-btn-con">
                      <svg focusable="false" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="next-btn">
                    <div className="pre-next-btn-con">
                      <svg focusable="false" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="nav-string-con">
                {/* 현재 탐색한 날짜 문자열 표시 */}
                <div className="nav-string">
                  <div className="years-month-string">2021년 5월</div>
                </div>
              </div>
            </div>
            <div className="search-period-con">
              <div className="search-period-con-1">
                <div className="search-btn">
                  {/* 검색버튼 */}
                  <svg
                    focusable="false"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                  </svg>
                </div>
                <div className="period-select">
                  <div className="period-select-con">
                    {/* 일간 주간 월간 선택 */}
                    <span className="period-string">주</span>
                    {/* <div className="period-select-btn"> */}
                    <svg focusable="false" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M7,10L12,15L17,10H7Z" />
                    </svg>
                    {/* </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="profile-con">
            <div className="profile">
              <svg viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Nav;