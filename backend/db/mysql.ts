import type { MysqlError, PoolConnection } from 'mysql';
import type { CustomResponse } from "../interfaces/CustomResponse";
import { failResponse, successReponse } from  '../scripts/response';

import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
  timezone: 'UTC',
  dateStrings: [
    'DATE',
    'DATETIME'
  ],
  connectionLimit : 100,
  host     : process.env.MYSQL_HOST,
  user     : process.env.MYSQL_USER,
  password : process.env.MYSQL_PASSWORD,
  database : process.env.MYSQL_DATABASE
});

/**
 * Function that creates a connection to DB and execute query.
 */
export const executeQuery = (query: string): Promise<CustomResponse> => {
  return new Promise((resolve, reject) => {
      pool.getConnection(function(err: MysqlError, connection: PoolConnection){
          if(err){
              resolve(failResponse("SQL-ERROR", err));
              if (connection) {
                connection.release();
              }
          }
          if (connection) {
            connection.query( query, (err: MysqlError, result : Object) => {
                err ? resolve(failResponse("SQL-ERROR", err)) : 
                resolve(successReponse("Success", result));
                connection.release();
            });
          }
      });
  });
}
