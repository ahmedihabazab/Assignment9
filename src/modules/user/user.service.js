import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_EXPIRES,
  REFRESH_TOKEN_EXPIRES,
} from "../../config/config.js";
import { BadRequestException } from "../../common/exeption/app.exception.js";
import { create_Acc_REF_Tokens } from "../../common/security/token.js";

export async function rotateToken(payload) {
  const currentData = Math.ceil(Date.now() / 1000);
  const expirtionDate = payload.iat + ACCESS_TOKEN_EXPIRES;
  if (currentData < expirtionDate) {
    throw BadRequestException("access token not expired");
  }
  return create_Acc_REF_Tokens({ payload: { sub: payload.sub } , refresh_token_expiresIn : REFRESH_TOKEN_EXPIRES - (Math.ceil(Date.now() / 1000) - payload.iat) });
}
