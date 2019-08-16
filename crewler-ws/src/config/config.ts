'use strict';

import { env } from "process";


export const config = {
  // Enable logging only in production and development env as default.
  
  enabled: process.env.LOG_ENABLED || (
    //生产环境不允许打印日志
    ['production','development'].includes(env.NODE_ENV)
  ),
  appLanguage: process.env.appLanguage ||(
    'en'
  ),
  encryptKey: process.env.encryptKey ||(
    '3.14159'
  ),
  encryptPassword:true,
  level: process.env.LOG_LEVEL || (
    env.NODE_ENV === 'production' ? 'info' : 'debug'
  ),
};
