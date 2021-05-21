import Joi from "joi";

import { isHyperlinks } from "./isHyperlinks.js";

export const validateCreatComment = (req, res, next) => {
  const commentSchema = Joi.object({
    name: Joi.string()
      .required()
      .min(3)
      .max(450)
      .trim()
      .regex(/^[A-Za-z0-9_]+$/) //contain a-z, A-Z, 0-9, and underscore
      .messages({
        "string.base": `"name" should be a type of 'text'`,
        "string.min": `"name" should have a minimum length of {#limit}`,
        "string.empty": `"name" cannot be an empty field`,
        "string.pattern.base": `"name" should only contain a-z, A-Z, 0-9, and underscore _`,
        "any.required": `"name" is a required`,
      }),
    comment: Joi.string().min(3).max(450).required().messages({
      "string.base": `"comment" should be a type of 'text'`,
      "string.min": `"comment" should have a minimum length of {#limit}`,
      "string.empty": `"comment" cannot be an empty field`,
      "string.pattern.base": `"comment" should not contain hyperlinks`,
      "any.required": `"comment" is a required`,
    }),
  });

  const { error } = commentSchema.validate(req.body);
  const valid = error == null;

  if (!valid) {
    const { details } = error;
    const message = details.map((i) => i.message).join(",");
    const capitalizeMessage = (
      message && message[1].toUpperCase() + message.slice(2)
    ).replace(/['"]/g, "");

    return res.status(422).json(capitalizeMessage);
  } else if (isHyperlinks(req.body.comment)) {
    return res
      .status(422)
      .json("Comment should not contain hyperlinks (ftp|http|https)");
  }

  next();
};
