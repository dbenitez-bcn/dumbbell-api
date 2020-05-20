import { createConnection, ConnectionOptions } from "typeorm";
import { testConnection } from "../utils/testConnection";
import { defaultConnection } from "../utils/defaultConnection";
import { ciConnection } from "../utils/ciConnection";

export const connectionLoader = async (appEnv: string | undefined) => {
  let connection: ConnectionOptions;
  if (appEnv === 'test' || appEnv === undefined) {
    connection = testConnection;
  } else if (appEnv === 'ci') {
    connection = ciConnection;
  } else {
    connection = defaultConnection
  }

  return await createConnection(connection);
}