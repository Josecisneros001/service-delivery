export {};
import type { CustomResponse } from "../interfaces/CustomResponse";
import type { ServicePhotos as Model } from "../models/ServicePhotos";
import { failResponse, successReponse } from  '../scripts/response';
import { executeQuery } from '../db/mysql';
import { buildWhereClause, buildInsertInto } from '../scripts/buildQueryHelpers'

const dbTableName = "service_photos";

export const ServicePhotos = {
    /**
     * Function that creates a record.
     */
    create: async function (params: Model): Promise<CustomResponse> {
        params.description = params.description || '';
        const fields = ["service_id", "description", "photo_url"];
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
    /**
     * Function that get list of records.
     */
    getAll: async function (filters: Model): Promise<CustomResponse> {
        const params = ["id", "service_id"];
        const dbRelations = [`${dbTableName}.id`, `${dbTableName}.service_id`];
        const types = ["number", "number"];
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
