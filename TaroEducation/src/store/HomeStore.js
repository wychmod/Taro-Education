import { observable, action } from 'mobx'
import BaseProvider from "../utils/Provider"
import { WEBURL } from "../constants/constants"

class HomeStore {
  @observable loading = false;
  @observable HomeCourses = [];
  @observable courses = [];

  @action fetchCourses() {
    if (this.loading) {
      return;
    }
    this.loading = true;
    BaseProvider.get(`${WEBURL}/api/courses/`).then((res) => {
      this.courses = res.data;
    }).catch((err) => {
        console.log(err.data);
      }
    ).finally(
      this.loading = false
    );
  }

  @action fetchHomeCourses() {
    if (this.loading) {
      return;
    }
    this.loading = true;
    BaseProvider.get(`${WEBURL}/api/courses/?show_on_homepage=true`).then((res) => {
      this.HomeCourses = res.data;
    }).catch((err) => {
        console.log(err.data);
      }
    ).finally(
      this.loading = false
    );
  }
}

export default new HomeStore()
