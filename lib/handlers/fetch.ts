import { ActionResponse } from "@/types/global";
import logger from "../logger";
import handleError from "./error";
import { RequestError } from "../http-errors";

interface FetchOptions extends RequestInit {
  timeOut?: number;
}

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export async function fetchHandlers<T>(
  url: string,
  options: FetchOptions = {}
): Promise<ActionResponse<T>> {
  const {
    timeOut = 5000,
    headers: customHeaders = {},
    ...restOptions
  } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeOut);

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const headers: HeadersInit = {
    ...defaultHeaders,
    ...customHeaders,
  };

  const config: RequestInit = {
    ...restOptions,
    headers,
    signal: controller.signal,
  };

  try {
    const response = await fetch(url, config);
    clearTimeout(id);

    if (!response.ok) {
      throw new RequestError(
        response.status,
        `HTTP Error: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (err) {
    const error = isError(err) ? err : new Error(String(err));
    if (error.name === "AbortError") {
      logger.warn(`${url} request timed out`);
    } else {
      logger.error(`${url} request failed : ${error.message}`);
    }

    return handleError(error) as ActionResponse<T>;
  }
}
