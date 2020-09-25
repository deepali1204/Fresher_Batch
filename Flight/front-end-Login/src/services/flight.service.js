import http from "../axios-common";

class FlightService {
 getAll() {
  return http.get("/flight");
 }

  get(id) {
   return http.get(`/flight/${id}`);
  }

  create(data) {
    return http.post("/flight", data);
  }

  update(id, data) {
   return http.put(`/flight/${id}`, data);
}

  delete(id) {
    return http.delete(`/flight/${id}`);
  }

  deleteAll() {
   return http.delete(`/flight`);
  }

  findByFlight_name(flight_name) {
   return http.get(`/flight?flight_name=${flight_name}`);
  }
}

export default new FlightService();