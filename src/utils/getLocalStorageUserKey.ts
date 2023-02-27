export const getLocalStorageUserKey = () => {
  return process.env.REACT_APP_ENV === "development" ? "ssvpUserQA" : "ssvpUser";
}