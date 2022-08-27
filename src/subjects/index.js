const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

module.exports.getBtechSubjects = async (event) => {
    const params = {
      TableName: process.env.EXAM_SCHEDULER_TABLE,
  
      Key: {
        PK: `type#btech#${event.queryStringParameters.dept}#subject`,
        SK: `sem#${event.queryStringParameters.sem}`,
      }
    }
  
    try {
      const { Item } = await docClient.get(params).promise();
      if (Item) {
        const { subjectSet, labSet, subjects, labs } = Item;
        return { subjectSet, labSet, subjects, labs };
      } else {
        return 'not able to get data'
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  
  module.exports.getBeSubjects = async (event) => {
    const params = {
      TableName: process.env.EXAM_SCHEDULER_TABLE,
  
      Key: {
        PK: `type#be#${event.queryStringParameters.dept}#subject`,
        SK: `sem#${event.queryStringParameters.sem}`,
      }
    }
  
    try {
      const { Item } = await docClient.get(params).promise();
      if (Item) {
        const { subjectSet, labSet, subjects, labs } = Item;
        return { subjectSet, labSet, subjects, labs };
      } else {
        return 'not able to get data'
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  