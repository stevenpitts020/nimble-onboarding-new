import { log, config } from "../services";

let timeout: NodeJS.Timeout;

const setExpiryTime = (ttl: number) => {
  const now = new Date();
  if (timeout) {
    clearTimeout(timeout);
  }
  const newTtl = (now.getTime() + ttl).toString();
  timeout = setTimeout(() => {
    window.sessionStorage.removeItem("onboarding-session");
    document.location.assign(
      `/${window.location.pathname.split("/")[1]}/onboarding`
    );
  }, ttl);
  return window.sessionStorage.setItem("onboarding-session", newTtl);
};

const getExpiryTime = () => {
  const itemStr = window.sessionStorage.getItem("onboarding-session");
  if (!itemStr) {
    return false;
  }
  const expirationTime = JSON.parse(itemStr);
  return expirationTime;
};

const isExpiryTimeFinished = () => {
  const expirationTime = getExpiryTime();
  const now = new Date();

  // compare the expiry time of the item with the current time
  if (now.getTime() > expirationTime) {
    // If the item is expired, delete the item from storage
    // and return null
    window.sessionStorage.removeItem("onboarding-session");
    return true;
  }
  return false;
};

const clearPersistState = () => {
  window.sessionStorage.clear();
};

const setPersistState = (storageKey: string, state: object): void => {
  setExpiryTime(720000); // 720 seconds = 10 minutes
  if (config.env !== "test") {
    window.sessionStorage.setItem(storageKey, JSON.stringify(state));
  }
};

const getPersistState = (storageKey: string): any => {
  if (isExpiryTimeFinished()) {
    log.info("expired", `getPersistState ${storageKey}`);
    return null;
  }

  const savedState = window.sessionStorage.getItem(storageKey);
  try {
    if (!savedState) {
      log.info("nothing in storage", `getPersistState ${storageKey}`);
      return null;
    }

    return JSON.parse(savedState ?? "{}");
  } catch (e) {
    log.error("Error loading state", `getPersistState ${storageKey}`);
    return null;
  }
};

export {
  getPersistState,
  setPersistState,
  clearPersistState,
  isExpiryTimeFinished,
  getExpiryTime,
};
