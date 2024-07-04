import { axiosAuth } from "../../axios/http";

export interface ICheckTokenValidResponse {
  tokenValid: boolean;
  userData: {
    id: number;
    name: string;
    email: string;
  };
}

async function checkTokenValid() {
  let response = await axiosAuth.post("/api/user/checkTokenValid");
  if (response.data.error) {
    throw Error("Something went wrong");
  }

  console.log(response.data);

  return response.data.data as ICheckTokenValidResponse;
}

export default checkTokenValid;
