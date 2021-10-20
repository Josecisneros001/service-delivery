export const buildWhereClause = (filters: any, params: string[], dbRelations: string[], types: string[]): string => {
    let paramsValues = []
    for (let index = 0; index < params.length; index++) {
            const param = params[index]
            const dbRelation = dbRelations[index]
            if ((param in filters)) {
                if (types[index] == "string") {
                        paramsValues.push(`${dbRelation} LIKE '%${filters[param]}%'`)
                } else if (types[index] == "number_min") {
                        paramsValues.push(`${dbRelation} >= '${filters[param]}'`);
                } else if (types[index] == "number_max") {
                        paramsValues.push(`${dbRelation} <= '${filters[param]}'`);
                } else if (types[index] == "array") {
                        let tmpOrArray = []
                        for (const filer_value of filters[param]) {
                            tmpOrArray.push(`${dbRelation} = '${filer_value}'`);
                        }
                        paramsValues.push(`(${tmpOrArray.join(' OR ')})`);
                } else {
                        paramsValues.push(`${dbRelation} = '${filters[param]}'`)
                }
            }
    }
    if (paramsValues.length == 0) {
            return "";
    }
    return `where ${paramsValues.join(" AND ")}`;
}

export const buildInsertInto = (params: any, dbTableName: string, fields: string[], timestamp: string): string => {
        let paramsValues : string[] = [];
        for (let indexRP in fields) {
                const requiredParam = fields[indexRP];
                if (!(requiredParam in params)) {
                    return "";
                }
                paramsValues.push(`'${params[requiredParam] || ''}'`);
        }
        fields.push("registered_on");
        paramsValues.push(`'${timestamp}'`);
        return `INSERT INTO ${dbTableName} (${fields.join(',')}) VALUES (${paramsValues.join(',')})`;
}
