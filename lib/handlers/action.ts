"use server";

import { ZodError, ZodSchema } from "zod";
import { UnauthorizedError, ValidationError } from "../http-errors";
import { Session } from "next-auth";
import { auth } from "@/auth";
import dbConnect from "../mongoose";

type ActionOptions<T> = {
  params?: T;
  scheme?: ZodSchema<T>;
  authorize?: boolean;
};

async function action<T>({ params, scheme, authorize }: ActionOptions<T>) {
  if (params && scheme) {
    try {
      scheme.parse(params);
    } catch (error) {
      if (error instanceof ZodError) {
        return new ValidationError(
          error.flatten().fieldErrors as Record<string, string[]>
        );
      } else {
        return new Error("Scheme validation error");
      }
    }
  }

  let session: Session | null = null;
  if (authorize) {
    session = await auth();
    if (!session) {
      return new UnauthorizedError();
    }
  }

  await dbConnect();

  return { params, session };
}

//checking wheather schema and params are provided and validated
//checking wheather the use is authorized
//connecting to the database

export default action;
