import * as dynamoDbLib from "./libs/dynamodb-lib";
import {
  success,
  failure
} from "./libs/response-lib";

export async function main(event, context) {
  const params = {
    TableName: process.env.posts_table,
    Key: {
      postId: event.pathParameters.postId,
      userHandle: event.pathParameters.userHandle,
      userImage: event.pathParameters.userImage,
      content: event.pathParameters.content,
      likeCount: event.pathParameters.likeCount,
      commentCount: event.pathParameters.commentCount,
      createdAt: event.pathParameters.createdAt
    }
  };

  try {
    const result = await dynamoDbLib.call("get", params);
    if (result.Item) {
      return success(result.Item);
    } else {
      return failure({
        status: false,
        error: "Not found."
      });
    }
  } catch (e) {
    return failure({
      status: false
    });
  }
}