import axios from "axios";

type PayloadType = {
  accId: string;
  accServer: string;
  code?: string;
};

export async function sendVerificationCode(payload: PayloadType) {
  const response = await axios.post(`${process.env.BE_API_URL}/mlbbacc/vc`, {
    id: payload.accId,
    server: payload.accServer,
  });
  return response;
}

export async function bindAcc(payload: PayloadType) {
  const response = await axios.post<{
    message: string;
    data: {
      id: string;
      server: string;
      nickname: string;
    };
  }>(`${process.env.BE_API_URL}/mlbbacc/sync`, {
    id: payload.accId,
    server: payload.accServer,
    code: payload.code,
  });
  return {
    message: response.data.message,
    data: response.data.data,
  };
}

import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
