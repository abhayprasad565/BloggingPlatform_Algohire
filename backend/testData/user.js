
const { faker } = require('@faker-js/faker');
const { POSTS } = require("./posts");

function generateRandomUser() {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        username: faker.internet.userName(),
        password: "1234",
    };
}
console.log(generateRandomUser());

module.exports = { generateRandomUser };