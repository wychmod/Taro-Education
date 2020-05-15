import Taro from "@tarojs/taro";
import { observable, action } from 'mobx'
import BaseProvider from "../utils/Provider"
import { WEBURL } from "../constants/constants"


class AuthStore {
  @observable initial = false;
  @observable loading = false;
  @observable getUserLoading = false;
  @observable name = '';
  @observable gender = '';
  @observable birthday = '';
  @observable email = '';
  @observable mobile = '';
  @observable head_portrait = '';
  @observable school = '';
  @observable grade = '';
  @observable integral = '';
  @observable sign = '';

  @action login = (username, password) => {
    if (this.initial || this.loading) {
      return;
    }
    this.loading = true;
    BaseProvider.post(`${WEBURL}/login/`, {
      username: username,
      password: password,
    }).then((res) => {
      BaseProvider.refreshCSRFToken(res.data);
      console.log(111);
    }).catch((err) => {
        console.log(err.data);
      }
    ).finally(() => {
      console.log(222);
      this.initial = true;
      this.loading = false;
      this.getUser();
    }
    );

  };

  @action register = (username, password, code) => {
    if (this.loading) {
      return;
    }
    this.loading = true;
    BaseProvider.post(`${WEBURL}/api/user/`, {
      username: username,
      password: password,
      code: code,
      mobile: username
    }).then((res) => {
      Taro.showToast({
        title: '注册成功',
        icon: 'success',
        duration: 2000
      });
    }).catch((err) => {
      Taro.showToast({
        title: '验证码过期',
        duration: 2000
      });
      }
    ).finally(() => {
      this.loading = false;
    }
    );
  };

  @action getUser() {
    if (this.getUserLoading) {
      return;
    }
    this.getUserLoading = true;
    BaseProvider.get(`${WEBURL}/api/user/1`).then(res => {
      console.log(res.data);
      this.update(res.data);
    }).catch((err) => {
        console.log(err.data);
      }
    ).finally(() => {
        this.getUserLoading = false;
        Taro.navigateBack({ delta: 2 });
      }
    );
  }

  @action update(partialState) {
    for (const key in partialState) {
      if (partialState.hasOwnProperty(key) && this.hasOwnProperty(key)) {
        this[key] = partialState[key];
      }
    }
  }

  @action fetchCode(mobile) {
    if (this.loading) {
      return;
    }
    this.loading = true;
    BaseProvider.post(`${WEBURL}/api/codes/`, {
      mobile: mobile,
    }).then((res) => {
      Taro.showToast({
        title: '验证码发送成功',
        icon: 'success',
        duration: 2000
      });
    }).catch((err) => {
        console.log(err.data);
        Taro.showToast({
          title: '验证码发送失败',
          duration: 2000
        });
      }
    ).finally(
      this.loading = false
    );
  }

}

export default new AuthStore()
