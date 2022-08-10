export function get_time_diff(datetime) {
  var date1 = new Date(datetime);
  var date2 = new Date(Date.now());

  var diff = date2.getTime() - date1.getTime();

  let msec = diff;
  const day = Math.floor(msec / 1000 / 60 / (60 * 24));
  msec -= day * 1000 * 60 * 60 * 24;
  const hh = Math.floor(msec / 1000 / 60 / 60);
  msec -= hh * 1000 * 60 * 60;
  const mm = Math.floor(msec / 1000 / 60);
  msec -= mm * 1000 * 60;
  const ss = Math.floor(msec / 1000);
  msec -= ss * 1000;

  //   return { day, hh, mm, ss };

  let result;

  if (day) {
    day === 1 ? (result = `${day} day ago`) : (result = `${day} days ago`);
  } else if (hh) {
    hh === 1 ? (result = `${hh} hour ago`) : (result = `${hh} hours ago`);
  } else if (mm) {
    mm === 1 ? (result = `${mm} minute ago`) : (result = `${mm} minutes ago`);
  } else if (ss) {
    ss === 1 ? (result = `${ss} second ago`) : (result = `${ss} seconds ago`);
  }

  return result;
}
