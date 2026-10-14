import { Router } from "express";
import { login, signup } from "./auth.service.js";
import { successResponse } from "../../common/response/success.response.js";
import * as z from "zod";
import { BadRequestException } from "../../common/exeption/app.exception.js";
export const authController = Router();

authController.post("/signup", async (req, res) => {
  try {
    const result = await signup(req.body);
    successResponse({ res, statusCode: 201, msg: "created", data: result });
  } catch (error) {
    res.status(400).json(error.stack);
  }
});

authController.post("/login", async (req, res) => {
  const loginSchema = z
    .object({
      email: z.email(),
      password: z.string(),
      confirmPassword: z.string(),
      phone : z.e164(),
      gender : z.enum(["male" , "female"]).optional(),
      roles : z.literal(["user" , "admin" , "superAdmin"]).optional(),
      age : z.coerce.number().optional() ,
      flag: z.stringbool({
        truthy: ["ahmed", "ali"],
        falsy: ["sara", "hagar"],
      }),
    })

  const validatedData = loginSchema.safeParse(req.body);

  if (!validatedData.success) {
    throw BadRequestException({
      errMsg: "validationErr",
      cause: {
        issues: validatedData.error.issues,
      },
    });
  }

  req.validatedData = validatedData.data;

  console.log(req.validatedData);

  const result = await login(req.validatedData);
  successResponse({ res, statusCode: 201, msg: "created", data: result });
});
