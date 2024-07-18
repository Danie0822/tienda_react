class ApiConfig {
  constructor() {
    this.baseURL = "http://192.168.137.1:4000/";
  } 

  get baseURL() {
    return this._baseURL;
  }

  get apiURL() {
    return `${this.baseURL}api`;
  }

  get portURL() {
    return `${this.baseURL}`;
  }
}

const apiConfig = new ApiConfig();
export default apiConfig;
