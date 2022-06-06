const { dateRules } = require('../rules.js');

const dateValid = (givenDate) => {
  const date = givenDate.split('-');
  if (date.length !== 3) { return false }

  const year = date[0];
  const yearValid = Number(year) && year.length === 4 ? true : false;
  const month = Number(date[1]);
  const monthValid = month && month > 0 && month <= 12;
  const day = Number(date[2]);
  const dayValid = day && day > 0 && day <= dateRules[month];
  return yearValid && monthValid && dayValid ? true : false;
}

const timeValid = (givenTime) => {
  const time = givenTime.split(':');
  if (time.length !== 3) { return false }

  const hour = Number(time[0]);
  const hourValid = hour && hour >= 0 && hour < 24;
  const minute = Number(time[1]);
  const minuteValid = minute && minute >= 0 && minute < 60;
  const second = Number(time[2]);
  const secondValid = second && second >= 0 && second < 60;
  return hourValid && minuteValid && secondValid ? true : false;
}

module.exports = {
  dateValid: dateValid,
  timeValid: timeValid
}
