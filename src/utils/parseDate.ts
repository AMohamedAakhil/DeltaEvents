
type DateRange = {
  start: Date;
  end: Date;
};

export function parseDateRange(dateRangeStr: string): DateRange {
  const format1 = /^([A-Za-z]+) (\d{2}) - (\d{2}), (\d{4})$/;
  const format2 = /^([A-Za-z]+) (\d{2}), (\d{4}) - ([A-Za-z]+) (\d{2}), (\d{4})$/;
  const format3 = /^([A-Za-z]+) (\d{2}) - ([A-Za-z]+) (\d{2}), (\d{4})$/;

  if (format1.test(dateRangeStr)) {
    const [, month, startDay, endDay, year] = format1.exec(dateRangeStr)!;
    return {
      start: new Date(`${month} ${startDay}, ${year}`),
      end: new Date(`${month} ${endDay}, ${year}`),
    };
  } else if (format2.test(dateRangeStr)) {
    const [, startMonth, startDay, startYear, endMonth, endDay, endYear] = format2.exec(dateRangeStr)!;
    return {
      start: new Date(`${startMonth} ${startDay}, ${startYear}`),
      end: new Date(`${endMonth} ${endDay}, ${endYear}`),
    };
  } else if (format3.test(dateRangeStr)) {
    const [, startMonth, startDay, endMonth, endDay, year] = format3.exec(dateRangeStr)!;
    return {
      start: new Date(`${startMonth} ${startDay}, ${year}`),
      end: new Date(`${endMonth} ${endDay}, ${year}`),
    };
  } else {
    throw new Error(`${dateRangeStr} is not a format that is known.`);
  }
}

