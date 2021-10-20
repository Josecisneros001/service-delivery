export {};
import type { CustomResponse } from "../interfaces/CustomResponse";
import type { ServiceCategories as Model } from "../models/ServiceCategories";
import { failResponse, successReponse } from  '../scripts/response';
import { executeQuery } from '../db/mysql';
import { buildWhereClause, buildInsertInto } from '../scripts/buildQueryHelpers'

const dbTableName = "service_categories";

export const ServiceCategories = {
    /**
     * Function that creates a record.
     */
    create: async function (params: Model): Promise<CustomResponse> {
        const fields = ["name", "description"];
        const timestamp = new Date().toISOString();
        const query = buildInsertInto(params, dbTableName, fields, timestamp);
        if (query.length == 0) {
            return failResponse("Missing Parameters", false);
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
        const params = ["id"];
        const dbRelations = [`${dbTableName}.id`];
        const types = ["number"];
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
        return this.getAll({ id: id })
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
