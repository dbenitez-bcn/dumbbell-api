import { createConnection, ConnectionOptions } from "typeorm";
import { testConnection } from "../utils/testConnection";
import { defaultConnection } from "../utils/defaultConnection";

export const connectionLoader = async (appEnv: string | undefined) => {
  let connection: ConnectionOptions;
  if (appEnv === 'test' || appEnv === undefined) {
    connection = testConnection;
  } else {
    connection = defaultConnection
  }

  return await createConnection(connection);
}