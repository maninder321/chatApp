import { axiosAuth } from "../../axios/http";

export interface ICheckTokenValidResponse {
  tokenValid: boolean;
  userData: {
    id: number;
    name: string;
    email: string;
  };
}

// function delayedObject(): Promise<any> {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({
//         err: false,
//         msg: "Hllo",
//         data: {
//           tokenValid: false,
//           userId: 1,
//         },
//       });
//     }, 3000); // 3 seconds delay
//   });
// }

async function checkTokenValid() {
  let response = await axiosAuth.post("/api/user/checkTokenValid");
  if (response.data.error) {
    throw Error("Something went wrong");
  }

  return response.data as ICheckTokenValidResponse;
}

export default checkTokenValid;
