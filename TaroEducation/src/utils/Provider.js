import axios from 'taro-axios';
import csrf from './crsf';

class BaseProvider {
  constructor() {
    this.CSRFToken = csrf.getCSRFToken();
  }

  get provider() {
    let axiosNc = axios.create({
      withCredentials: true,
      headers: {
        "Authorization": this.CSRFToken,
      },
    });
    axiosNc.interceptors.response.use(response => {
      return response;
    }, error => {
      if (!error.response || !error.response.data.detail) {
        return Promise.reject(error);
      }
      if (error.response.status === 403 && error.response.data.detail === "身份认证信息未提供。") {
        // AuthStore.reset();
        // AuthStore.openLoginModal();
      }

      return Promise.reject(error);
    });

    return axiosNc;
  }

  refreshCSRFToken = (data) => {
    if (data) {
      this.CSRFToken = 'JWT '+ data.token;
      console.log(this.CSRFToken);
      csrf.setCookie('csrftoken', this.CSRFToken);
      return;
    }
  };

  sendDataByBeacon = (url, data = null) => {
    /*
     * 1.When you want to use this method, turn off API's CSRF check and ensure user safety
     * 2.The type of param data must be ArrayBufferView, Blob, DOMString, or FormData, or null
     */
    navigator.sendBeacon(url, data);
  };

  getInstance() {
    // for compatibility
    try {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn('The method "getInstance()" is deprecated, access the method by BaseProvider directly');
      }
    } catch (e) {

    }

    return this.provider;
  }

  request(...args) {
    return this.provider.request(...args);
  }

  get(...args) {
    return this.provider.get(...args);
  }

  post(...args) {
    return this.provider.post(...args);
  }

  put(...args) {
    return this.provider.put(...args);
  }

  patch(...args) {
    return this.provider.patch(...args);
  }

  delete(...args) {
    return this.provider.delete(...args);
  }

  options(...args) {
    return this.provider.options(...args);
  }

  head(...args) {
    return this.provider.head(...args);
  }
}

let baseProvider = new BaseProvider();

export default baseProvider;
