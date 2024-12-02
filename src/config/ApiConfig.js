const HOST_IP = "192.168.88.158"

const API_BASE_URL = `http://${HOST_IP}:3000`;
// export const WEBSOCKET_URL = `ws://localhost:8000/`;
export const WEBSOCKET_URL = `ws://${HOST_IP}:8000/`;
// const API_BASE_URL = "https://60c5-171-243-48-19.ngrok-free.app";

export const IMAGE_URL = `${API_BASE_URL}/images/`;
export const PAYMENT_URL = `${API_BASE_URL}/api/payments`;

export const LOGIN_API = `${API_BASE_URL}/api/users/login`;
export const REGISTER_API = `${API_BASE_URL}/api/users/register`;
export const REFRESH_TOKEN_API = `${API_BASE_URL}/api/users/refresh-token`;

export const USER_API = `${API_BASE_URL}/api/users/`;


export const TYPES_API = `${API_BASE_URL}/api/types`;

export const PRODUCTS_API = `${API_BASE_URL}/api/products`;
export const PRODUCTSBYTYPE_API = `${API_BASE_URL}/api/products/type`;
export const PRODUCT_IMAGE_API = `${API_BASE_URL}/api/uploads`;

export const CARTS_API = `${API_BASE_URL}/api/carts`;


