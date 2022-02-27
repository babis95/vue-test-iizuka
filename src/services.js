import axios from "axios";
import { handleError } from "./ErrorService.js";
import { DateTime } from "luxon";

// Common headers for requests
function headers() {
  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2dWV0ZXN0IiwiaHR0cHM6XC9cL2FwaS5jYXNlbWFuYWdlci5jby51a1wvdGVuYW50IjoiaHR0cHM6XC9cL25nby50cmFpbmluZy5nb3RvamkubmV0OjQ0M1wvIiwiaHR0cHM6XC9cL2FwaS5jYXNlbWFuYWdlci5jby51a1wvYXBpLXVybCI6IlwvYXBpIiwiaXNzIjoiaHR0cHM6XC9cL25nby50cmFpbmluZy5nb3RvamkubmV0OjQ0M1wvIiwibmFtZSI6InZ1ZXRlc3QiLCJleHAiOjE2NDU5ODc5MzUsImlhdCI6MTY0NTk4NzAzNX0.-YpDQ-NmFtvRp-hHNJ9Iy62Wvgw7lFOi8P9LrAGFNt0",
      // "Bearer ",
    },
  };
  return headers;
}
// Call GET request. Pass URL
export async function GETCallHelper(url) {
  try {
    const response = await axios.get(url, headers());
    return response;
  } catch (err) {
    handleError(err);
  }
}
// Send POST request. Pass, URL, DATA
export async function POSTCallHelper(url, data) {
  try {
    const response = await axios.post(url, data, headers());
    return response;
  } catch (err) {
    handleError(err);
  }
}

export function convertTime(time) {
  return DateTime.fromISO(time).toFormat("dd/LL/yyyy");
}
