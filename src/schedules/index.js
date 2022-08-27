const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

module.exports.getBtechSemesterSchedule = async (event) => {
  const params = {
    TableName: process.env.EXAM_SCHEDULER_TABLE,
    Key: {
      PK: `type#schedule`,
      SK: `sem#btech#${event.queryStringParameters.dept}#${event.queryStringParameters.sem}`,
    }
  }

  try {
    const { Item } = await docClient.get(params).promise();
    if (Item) {
      const { date,session,courseCode,subjectName } = Item;
      return { date,session,courseCode,subjectName };
    } else {
      return 'not able to get data'
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}; 

module.exports.getBeSemesterSchedule = async (event) => {
  const params = {
    TableName: process.env.EXAM_SCHEDULER_TABLE,
    Key: {
      PK: `type#schedule`,
      SK: `sem#be#${event.queryStringParameters.dept}#${event.queryStringParameters.sem}`,
    }
  }

  try {
    const { Item } = await docClient.get(params).promise();
    if (Item) {
      const { date,session,courseCode,subjectName } = Item;
      return { date,session,courseCode,subjectName };
    } else {
      return 'not able to get data'
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}; 

module.exports.getBtechLabSchedule = async (event) => {
  const params = {
    TableName: process.env.EXAM_SCHEDULER_TABLE,
    Key: {
      PK: `type#schedule`,
      SK: `lab#btech#${event.queryStringParameters.dept}#${event.queryStringParameters.sem}`,
    }
  }

  try {
    const { Item } = await docClient.get(params).promise();
    if (Item) {
      const { date,session,courseCode,subjectName } = Item;
      return { date,session,courseCode,subjectName };
    } else {
      return 'not able to get data'
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}; 

module.exports.getBeLabSchedule = async (event) => {
  const params = {
    TableName: process.env.EXAM_SCHEDULER_TABLE,
    Key: {
      PK: `type#schedule`,
      SK: `lab#be#${event.queryStringParameters.dept}#${event.queryStringParameters.sem}`,
    }
  }

  try {
    const { Item } = await docClient.get(params).promise();
    if (Item) {
      const { date,session,courseCode,subjectName } = Item;
      return { date,session,courseCode,subjectName };
    } else {
      return 'not able to get data'
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}; 


module.exports.postSubjectToSchedule = async (event) => {
  const body = JSON.parse(event.body)
  const params = {
    TableName: process.env.EXAM_SCHEDULER_TABLE,
    Item: {
      PK: "type#schedule",
      SK: `sem#${event.queryStringParameters.branch}#${event.queryStringParameters.dept}#${event.queryStringParameters.sem}`,
      courseCode: body.courseCode,
      subjectName: body.subjectName,
      date: body.date,
      session: body.session
      //subjectSet: body.subjectSet//{"19HSS001":{"S":"Computer Networks"},"19HSS003":{"S":"Computer Architecture"},"19HSS002":{"S":"Cryptography"}}

    }
  }
  try {
    await docClient.put(params).promise();
    return 'New subject added to semester schedule';
  } catch (err) {
    return err;
  }
};

module.exports.postLabToSchedule = async (event) => {
  const body = JSON.parse(event.body)
  const params = {
    TableName: process.env.EXAM_SCHEDULER_TABLE,
    Item: {
      PK: "type#schedule",
      SK: `lab#${event.queryStringParameters.branch}#${event.queryStringParameters.dept}#${event.queryStringParameters.sem}`,
      courseCode: body.courseCode,
      subjectName: body.subjectName,
      date: body.date,
      session: body.session
    }
  }
  try {
    await docClient.put(params).promise();
    return 'New lab added to lab schedule';
  } catch (err) {
    return err;
  }
};

module.exports.deleteSemesterSchedule = async (event) => {
  const params = {
    TableName: process.env.EXAM_SCHEDULER_TABLE,
    Key: {
      PK: "type#schedule",
      SK: `sem#${event.queryStringParameters.branch}#${event.queryStringParameters.dept}#${event.queryStringParameters.sem}`,
    }
  }
  try {
    await docClient.delete(params).promise();
    return 'semester schedule deleted successfully';

  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports.deleteLabSchedule = async (event) => {
  const params = {
    TableName: process.env.EXAM_SCHEDULER_TABLE,
    Key: {
      PK: "type#schedule",
      SK: `lab#${event.queryStringParameters.branch}#${event.queryStringParameters.dept}#${event.queryStringParameters.sem}`,
    }
  }
  try {
    await docClient.delete(params).promise();
    return 'lab schedule deleted successfully';

  } catch (error) {
    console.log(error);
    return error;
  }
};


