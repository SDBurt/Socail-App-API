
import * as dynamoDbLib from "./libs/dynamodb-lib";
import {
    success,
    failure
} from "./libs/response-lib";

export async function main(event, context) {
    const params = {
        TableName: process.env.user_table,
        Key: {
            handle: event.pathParameters.handle,
            userId: event.requestContext.identity.cognitoIdentityId,
        }
    };

    let userData = {};

    try {
        const result = await dynamoDbLib.call("get", params);
        if (result.Item) {

            userData.credentials = result.Item;

            return success(userData);
        } else {
            return failure({
                status: false,
                error: "Not found."
            });
        }
    } catch (e) {
        return failure({
            status: false,
            error: e
        });
    }
}