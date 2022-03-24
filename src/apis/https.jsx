import axios from './Axios';

class Http {

  baseUri = null;

  http = axios();

  constructor(baseUri) {
    this.baseUri = baseUri; 
  }

   
  setBaseUri = baseUri => {
    this.baseUri = baseUri;
  };

  find = async (params, query = {}) => {
    return await this.http.get(`/${this.baseUri}`, params, query);
  };

   
  findById = async (id, params) => {
    return await this.http.get(`/${this.baseUri}/${id}`, params);
  };

  deleteById = async id => {
    return await this.http.delete(`/${this.baseUri}`);
  };

  create = async data => {
    return await this.http.post(`/${this.baseUri}`);
  };

  update = async (id, data) => {
    return await this.http.patch(`/${this.baseUri}`, data);
  };
  updateById = async (id, data, useNewBaseUrl = '') => {
    return await this.http.put(`/${this.baseUri}`, data, {}, useNewBaseUrl);
  };
   
}

export default Http;
