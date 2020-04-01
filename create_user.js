import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import {
    success,
    failure
} from "./libs/response-lib";

export async function main(event, context) {
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.user_table,
        Item: {
            userId: uuid.v1(),
            handle: data.handle,
            email: data.email,
            createdAt: Date.now()
        }
    };
    try {
        const result = await dynamoDbLib.call("get", {
            TableName: process.env.user_table,
            Key: {
                handle: data.handle,
            }
        });
        if (result.Item) {
            return failure({
                status: false,
                error: "Already exists."
            });
        }
    } catch (e) {
        return failure({
            status: false,
            method: "get",
            error: e
        });
    }
    try {
        await dynamoDbLib.call("put", params);
        return success(params.Item);
    } catch (e) {
        return failure({
            status: false,
            method: "put",
            error: e
        });
    }
}