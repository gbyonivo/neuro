import * as yup from "yup";

export const GET_GAME_CARDS_VALIDATION_SCHEMA = yup
  .object({
    limit: yup.number().required(),
  })
  .required();
