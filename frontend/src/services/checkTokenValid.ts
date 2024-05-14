export interface ICheckTokenValidResponse {
  tokenValid: boolean;
  userId: number;
}

function delayedObject(): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        err: false,
        msg: "Hllo",
        data: {
          tokenValid: true,
          userId: 1,
        },
      });
    }, 3000); // 3 seconds delay
  });
}

async function checkTokenValid() {
  let response = await delayedObject();
  if (response.err) {
    throw Error("Something went wrong");
  }

  return response.data as ICheckTokenValidResponse;
}

export default checkTokenValid;
