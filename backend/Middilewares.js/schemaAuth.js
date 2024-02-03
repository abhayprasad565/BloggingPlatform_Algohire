const { z } = require('zod');
// user validation
const userSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    userName: z.string(),
    password: z.string(),
});

const validateUser = (user) => {
    try {
        userSchema.parse(user);
        return true;
    }
    catch (err) {
        console.log(err.issues);
        return false;
    }
}
const loginSchema = z.object({
    username: z.string(),
    password: z.string(),
})
const loginSchemaValidate = (user) => {
    try {
        loginSchema.parse(user);
        return true;
    }
    catch (err) {
        console.log(err.issues);
        return false;
    }
}
// post validation

module.exports = { validateUser, loginSchemaValidate }