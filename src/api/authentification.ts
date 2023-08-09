// GOOGLE
export const getProfile = (access_token: string) => {
  const url = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`;
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  };
  return fetch(url, requestOptions).then((res) => res.json());
};
