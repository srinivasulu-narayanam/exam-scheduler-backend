const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

module.exports.getLookup = async (event) => {
  const params = {
    TableName: process.env.EXAM_SCHEDULER_TABLE,

    Key: {
      PK: "type#lookup",
      SK: event.pathParameters.id,
    }
  }

  try {
    const { Item } = await docClient.get(params).promise();
    if (Item) {
      const { branchSet, departmentSet, examTypeSet } = Item;
      return { branchSet, departmentSet, examTypeSet };
    } else {
      return 'not able to get data'
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};
