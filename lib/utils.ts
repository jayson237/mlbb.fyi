import axios from "axios";

type PayloadType = {
  accId: string;
  accServer: string;
  code?: string;
};

export const getFetcher = async (url: string) => {
  return await fetch(url, {
    method: "GET",
  }).then((res) => res.json());
};

export const postFetcher = async (data: string) => {
  const fields = {
    data: data[1],
  };

  return await fetch(data[0], {
    method: "POST",
    body: JSON.stringify(fields),
  }).then((res) => res.json());
};

export async function sendVerificationCode(payload: PayloadType) {
  const response = await axios.post(
    `${process.env.BE_API_URL}/mlbbacc/vc`,
    {
      id: payload.accId,
      server: payload.accServer,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.BE_API_SECRET}`,
      },
    }
  );
  // console.log(response);
  return response;
}

export async function bindAcc(payload: PayloadType) {
  const res = await fetch(`${process.env.BE_API_URL}/mlbbacc/sync`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.BE_API_SECRET}`,
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
  // console.log(response);

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
