const { faker } = require('@faker-js/faker');
const fs = require('fs');
const data = require('./data')


const generateFakePost = () => {
    // Read the JSON file
    const jsonData = data;
    const randomIndex = Math.floor(Math.random() * jsonData.length);
    randomPost = jsonData[randomIndex];
    console.log(randomIndex);

    return {
        category: randomPost.category,
        title: randomPost.title,
        content: randomPost.content,
        createdAt: faker.date.past(),
    };
};


// Example usage:
//console.log(generateFakePost());

module.exports = { generateFakePost };