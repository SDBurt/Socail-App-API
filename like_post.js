import * as dynamoDbLib from "./libs/dynamodb-lib";
import {
  success,
  failure
} from "./libs/response-lib";

export async function main(event, context) {
  const get_params = {
    TableName: process.env.likes_table,
    Key: {
      postId: event.pathParameters.postId,
      userHandle: event.pathParameters.userHandle
    }
  };
  try {
    const result = await dynamoDbLib.call("get", get_params);
    if (!result.Item) {
      try {
        const post_params = {
          TableName: process.env.likes_table,
          Item: {
            postId: event.pathParameters.postId,
            userHandle: event.pathParameters.userHandle
          }
        };
        await dynamoDbLib.call("put", post_params);
        return success(post_params.Item);
      } catch (e) {
        return failure({
          status: false
        });
      }
    }
    return failure({
      status: false,
      error: "Already liked."
    });
  } catch (e) {
    return failure({
      status: false
    });
  }
}