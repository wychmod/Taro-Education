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

}

export default new AuthStore()
