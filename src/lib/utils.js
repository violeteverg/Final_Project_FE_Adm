import { clsx } from "clsx";
import { jwtVerify } from "jose";
import Cookies from "js-cookie";

import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getJwtSecretKey = () => {
  const secret = import.meta.env.VITE_JWT_SECRET;

  if (!secret || secret.length === 0) {
    throw new Error("The environment variable JWT_SECRET_KEY is not set");
  }
  return secret;
};

export const checkToken = async () => {
  const token = Cookies.get("token");

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey())
    );

    return payload.name;
  } catch (error) {
    console.error("Gagal memverifikasi token:", error);
    return null;
  }
};

export const getUser = async () => {
  try {
    const token = Cookies.get("token");

    if (!token) {
      return null;
    }

    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey())
    );
    console.log(payload, "ini payloadnya");
    return {
      id: payload?.id,
      userName: payload?.userValue?.userName,
      email: payload?.userValue?.email,
    };
  } catch (error) {
    console.error("Failed to get user:", error);
    return null;
  }
};
