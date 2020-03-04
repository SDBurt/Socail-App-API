import * as dynamoDbLib from "./libs/dynamodb-lib";
import {
    success,
    failure
} from "./libs/response-lib";

export async function main(event, context) {
    const params = {
        TableName: process.env.posts_table,
        KeyConditionExpression: "userHandle = :userHandle",
        ExpressionAttributeValues: {
            ":userHandle": event.pathParameters.userHandle
        }
    };
    try {
        const result = await dynamoDbLib.call("query", params);
        return success(result.Items);
    } catch (e) {
        return failure({
            status: false,
            error: e
        });
    }
}