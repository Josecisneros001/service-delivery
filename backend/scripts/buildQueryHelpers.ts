const initOptional = (optional: boolean[], fields: string[]) => {
	if (optional.length != 0) {
		return;
	}
	for(const _ in fields) {
		optional.push(false);
	}
};

export const buildWhereClause = (filters: any, params: string[], dbRelations: string[], types: string[], conditions: string[] = []): string => {
	for (let index = 0; index < params.length; index++) {
		const param = params[index]
		const dbRelation = dbRelations[index]
		if ((param in filters)) {
			if (types[index] == "string") {
				conditions.push(`${dbRelation} LIKE '%${filters[param]}%'`)
			} else if (types[index] == "number_min") {
				conditions.push(`${dbRelation} >= '${filters[param]}'`);
			} else if (types[index] == "number_max") {
				conditions.push(`${dbRelation} <= '${filters[param]}'`);
			} else if (types[index] == "array") {
				let tmpOrArray = []
				for (const filer_value of filters[param]) {
					tmpOrArray.push(`${dbRelation} = '${filer_value}'`);
				}
				conditions.push(`(${tmpOrArray.join(' OR ')})`);
			} else {
				conditions.push(`${dbRelation} = '${filters[param]}'`)
			}
		}
	}
	if (conditions.length == 0) {
		return "";
	}
	return `where ${conditions.join(" AND ")}`;
}

export const buildInsertInto = (params: any, dbTableName: string, fields: string[], timestamp: string, optional: boolean[] = []): string => {
	initOptional(optional, fields);
	let paramsValues : string[] = [];
	for (let indexRP in fields) {
		const requiredParam = fields[indexRP];
		const isOptional = optional[indexRP];
		if (isOptional && !(requiredParam in params)) {
			params[requiredParam] = 0;
		}
		if (!(requiredParam in params)) {
			return "";
		}
		paramsValues.push(`'${params[requiredParam] || ''}'`);
	}
	fields.push("registered_on");
	paramsValues.push(`'${timestamp}'`);
	return `INSERT INTO ${dbTableName} (${fields.join(',')}) VALUES (${paramsValues.join(',')})`;
}


export const buildUpdate = (id: number, filters: any, fields: string[], dbTableName: string) : string => {
	if (!id) {
		return "";
	}
	let fieldsValues = [] as string[];
	for (let index = 0; index < fields.length; index++) {
		const filter = fields[index];
		if ((filter in filters)) {
			fieldsValues.push(`'${filters[filter]}'`);
		} else {
			fields.splice(index, 1);
			index -= 1;
		}
	}
	if (fieldsValues.length == 0) {
		return "";
	}
	const setClause = fields.map((column, index)=>{
		return `${column} = ${fieldsValues[index]}`;
	});
	return `UPDATE ${dbTableName} SET ${setClause.join(',')} WHERE id = ${id}`;
}

import { ServiceCategories } from "../controllers/ServiceCategories";
import { Users } from "../controllers/Users";
import { Services } from "../controllers/Services";
import { Appointments } from "../controllers/Appointments";
import { CustomResponse } from "../interfaces/CustomResponse";
import { failResponse, successReponse } from "./response";
export const checkIfExists = async (fields: string[], controllers: string[], values: any, optional: boolean[] = []) : Promise<CustomResponse> => {
	initOptional(optional, fields);
	for(const index in fields) {
		const field = fields[index];
		const isOptional = optional[index];
		if (isOptional && values[field] == 0) {
			continue;
		}
		const controller = controllers[index];
		let response;
		switch (controller) {
			case 'Users':
				response = await Users.getById(values[field]);
			break;
			case 'Services':
				response = await Services.getById(values[field]);
			break;
			case 'ServiceCategories':
				response = await ServiceCategories.getById(values[field]);
			break;
			case 'Appointments':
				response = await Appointments.getById(values[field]);
			break;
		}
		if (response?.status != 200) {
			return failResponse(`${field} doesn't exists`, false);
		}
	}
	return successReponse(`All exists`, true);
}
