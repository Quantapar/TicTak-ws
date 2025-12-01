const z = require("zod");

const UserInputSchema = z.object({
  username: z.string(),
  password: z.string(),
});

module.exports = UserInputSchema;
