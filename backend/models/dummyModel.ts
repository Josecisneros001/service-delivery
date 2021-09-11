export {};
import type { CustomResponse } from "../interfaces/CustomResponse";
import { failResponse, successReponse } from  '../scripts/response';
import { executeQuery } from '../db/mysql';

export const dummyModel = {
    /**
     * Function that creates a record.
     */
    create: async function (): Promise<CustomResponse> {
        return failResponse("Missing Configuration", false);
    },
    /**
     * Function that updates a record.
     */
    update: async function (): Promise<CustomResponse> {
        return failResponse("Missing Configuration", false);
    },
    /**
     * Function that get list of records.
     */
    getAll: async function (): Promise<CustomResponse> {
        return failResponse("Missing Configuration", false);
    },
    /**
     * Function that get a record by id.
     */
    getById: async function (id: number): Promise<CustomResponse> {
        if (!id) {
            return failResponse("Missing Parameters", false);
        }
        return failResponse("Missing Configuration", false);
    },
    /**
     * Function that delete a record by id.
     */
    deleteById: async function (id: number): Promise<CustomResponse> {
        if (!id) {
            return failResponse("Missing Parameters", false);
        }
        return failResponse("Missing Configuration", false);
    },
};
