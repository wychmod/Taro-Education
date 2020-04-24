import { observable, action } from 'mobx'
import BaseProvider from "../utils/Provider"
import { WEBURL } from "../constants/constants"


class RankStore {
  @observable loading = false;
  @observable rankItem = [];

  @action fetchRankItem = (username, password) => {
    if (this.loading) {
      return;
    }
    this.loading = true;
    BaseProvider.get(`${WEBURL}/api/rank/`).then((res) => {
      this.rankItem = res.data;
      console.log(res.data);
    }).catch((err) => {
        console.log(err.data);
      }
    ).finally(
      this.loading = false
    );
  };
}

export default new RankStore()
