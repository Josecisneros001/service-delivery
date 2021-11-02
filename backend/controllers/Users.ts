export {};
import type { CustomResponse } from "../interfaces/CustomResponse";
import type { Users as Model } from "../models/Users";
import { failResponse, successReponse } from  '../scripts/response';
import { executeQuery } from '../db/mysql';
import { buildWhereClause, buildInsertInto, buildUpdate } from '../scripts/buildQueryHelpers';
import { encryptPassword, passwordMatch } from '../scripts/handlePasswords';

const dbTableName = "users";

export const Users = {
    /**
     * Function that creates a record.
     */
    create: async function (params: Model): Promise<CustomResponse> {
        const fields = ["first_name", "last_name", "password", "email", "recovery_email", "phone_number", "alt_phone_number", "is_service_provider"];
        const timestamp = new Date().toISOString();
        if (params.password) {
            params.password = await encryptPassword(params.password);
        }
        const query = buildInsertInto(params, dbTableName, fields, timestamp);
        if (query.length == 0) {
            return failResponse("Missing Parameters", false);
        }
        const result = await executeQuery(query);
        if (result.status == 200) {
            delete params.password;
            params.id = result.data.insertId;
            params.registered_on = timestamp;
            return successReponse("Success", params);
        }
        return failResponse("Bad Request", result);
    },
    /**
     * Function that get list of records.
     */
     getAll: async function (filters: Model, excludePassword: Boolean = true): Promise<CustomResponse> {
        const params = ["id", "is_service_provider", "email"];
        const dbRelations = [`${dbTableName}.id`, `${dbTableName}.is_service_provider`, `${dbTableName}.email`];
        const types = ["number", "number", "string"];
        let dbTableName_ = dbTableName;
        if (excludePassword) {
            dbTableName_ = "users_no_password as users";
        }
        const whereClause = buildWhereClause(filters, params, dbRelations, types);
        const query = `SELECT * from ${dbTableName_} ${whereClause}`;
        return executeQuery(query);
    },
    /**
     * Function that update a record.
    */
    update: async function (id: number, filters: Model): Promise<CustomResponse> {
        const params = ["first_name", "last_name", "email", "recovery_email", "phone_number", "alt_phone_number", "is_service_provider", "registred_on"];
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
     * Function that get a record by id.
     */
    getById: async function (id: number): Promise<CustomResponse> {
        if (!id) {
            return failResponse("Missing Parameters", false);
        }
        return this.getAll({ id: id });
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
            return successReponse("Success", result.data.affectedRows > 0);
        }
        return failResponse("Bad Request", result);
    },
    /**
     * Function that handle login.
     */
    handleLogin: async function (params: Model): Promise<CustomResponse> {
        if (!params.email || !params.password) {
            return failResponse("Missing Parameters", false);
        }
        const userRequest = (await this.getAll(params, /*excludePassword =*/false));
        if (userRequest.status == 200 && userRequest.data.length > 0) {
            const userData = userRequest.data[0] as Model;
            if (userData.password && await passwordMatch(params.password, userData.password)){
                return successReponse("Success", true);
            } else {
                return successReponse("Success", false);
            }
        }
        return failResponse("Bad Request", false);
    },
};
