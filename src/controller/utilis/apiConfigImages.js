// apiConfigImages.js
class ApiConfigImages {
    constructor() {
      this.baseURL = "http://192.168.1.6:4000/";
    }
  
    getBaseURL() {
      return this.baseURL;
    }
    
  }
  
  const apiConfigImages = new ApiConfigImages();
  export default apiConfigImages;
  