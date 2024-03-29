const AWS = require('aws-sdk');
require('dotenv').config(); 

// lines 5-9 connects to AWS - this user has access to do everything - not recommendable 
AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})
// creating the client that will connect to the document store for DynamoDB
// specifying the table name we want to connect to on line 13
const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "harrypotter-api";

const getCharacters = async () => {
  const params = {
    TableName: TABLE_NAME
  };
  // scan will look for characters 
  const characters = await dynamoClient.scan(params).promise();
  console.log(characters)
  return characters
}
// passing in a character and using our client to call a put request
// this will either add a new character to the database or 
// update an existing character depending on the id
const addOrUpdateCharacter = async (character) => {
  const params = {
    TABLE_NAME,
    ITEM: character
  }
  return await dynamoClient.put(params).promise();
}
getCharacters();


