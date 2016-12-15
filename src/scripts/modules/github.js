import axios from "axios";

export default class Github {

  getApiUrl () {

  }


  static getTrendingRepos () {
    return new Promise((resolve) => {
      let date = new Date();
      date.setDate(date.getDate() - 7);

      let url = "https://api.github.com/search/repositories?sort=stars&order=desc&q=created%3A>" + date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();

      let serverRequest = axios.get(url);

      resolve(serverRequest);
    });
  }

}
