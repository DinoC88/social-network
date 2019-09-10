import { createPool, Pool } from 'mysql2/promise';
import keys from './config/keys';
export async function connect(): Promise<Pool> {
  const connection = await createPool(keys.mysqlInfo);
  return connection;
}
