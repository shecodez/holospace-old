import axios from "axios";

export default {
  user: {
    login: (credentials) =>
      axios.post("/api/auth", { credentials }).then(res => res.data.user),
    register: (user) =>
      axios.post("/api/users", { user }).then(res => res.data.user)
  }
};
