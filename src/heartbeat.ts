import { Store } from "./Store";

// temp initialize heartbeat

const s = new Store();
const getSong = s.getSong
const getTrack = s.getTrack
const getPart = s.getPart

export {
  getSong,
  getTrack,
  getPart,
}