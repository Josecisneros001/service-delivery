export {};
import type { CustomResponse } from "../interfaces/CustomResponse";
import type { WorkHours as Model, WorkHoursMultiple as ModelMultiple } from "../models/WorkHours";
import { failResponse, successReponse } from  '../scripts/response';
import { executeQuery } from '../db/mysql';
import { buildWhereClause, buildInsertInto, checkIfExists } from '../scripts/buildQueryHelpers'

const dbTableName = "work_hours";

// TODO: change user_id -> service_id

export const WorkHours = {
    /**
     * Function that creates a record.
     */
     create: async function (params: Model): Promise<CustomResponse> {
        const fields = ["user_id", "day", "hour", "duration"];
        const timestamp = new Date().toISOString();
        const query = buildInsertInto(params, dbTableName, fields, timestamp);
        if (query.length == 0) {
            return failResponse("Missing Parameters", false);
        }
        const checkIfExistsFields = ["user_id"];
        const checkIfExistsControllers = ["Users"];
        const checkIfExistsResponse = await checkIfExists(checkIfExistsFields, checkIfExistsControllers, params);
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
    /**
     * Function that creates all records necessary for a user.
     */
     createMultiple: async function (params: ModelMultiple): Promise<CustomResponse> {
        if (!params.data) {
            return failResponse("Missing Parameters", false);
        }
        const fields = ["user_id", "day", "hour", "duration"];
        const timestamp = new Date().toISOString();
        let queries = [] as Array<string>;
        let checkedUserIds = [] as Array<number>;
        for (const record of params.data) {
            const query = buildInsertInto(record, dbTableName, fields.slice(0), timestamp);
            if (query.length == 0) {
                return failResponse("Missing Parameters", false);
            }
            if (!checkedUserIds.includes(record.user_id || 0)) {
                const checkIfExistsFields = ["user_id"];
                const checkIfExistsControllers = ["Users"];
                const checkIfExistsResponse = await checkIfExists(checkIfExistsFields, checkIfExistsControllers, record);
                if(checkIfExistsResponse.status != 200) {
                    return checkIfExistsResponse;
                }
                checkedUserIds.push(record.user_id || 0);
            }
            queries.push(query);
        }
        for(const user_id of checkedUserIds) {
            queries.unshift(`DELETE from ${dbTableName} where user_id = '${user_id}'`);
        }
        for(const query of queries) {
            const result = await executeQuery(query);
            if (result.status != 200) {
                return failResponse("Bad Request", result);
            }
            
        }
        return successReponse("Success", params);
    },
    /**Controller
     * Function that get list of records.
     */
    getAll: async function (filters: Model): Promise<CustomResponse> {
        const params = ["id", "user_id", "day"];
        const dbRelations = [`${dbTableName}.id`, `${dbTableName}.user_id`, `${dbTableName}.day`];
        const types = ["number", "number", "number"];
        const whereClause = buildWhereClause(filters, params, dbRelations, types);
        const query = `SELECT * from ${dbTableName} ${whereClause}`;
        return executeQuery(query);
    },
    /**
     * Function that get a record by id.
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
