const getCookie = (name) => {
  if (typeof document === "undefined") {
    return null;
  }
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = $.trim(cookies[i]);
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + "=")) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }

  return cookieValue;
};

const setCookie = (name, value) => {
  if (value) {
    const days = 1; //定义一天
    const exp = new Date();
    exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
    // 写入Cookie, toGMTString将时间转换成字符串
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
  }
};

const getCSRFToken = () => getCookie('csrftoken');

const csrf = {
  getCookie,
  setCookie,
  getCSRFToken
};

export const getUnsafeHeaders = () => ({
  "Accept": "application/json",
  "Content-Type": "application/json",
  "X-CSRFToken": csrf.getCSRFToken(),
});

export const getUploadHeaders = () => ({
  "Accept": "application/json",
  "X-CSRFToken": csrf.getCSRFToken(),
});

export default csrf;
