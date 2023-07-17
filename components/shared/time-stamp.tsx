import { useState } from "react";

interface TimeStampProps {
  date: string[];
  time: string[];
}

function countLeapYears(month: number, year: number) {
  let years = year;

  if (month <= 2) {
    years--;
  }

  return (
    Math.floor(years / 4) - Math.floor(years / 100) + Math.floor(years / 400)
  );
}

function getDifference(date: string[], currDate: string[]) {
  const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  let n1 = Number(date[0]) * 365 + Number(date[2]);

  for (let i = 0; i < Number(date[1]) - 1; i++) {
    n1 += monthDays[i];
  }

  n1 += countLeapYears(Number(date[1]), Number(date[0]));

  let n2 = Number(currDate[2]) * 365 + Number(currDate[1]);
  for (let i = 0; i < Number(currDate[0]) - 1; i++) {
    n2 += monthDays[i];
  }
  n2 += countLeapYears(Number(currDate[0]), Number(currDate[2]));
  return n2 - n1;
}

// Main function which finds difference
function getTimeDiff(
  hour1: string,
  hour2: string,
  minute1: string,
  minute2: string
) {
  // console.log(hour1, hour2, minute1, minute2);
  let hourDiff = Number(hour2) - Number(hour1) - 1;

  // difference between minutes
  let minDiff = Number(minute2) + (60 - Number(minute1));

  if (minDiff >= 60) {
    hourDiff++;
    minDiff = minDiff - 60;
  }

  return [hourDiff, minDiff];
}

function addOrSubtractOneDay(date: string[], diff: number) {
  const year = Number(date[0]);
  const month = Number(date[1]);
  const day = Number(date[2]);

  const newDate = new Date(year, month - 1, day + diff);
  const currDate = [
    newDate.getFullYear().toString(),
    (newDate.getMonth() + 1).toString(),
    newDate.getDate().toString(),
  ];

  // console.log("new", currDate);

  return currDate;
}

function handleTimeZone(time: string[], region: string) {
  if (region[3] === "+") {
    const diff = region.split("+");
    const result = Number(time[0]) + Number(diff[1]) / 100;

    if (result >= 24) {
      return [String(result - 24), "+"];
    }
    return [String(result), "no change"];
  }

  const diff = region.split("-");
  const result = Number(time[0]) - Number(diff[1]) / 100;

  if (result < 0) {
    return [String(result + 24), "-"];
  }
  return [String(result), "no change"];
}

const TimeStamp: React.FC<TimeStampProps> = ({ date, time }) => {
  const newDate = new Date();
  const currDate = [
    (newDate.getMonth() + 1).toString(),
    newDate.getDate().toString(),
    newDate.getFullYear().toString(),
  ];
  const currTime = new Date().toTimeString().split(":");
  const region = currTime[2].split(" ");
  const temp = handleTimeZone(time, region[1]);
  time[0] = temp[0];

  if (temp[1] === "+") {
    date = addOrSubtractOneDay(date, 1);
  } else if (temp[1] === "-") {
    date = addOrSubtractOneDay(date, -1);
  }

  const diff = getDifference(date, currDate);

  if (diff === 0) {
    const timeDiff = getTimeDiff(time[0], currTime[0], time[1], currTime[1]);

    return (
      <div>
        <p className="text-xs mt-2 truncate leading-5 text-gray-500 ease-in-out">
          {timeDiff[0] > 0 &&
            `${timeDiff[0]} ${timeDiff[0] === 1 ? "hour" : "hours"} ago`}
          {timeDiff[0] === 0 && timeDiff[1] === 0 && "Recently"}
          {timeDiff[0] === 0 &&
            timeDiff[1] !== 0 &&
            `${timeDiff[1]} ${timeDiff[1] === 1 ? "minute" : "minutes"} ago`}
        </p>
      </div>
    );
  }

  if (diff === 1) {
    return (
      <div>
        <p className="text-xs mt-2 truncate leading-5 text-gray-500 ease-in-out">
          {Number(currTime[0]) + 24 - Number(time[0]) > 24
            ? "1 day ago"
            : `${Number(currTime[0]) + 24 - Number(time[0])} ${
                Number(currTime[0]) - Number(time[0]) === 1 ? "hour" : "hours"
              } ago`}
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-xs mt-2 truncate leading-5 text-gray-500 ease-in-out">
        {diff >= 365 &&
          `${Math.floor(diff / 365)} ${
            Math.floor(diff / 365) === 1 ? "year" : "years"
          } ago`}
        {Math.floor(diff * 0.032855) >= 1 &&
          `${Math.floor(diff * 0.032855)} ${
            Math.floor(diff * 0.032855) === 1 ? "month" : "months"
          } ago`}
        {Math.floor(diff * 0.032855) < 1 &&
          `${diff} ${diff === 1 ? "day" : "days"} ago`}
      </p>
    </div>
  );
};

export default TimeStamp;
