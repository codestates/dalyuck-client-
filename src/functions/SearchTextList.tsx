// TS Code
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../reducers/index";
import "../style/_Search.scss";
import { DateTime } from "luxon";

const SearchTextList = () => {
  const state = useSelector((state: RootState) => state);
  const {
    userReducer: { data },
  } = state;

  let week = new Array("일", "월", "화", "수", "목", "금", "토");

  let today = new Date().getDay();
  let todayLabel = week[today];

  return (
    <div className="search-list-form">
      {data.event.length > 0 ? (
        data.event.map((ele: any) => {
          return (
            <div key={ele.id}>
              <div className="search-list">
                <div className="search-month">
                  {DateTime.fromISO(ele.startTime).toFormat("d")}
                </div>
                <div className="search-year">
                  {DateTime.fromISO(ele.startTime).toFormat(
                    `yyyy년 MM월, ${todayLabel}`
                  )}
                </div>
                <div
                  className="search-color"
                  style={{ backgroundColor: ele.colour }}
                ></div>
                <div className="search-time">
                  {DateTime.fromISO(ele.startTime).toFormat("t")} ~
                  {DateTime.fromISO(ele.endTime).toFormat("t")}
                </div>
                <div className="search-name">{ele.eventName}</div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="search-list-form">
          <div className="search-list" style={{ border: "none" }}>
            <div className="search-result">검색결과가 없습니다.</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchTextList;
