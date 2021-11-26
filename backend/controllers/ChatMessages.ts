export {};
import type { CustomResponse } from "../interfaces/CustomResponse";
import type { ChatMessages as Model } from "../models/ChatMessages";
import { failResponse, successReponse } from  '../scripts/response';
import { executeQuery } from '../db/mysql';
import { buildWhereClause, buildInsertInto, checkIfExists } from '../scripts/buildQueryHelpers'

const dbTableName = "chat_message";

export const ChatMessages = {
    /**
     * Function that creates a record.
     */
    create: async function (params: Model): Promise<CustomResponse> {
        const fields = ["user_sender_id", "user_receiver_id", "message", "attachment_url"];
        const optional = [false, false, true, true];
        const timestamp = new Date().toISOString();
        const query = buildInsertInto(params, dbTableName, fields, timestamp, optional);
        if (query.length == 0) {
            return failResponse("Missing Parameters", false);
        }
        const checkIfExistsFields = ["user_sender_id", "user_receiver_id"];
        const checkIfExistsControllers = ["Users", "Users"];
        const checkIfExistsResponse = await checkIfExists(checkIfExistsFields, checkIfExistsControllers, params, optional);
        if(checkIfExistsResponse.status != 200) {
            return checkIfExistsResponse;
        }
        const result = await executeQuery(query);
        if (result.status == 200) {
            params.id = result.data.insertId;
            params.registered_on = timestamp;
            return successReponse("Success", params);
        }
        return failResponse("Bad Request", result);
    },
    /**Controller
     * Function that get list of records.
     */
    getAll: async function (filters: Model): Promise<CustomResponse> {
        const params = ["id", "user_sender_id", "user_receiver_id"];
        const dbRelations = [`${dbTableName}.id`, `${dbTableName}.user_id`, `${dbTableName}.service_id`];
        const types = ["number", "number", "number"];
        const conditions = [];
        if (filters["user_first_id"]) {
            conditions.push(`(user_sender_id = ${filters["user_first_id"]} OR user_receiver_id = ${filters["user_first_id"]})`);
        }
        if (filters["user_second_id"]) {
            conditions.push(`(user_sender_id = ${filters["user_second_id"]} OR user_receiver_id = ${filters["user_second_id"]})`);
        }
        if (filters["lastMessages"] && filters["user_first_id"]) {
            const user_id = filters["user_first_id"];
            const query = `SELECT a.*, d.id as user_id, d.first_name, d.last_name, d.email, d.profile_picture
                FROM ${dbTableName} a
                INNER JOIN (
                    SELECT other_user, MAX(registered_on) registered_on
                    FROM (
                        SELECT *, IF(user_sender_id = ${user_id}, user_receiver_id, user_sender_id) as other_user
                        from ${dbTableName}
                        WHERE user_sender_id = ${user_id} OR user_receiver_id = ${user_id}
                    ) c
                    GROUP BY other_user
                ) b ON IF(a.user_sender_id = ${user_id}, a.user_receiver_id, a.user_sender_id) = b.other_user AND a.registered_on = b.registered_on
                LEFT JOIN (
                    SELECT * from users
                ) d ON d.id = IF(a.user_sender_id = ${user_id}, a.user_receiver_id, a.user_sender_id)
                WHERE user_sender_id = ${user_id} OR user_receiver_id = ${user_id};`
            return executeQuery(query);
        }
        const whereClause = buildWhereClause(filters, params, dbRelations, types, conditions);
        let limitStatement = '';
        if (filters["offset"] && filters["limit"]) {
            limitStatement = `LIMIT ${filters["limit"]} OFFSET ${filters["offset"]}`;
        }
        const query = `SELECT * from ${dbTableName} ${whereClause} ${limitStatement}`;
        return executeQuery(query);
    },
    /**
     * Function that get a record by id if exists.
     */
    getById: async function (id: number): Promise<CustomResponse> {
        if (!id) {
            return failResponse("Missing Parameters", false);
        }
        const response = await this.getAll({ id: id });
        if (response.data.length == 0) {
            return failResponse("Record doesn't exists", false);
        }
        return successReponse("Record exists", response.data[0]);
    },
    /**
     * Function that delete a record by id.
     */
    deleteById: async function (id: number): Promise<CustomResponse> {
        if (!id) {
            return failResponse("Missing Parameters", false);
        }
        const query = `DELETE from ${dbTableName} where id = '${id}'`;
        const result = await executeQuery(query);
        if (result.status == 200) {
            return successReponse("Success", false);
        }
        return failResponse("Bad Request", result);
    },
};
