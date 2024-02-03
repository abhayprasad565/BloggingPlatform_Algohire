const { z } = require('zod');
// user validation
const userSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    username: z.string(),
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
const postSchema = z.object({
    author: z.string().optional(),
    _id: z.string().optional(),
    category: z.string().optional(),
    title: z.string(),
    content: z.string(),
});
const validatePost = (post) => {
    try {
        postSchema.parse(post);
        return true;
    }
    catch (err) {
        console.log(err.issues);
        return false;
    }
}

module.exports = { validateUser, loginSchemaValidate, validatePost }