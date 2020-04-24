import { observable, action } from 'mobx'
import BaseProvider from "../utils/Provider"
import { WEBURL } from "../constants/constants"

class CourseStore {
  @observable courseLoading = false;
  @observable simpleChapterLoading = false;
  @observable simpleChapter = [];
  @observable course = null;
  @observable id = 0;
  @observable chapter = null;

  @action initCourse = (id) => {
    if (this.simpleChapter.length !==0 && this.id === id) {
      return;
    }
    this.id = id;
    this.fetchCourse();
    this.fetchSimpleChapter();
  };

  @action fetchCourse() {
    if (this.courseLoading) {
      return;
    }
    this.courseLoading = true;
    BaseProvider.get(`${WEBURL}/api/courses/${this.id}`).then((res) => {
      this.course = res.data;
      console.log(res.data);
    }).catch((err) => {
        console.log(err.data);
      }
    ).finally(
      this.courseLoading = false
    );
  }

  @action fetchSimpleChapter() {
    if (this.simpleChapterLoading) {
      return;
    }
    this.simpleChapterLoading = true;
    BaseProvider.get(`${WEBURL}/api/chapter/?course_id=${this.id}`).then((res) => {
      this.simpleChapter = res.data;
      console.log(res.data);
    }).catch((err) => {
        console.log(err.data);
      }
    ).finally(
      this.simpleChapterLoading = false
    );
  }

  @action fetchChapter(id) {
    if (this.simpleChapterLoading) {
      return;
    }
    this.simpleChapterLoading = true;
    BaseProvider.get(`${WEBURL}/api/chapter/${id}`).then((res) => {
      this.chapter = res.data;
      console.log(res.data);
    }).catch((err) => {
        console.log(err.data);
      }
    ).finally(
      this.simpleChapterLoading = false
    );
  }
}

export default new CourseStore()
