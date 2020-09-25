import http from "../http-search";

class UserSearchService{
  findflights(data){
      return http.post("/flight",data);
  }
}

export default new UserSearchService();