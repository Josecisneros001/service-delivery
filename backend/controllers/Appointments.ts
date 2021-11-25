export {};
import type { CustomResponse } from "../interfaces/CustomResponse";
import type { Appointments as Model } from "../models/Appointments";
import { failResponse, successReponse } from  '../scripts/response';
import { executeQuery } from '../db/mysql';
import { buildWhereClause, buildInsertInto, buildUpdate, checkIfExists } from '../scripts/buildQueryHelpers'

const dbTableName = "appointments";

export const Appointments = {
    /**
     * Function that creates a record.
     */
    create: async function (params: Model): Promise<CustomResponse> {
        const fields = ["user_id", "service_id", "timestamp", "duration", "address_info", "location_lat", "location_lng"];
        const timestamp = new Date().toISOString();
        const query = buildInsertInto(params, dbTableName, fields, timestamp);
        if (query.length == 0) {
            return failResponse("Missing Parameters", false);
        }
        const checkIfExistsFields = ["user_id", "service_id"];
        const checkIfExistsControllers = ["Users", "Services"];
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
    /**Controller
     * Function that get list of records.
     */
    getAll: async function (filters: Model): Promise<CustomResponse> {
        const params = ["id", "user_id", "service_id", "from_timestamp", "to_timestamp" ];
        const dbRelations = [`${dbTableName}.id`, `${dbTableName}.user_id`, `${dbTableName}.service_id`, `${dbTableName}.timestamp`, `${dbTableName}.timestamp`];
        const types = ["number", "number", "number", "number_min", "number_max"];
        let joinClause = '';
        if (filters["include_info"]) {
            joinClause=`LEFT JOIN users_left as users ON ${dbTableName}.user_id = users.usr_id `
            joinClause+=`LEFT JOIN services_left as services ON ${dbTableName}.service_id = services.srv_id `
            joinClause+=`LEFT JOIN service_categories_left as service_categories ON services.srv_category_id = service_categories.ctg_id `
        }
        const whereClause = buildWhereClause(filters, params, dbRelations, types);
        const query = `SELECT * from ${dbTableName} ${joinClause} ${whereClause}`;
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
