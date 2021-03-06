export {};
import type { CustomResponse } from "../interfaces/CustomResponse";
import type { Services as Model } from "../models/Services";
import { failResponse, successReponse } from  '../scripts/response';
import { executeQuery } from '../db/mysql';
import { buildWhereClause, buildInsertInto, buildUpdate, checkIfExists } from '../scripts/buildQueryHelpers'

const dbTableName = "services";

export const Services = {
    /**
     * Function that creates a record.
     */
    create: async function (params: Model): Promise<CustomResponse> {
        const fields = ["user_id", "category_id", "name", "description", "location_lat", "location_lng", "location_radius"];
        const timestamp = new Date().toISOString();
        const query = buildInsertInto(params, dbTableName, fields, timestamp);
        if (query.length == 0) {
            return failResponse("Missing Parameters", false);
        }
        const checkIfExistsFields = ["user_id", "category_id"];
        const checkIfExistsControllers = ["Users", "ServiceCategories"];
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
        const params = ["id", "category_id", "user_id"];
        const dbRelations = [`${dbTableName}.id`, `${dbTableName}.category_id`, `${dbTableName}.user_id`];
        const types = ["number", "number"];
        const conditions = [];
        if (filters["location_lat"] && filters["location_lng"] && filters["location_radius"]) {
            conditions.push(`doIntersect(${filters["location_lat"]}, ${filters["location_lng"]}, ${filters["location_radius"]}, location_lat, location_lng, location_radius) = 1`);
        }
        let joinClause = '';
        if (filters["include_info"]) {
            joinClause=`LEFT JOIN users_left as users ON ${dbTableName}.user_id = users.usr_id `
            joinClause+=`LEFT JOIN (SELECT service_id, GROUP_CONCAT(photo_url) photo_urls, GROUP_CONCAT(description) descriptions FROM service_photos GROUP BY service_id) service_photos ON ${dbTableName}.id = service_photos.service_id`;
        }
        const whereClause = buildWhereClause(filters, params, dbRelations, types, conditions);
        const query = `SELECT * from ${dbTableName} ${joinClause} ${whereClause}`;

        return executeQuery(query);
    },
    /**
     * Function that update a record.
    */
    update: async function (id: number, filters: Model): Promise<CustomResponse> {
        const params = ["name", "description", "location_lat", "location_lng", "location_radius", "is_service_fee_per_hour"];
        const query = buildUpdate(id, filters, params, dbTableName);
        if (query.length == 0) {
            return failResponse("Bad Request", false);
        }
        const result = await executeQuery(query);
        if (result.status == 200) {
            return this.getById(id);
        }
        return failResponse("Missing Parameters", false);
    },
    /**
     * Function that get a record by id if exists.
     */
    getById: async function (id: number): Promise<CustomResponse> {
        if (!id) {
            return failResponse("Missing Parameters", false);
        }
        const response = await this.getAll({ id: id, include_info: 1  });
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
