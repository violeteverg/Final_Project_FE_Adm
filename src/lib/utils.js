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

export function convertArrayOfObjectsToCSV(array) {
  if (array.length === 0) return "";

  let result = "";
  const columnDelimiter = ",";
  const lineDelimiter = "\n";
  const keys = Object.keys(array[0]);

  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  array.forEach((item) => {
    let ctr = 0;
    keys.forEach((key) => {
      if (ctr > 0) result += columnDelimiter;

      let value = item[key];
      if (typeof value === "object" && value !== null) {
        // Handle nested objects (like User)
        value = JSON.stringify(value);
      }
      result += value;

      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
}

export function downloadCSV(array) {
  const link = document.createElement("a");
  let csv = convertArrayOfObjectsToCSV(array);
  if (csv == null) return;

  const filename = "order_export.csv";

  if (!csv.match(/^data:text\/csv/i)) {
    csv = `data:text/csv;charset=utf-8,${csv}`;
  }

  link.setAttribute("href", encodeURI(csv));
  link.setAttribute("download", filename);
  link.click();
}
export function formatDate(isoDate) {
  return new Date(isoDate).toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
