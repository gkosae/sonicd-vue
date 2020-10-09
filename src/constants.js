const DEV_BACKEND_HOST = "localhost:3000";
const PROD_BACKEND_HOST = "sonicd-api.georgeosae.com";

const DEV_API_URL = `http://${DEV_BACKEND_HOST}`;
const PROD_API_URL = `https://${PROD_BACKEND_HOST}`;

const DEV_WEBSOCKET_URL = `ws://${DEV_BACKEND_HOST}/websocket`;
const PROD_WEBSOCKET_URL = `wss://${PROD_BACKEND_HOST}/websocket`;

let API_URL = null;
let WEBSOCKET_URL = null;

if (
  process.env.NODE_ENV == "development" &&
  process.env.VUE_APP_BACKEND == "local"
) {
  API_URL = DEV_API_URL;
  WEBSOCKET_URL = DEV_WEBSOCKET_URL;
} else {
  API_URL = PROD_API_URL;
  WEBSOCKET_URL = PROD_WEBSOCKET_URL;
}

export { API_URL, WEBSOCKET_URL };
