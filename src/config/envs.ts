import 'dotenv/config'
import { get } from 'env-var'

export const envs = {
  PORT: get('PORT').required().asPortNumber(),

  MONGO_URL: get('MONGO_URL').required().asString(),
  MONOGO_DB_NAME: get('MONOGO_DB_NAME').required().asString(),

  JWT_SEED: get('JWT_SEED').required().asString(),
}
