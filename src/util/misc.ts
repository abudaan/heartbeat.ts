const mPow = Math.pow;
const mRound = Math.round;
const mFloor = Math.floor;
const mRandom = Math.random;

const getNiceTime = (millis: number): {
  hour: number,
  minute: number,
  second: number,
  millisecond: number,
  timeAsString: string,
  timeAsArray: [number, number, number, number],
} => {
  let timeAsString = '';

  const seconds = millis / 1000; // → millis to seconds
  const h = floor(seconds / (60 * 60), 0);
  const m = floor((seconds % (60 * 60)) / 60, 0);
  const s = floor(seconds % (60), 0);
  const ms = round((seconds - (h * 3600) - (m * 60) - s) * 1000, 0);

  timeAsString += h + ':';
  timeAsString += m < 10 ? '0' + m : m;
  timeAsString += ':';
  timeAsString += s < 10 ? '0' + s : s;
  timeAsString += ':';
  timeAsString += ms === 0 ? '000' : ms < 10 ? '00' + ms : ms < 100 ? '0' + ms : ms;

  //console.log(h, m, s, ms);

  return {
    hour: h,
    minute: m,
    second: s,
    millisecond: ms,
    timeAsString: timeAsString,
    timeAsArray: [h, m, s, ms]
  };
}

const round = (value: number, decimals: number): number => {
  if (typeof decimals === 'undefined' || decimals <= 0) {
    return mRound(value);
  }
  var p = mPow(10, decimals);
  //console.log(p, decimals)
  return mRound(value * p) / p;
}


const floor = (value: number, decimals: number): number => {
  if (typeof decimals === 'undefined' || decimals <= 0) {
    return mFloor(value);
  }
  var p = mPow(10, decimals);
  //console.log(p,decimals)
  return mFloor(value * p) / p;
}

export {
  getNiceTime,
  floor,
  round,
}