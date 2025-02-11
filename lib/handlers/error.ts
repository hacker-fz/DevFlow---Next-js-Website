import { NextResponse } from "next/server";
import { RequestError, ValidationError } from "../http-errors";
import { ZodError } from "zod";
import logger from "../logger";

export type ResponseType = "api" | "server";

const formatResponse = (
  ResponseType: ResponseType,
  status: number,
  message: string,
  errors?: Record<string, string[]> | undefined
) => {
  const responseContent = {
    success: false,
    error: {
      message,
      details: errors,
    },
  };

  return ResponseType === "api"
    ? NextResponse.json(responseContent, { status })
    : { status, ...responseContent };
};

const handleError = (error: unknown, ResponseType: ResponseType = "server") => {
  if (error instanceof RequestError) {
    logger.error(
      { err: error },
      `${ResponseType.toUpperCase()} Error: ${error.message}`
    );
    return formatResponse(
      ResponseType,
      error.statusCode,
      error.message,
      error.errors
    );
  }

  if (error instanceof ZodError) {
    const validationError = new ValidationError(
      error.flatten().fieldErrors as Record<string, string[]>
    );

    logger.error(
      { err: validationError },
      `Validation Error: ${validationError.message}`
    );

    return formatResponse(
      ResponseType,
      validationError.statusCode,
      validationError.message,
      validationError.errors
    );
  }

  if (error instanceof Error) {
    logger.error(error.message);
    return formatResponse(ResponseType, 500, error.message);
  }

  logger.error({ err: error }, "Something went wrong");
  return formatResponse(ResponseType, 500, "Something went wrong");
};

export default handleError;
