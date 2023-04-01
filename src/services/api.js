export const BASE_URL = "http://localhost:3000/opsguide";

export async function api(url, params = {}) {
  params = Object.assign(
    {
      mode: "cors",
      cache: "no-cache",
    },
    params
  );

  params.headers = Object.assign(
    {
      "Content-Type": "application/json",
    },
    params.headers
  );

  console.log("before here");
  let response = await fetch(BASE_URL + url, params);
  console.log("HERE");

  let json = (await response.json()) || {};
  if (!response.ok) {
    let errorMessage = json.error || response.status;
    console.log("inside error");
    throw new Error(errorMessage);
  }
  console.log("HERE");

  return json;
}
