import { observable, action } from 'mobx'
import BaseProvider from "../utils/Provider"
import { WEBURL } from "../constants/constants"

class AuthStore {
  @observable initial = false;
  @observable loading = false;
  @observable name = '';
  @observable gender = '';
  @observable birthday = '';
  @observable email = '';
  @observable mobile = '';
  @observable head_portrait = '';
  @observable school = '';
  @observable grade = '';
  @observable integral = '';

  @action login = (username, password) => {
    if (this.initial) {
      return;
    }
    BaseProvider.post('/login/', {
      Username: username,
      Password: password,
    });

  }

}

export default new AuthStore()
