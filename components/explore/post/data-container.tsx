interface DateContainerProps {
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
  let hourDiff = Number(hour2) - Number(hour1);

  // difference between minutes
  let minDiff = Number(minute2) + (60 - Number(minute1));

  if (minDiff >= 60) {
    hourDiff++;
    minDiff = minDiff - 60;
  }

  return [hourDiff, minDiff];
}

const DateContainer: React.FC<DateContainerProps> = ({ date, time }) => {
  time[0] = String(Number(time[0]) + 7);

  const currDate = new Date().toLocaleDateString().split("/");
  const currTime = new Date().toTimeString().split(":");

  const diff = getDifference(date, currDate);

  if (diff === 0) {
    const timeDiff = getTimeDiff(currTime[0], time[0], currTime[1], time[1]);
    return (
      <div>
        <p className="text-xs mt-2 truncate leading-5 text-gray-500 ease-in-out">
          {timeDiff[0] > 0 &&
            `${timeDiff[0]} ${timeDiff[0] === 1 ? "hour" : "hours"} ago by`}
          {timeDiff[0] === 0 &&
            `${timeDiff[1]} ${timeDiff[1] === 1 ? "minute" : "minutes"} ago by`}
          {timeDiff[0] === 0 && timeDiff[1] === 0 && "Recently by"}
        </p>
      </div>
    );
  }

  if (diff === 1) {
    return (
      <div>
        <p className="text-xs mt-2 truncate leading-5 text-gray-500 ease-in-out">
          {Number(currTime[0]) + 24 - Number(time[0]) > 24
            ? "1 day ago by"
            : `${Number(currTime[0]) + 24 - Number(time[0])} ${
                Number(currTime[0]) - Number(time[0]) === 1 ? "hour" : "hours"
              } ago by`}
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
          } ago by`}
        {Math.floor(diff * 0.032855) >= 1 &&
          `${Math.floor(diff * 0.032855)} ${
            Math.floor(diff * 0.032855) === 1 ? "month" : "months"
          } ago by`}
        {Math.floor(diff * 0.032855) < 1 &&
          `${diff} ${diff === 1 ? "day" : "days"} ago by`}
      </p>
    </div>
  );
};

export default DateContainer;
