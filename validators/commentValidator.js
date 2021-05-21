import Joi from "joi";

export const validateCreatComment = (req, res, next) => {
  const commentSchema = Joi.object({
    name: Joi.string()
      .required()
      .min(3)
      .max(450)
      .regex(/^[A-Za-z0-9_]+$/)
      .messages({
        "string.base": `"name" should be a type of 'text'`,
        "string.min": `"name" should have a minimum length of {#limit}`,
        "string.empty": `"name" cannot be an empty field`,
        "string.pattern.base": `"name" must contain only Latin letters and numbers`,
        "any.required": `"name" is a required`,
      }),
    comment: Joi.string().min(3).max(450).required(),
  }).with("name", "comment");

  const { error } = commentSchema.validate(req.body);
  const valid = error == null;

  if (!valid) {
    const customError =
      "Invalid request data. Please review request and try again.";
    const { details } = error;
    const message = details.map((i) => i.message).join(",");
    const capitalizeMessage =
      message && message[1].toUpperCase() + message.slice(2);

    return res
      .status(422)
      .json(message ? capitalizeMessage.replace(/['"]/g, "") : customError);
  }

  next();
};
