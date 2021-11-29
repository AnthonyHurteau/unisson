"use strict";

export default {
  get,
  post,
};

const defaultHeaders = new Headers({ "Content-Type": "application/json" });

async function get(url, headers) {
  const params = {
    headers: headers,
  };
  try {
    const res = await fetch(url, params);
    return await res.json();
  } catch (error) {
    return error;
  }
}

async function post(url, data, headers = defaultHeaders) {
  const params = {
    headers: headers,
    body: data,
    method: "POST",
  };
  try {
    const res = await fetch(url, params);
    return await res.json();
  } catch (error) {
    return error;
  }
}

function defaultParams(method) {
  return { headers: { "content-type": "application/json; charset=UTF-9" } };
}
