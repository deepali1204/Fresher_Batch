
import authHeader from "./auth-header";
import axios from "axios";

const API_URL = "http://localhost:5001/api/";

class BookService {
  // BookFlight(user,flight,quantitys) {
  //   const quantity=Number(quantitys)
  //   return http.post("/book", {
  //     user,flight,quantity
  //   },{headers:authHeader()}
  //   );
  // }

  BookFlight(user, flights, quantitys) {
    console.log(user);
    console.log(flights);
    console.log(quantitys);
    const quantity = Number(quantitys);
    return axios
      .post(
        API_URL + "book",
        {
          user,
          flights,
          quantity,
        },
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        return response.data;
      });
  }
}
export default new BookService();