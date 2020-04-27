import { observable, action } from 'mobx'
import BaseProvider from "../utils/Provider"
import { WEBURL } from "../constants/constants"


class QuestionStore {
  @observable loading = false;
  @observable questionItems = [];
  @observable questionnaire = null;

  @action fetchQuestionnaire = (id) => {
    if (this.loading) {
      return;
    }
    this.loading = true;
    BaseProvider.get(`${WEBURL}/api/questionnaire/${id}/`).then((res) => {
      this.questionnaire = res.data;
      console.log(res.data);
    }).catch((err) => {
        console.log(err.data);
      }
    ).finally(
      this.loading = false
    );
  };

  @action fetchQuestionItem = () => {
    if (this.loading) {
      return;
    }
    this.loading = true;
    BaseProvider.get(`${WEBURL}/api/questionnaire/`).then((res) => {
      this.questionItems = res.data;
      console.log(res.data);
    }).catch((err) => {
        console.log(err.data);
      }
    ).finally(
      this.loading = false
    );
  };
}

export default new QuestionStore()
