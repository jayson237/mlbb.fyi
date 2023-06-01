import axios from "axios";

type PayloadType = {
  accId: string;
  accServer: string;
  code?: string;
};

// export async function getData(url, payload) {
//   try {
    
//   } catch (error) {
    
//   }
// }

export async function sendVerificationCode(payload: PayloadType) {
  const response = await axios.post(`${process.env.BE_API_URL}/mlbbacc/vc`, {
    id: payload.accId,
    server: payload.accServer,
  }, {
    headers: {
      "Authorization": `Bearer ${process.env.BE_API_SECRET}`,
    }
  });
  console.log(response);
  return response;
}

export async function bindAcc(payload: PayloadType) {
  const res = await fetch(`${process.env.BE_API_URL}/mlbbacc/sync`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.BE_API_SECRET}`,
    },
    body: JSON.stringify({
      id: payload.accId,
      server: payload.accServer,
      code: payload.code,
    }),
  });
  const response: {
    message: string;
    data: {
      id: string;
      server: string;
      nickname: string;
    };
  } = await res.json();
  console.log(response);

  // const response = await axios.post<{
  //   message: string;
  //   data: {
  //     id: string;
  //     server: string;
  //     nickname: string;
  //   };
  // }>(`${process.env.BE_API_URL}/mlbbacc/sync`, {
  //   id: payload.accId,
  //   server: payload.accServer,
  //   code: payload.code,
  // });

  return {
    message: response.message,
    data: response.data,
  };
}

import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
