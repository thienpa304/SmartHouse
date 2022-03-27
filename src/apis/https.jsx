import axios from './Axios';

class Http {

  baseUri = null;
  subUri = null;

  http = axios();

  constructor(baseUri) {
    this.baseUri = baseUri; 
  }

   
  setBaseUri = baseUri => {
    this.baseUri = baseUri;
  };
  setSubUri = subUri => {
    this.subUri = subUri;
  };
  find = async (params) => {
    return await this.http.get(`/${this.baseUri||''}`, params);
  };

   
  findById = async (id, params) => {
    return await this.http.get(`/${this.baseUri}/${id}`, params);
  };

  deleteById = async id => {
    return await this.http.delete(`/${this.baseUri}`);
  };

  create = async data => {
    return await this.http.post(`/${this.baseUri}/${this.subUri||''}`,data);
  };

  update = async (id, data) => {
    return await this.http.patch(`/${this.baseUri}`, data);
  };
  updateById = async (id, data, useNewBaseUrl = '') => {
    return await this.http.put(`/${this.baseUri}`, data, {}, useNewBaseUrl);
  };
   
}

export default Http;
