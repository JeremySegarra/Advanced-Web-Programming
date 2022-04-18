//This is the root of my API
const API_URL = "http://localhost:3001/api/";
//last 3 are optional parameters
export function api(
  url: string,
  body?: any,
  method?: string,
  headers?: HeadersInit
) {
  let options: RequestInit = {};

  //means ?? OR
  //this is when we are sending a body
  if (body) {
    options = {
      method: method ?? "POST",
      cache: "no-cache", //only important if your doing a POST
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
  }

  //now we pass options to the fetch function
  return fetch(API_URL + url, options).then((response) => response.json());
}
