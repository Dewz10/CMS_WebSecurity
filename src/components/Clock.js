import React, { useEffect, useCallback, useState, memo } from "react";

const getDays = (time) => Math.floor(time / (1000 * 60 * 60 * 24));
const getHours = (time) => Math.floor((time / (1000 * 60 * 60)) % 24);
const getMinutes = (time) => Math.floor((time / 1000 / 60) % 60);
const getSeconds = (time) => Math.floor((time / 1000) % 60);

const timeSuffix = {
  0: "วัน",
  1: "ชั่วโมง",
  2: "นาที",
  3: "วินาที"
};

const Clock = ({ deadline }) => {
  const [time, setTime] = useState([0, 0, 0, 0]);

  const leading0 = (num) => {
    return num < 10 ? "0" + num : num;
  };

  const getTimeUntil = useCallback((deadline) => {
    const time = new Date(deadline).getTime() - new Date().getTime();
    if (time < 0) {
      setTime([
        leading0(getDays(0)),
        leading0(getHours(0)),
        leading0(getMinutes(0)),
        leading0(getSeconds(0))
      ]);
    } else {
      setTime([
        leading0(getDays(time)),
        leading0(getHours(time)),
        leading0(getMinutes(time)),
        leading0(getSeconds(time))
      ]);
    }
  }, []);

  useEffect(() => {
    const timerRef = setInterval(() => getTimeUntil(deadline), 1000);

    return () => {
      clearInterval(timerRef);
      getTimeUntil(deadline);
    };
  }, [deadline, getTimeUntil]);

  return (
    <div className="Clock-container" style={{display: "flex", justifyContent: "center", }}>
      {time.map((timeStamp, index) => {
        return (
          <div style={{margin: "10px", paddingRight: "20px", fontSize: "45px"}}>
            <div className="card" key={Math.random()}>
              {timeStamp}
            </div>
            <span style={{fontSize: "25px"}}>{timeSuffix[index]}</span>
          </div>
        );
      })}
    </div>
  );
};

export default memo(Clock);
