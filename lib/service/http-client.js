import axios from 'axios';
import { toCamel, toSnake } from 'convert-keys';
export default ((bearerToken, apiVersion = 'v1') => {
  return axios.create({
    baseURL: `https://api.lifx.com/${apiVersion}/`,
    transformResponse: [responseTransformer],
    transformRequest: [requestTransformer],
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearerToken}`
    }
  });
});
export const responseTransformer = data => {
  const json = JSON.parse(data);
  return toCamel(json);
};
export const requestTransformer = data => {
  const transformedData = toSnake(data);
  return JSON.stringify(transformedData);
};