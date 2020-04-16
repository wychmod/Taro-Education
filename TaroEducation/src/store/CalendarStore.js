import { observable, action } from 'mobx'
import BaseProvider from "../utils/Provider"
import { WEBURL } from "../constants/constants"

class CalendarStore {
  @observable taskLoading = false;
  @observable tasksLoading = false;
  @observable tasks = [];
  @observable task = null;

  @action fetchTasks = (date) => {
    if (this.tasksLoading) {
      return;
    }
    this.tasksLoading = true;
    BaseProvider.get(`${WEBURL}/api/calendar/?date=${date}`).then((res) => {
      this.tasks = res.data;
      console.log(res.data);
    }).catch((err) => {
        console.log(err.data);
      }
    ).finally(
      this.tasksLoading = false
    );
  };

  @action fetchTask = (id) => {
    if (this.taskLoading) {
      return;
    }
    this.taskLoading = true;
    BaseProvider.get(`${WEBURL}/api/calendar/${id}`).then((res) => {
      this.task = res.data;
      console.log(res.data);
    }).catch((err) => {
        console.log(err.data);
      }
    ).finally(
      this.taskLoading = false
    );
  }
}

export default new CalendarStore()
