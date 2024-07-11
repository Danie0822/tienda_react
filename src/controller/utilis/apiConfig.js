// apiConfig.js
class ApiConfig {
    constructor() {
      this.baseURL = "http://10.10.0.4:4000/api";
      this.baseURL2 = "http://10.10.0.4:4000/";
    }
  
    getBaseURL() {
      return this.baseURL;
    }

    getBaseURL2() {
      return this.baseURL2;
    }
  
    
  }
  
  const apiConfig = new ApiConfig();
  export default apiConfig;
  