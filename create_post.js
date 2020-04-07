import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import {
  success,
  failure
} from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.posts_table,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      postId: uuid.v1(),
      userHandle: data.userHandle,
      userImage: data.userImage,
      content: data.content,
      likeCount: 0,
      commentCount: 0,
      createdAt: (new Date()).toISOString()
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({
      status: false
    });
  }
}