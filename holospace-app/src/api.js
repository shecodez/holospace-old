import axios from "axios";

export default {
  user: {
    login: (credentials) =>
      axios.post("/api/auth", { credentials }).then(res => res.data.user),
    register: (user) =>
      axios.post("/api/users", { user }).then(res => res.data.user),
    confirm: (token) =>
      axios.post("/api/auth/confirmation", { token }).then(res => res.data.user),
    resetPasswordRequest: (email) =>
      axios.post("/api/auth/reset_password_request", { email }),
    validateToken: (token) =>
      axios.post("/api/auth/validate_token", { token }),
    resetPassword: (data) =>
      axios.post("/api/auth/reset_password", { data })
  },
  server: {
    create: (server) =>
      axios.post("/api/servers", { server }).then(res => res.data.server),
    getOne: (serverId) =>
      axios.get(`/api/servers/${serverId}`).then(res => res.data.server),
    update: (server) =>
      axios.put(`/api/servers/${server._id}`, { server }).then(res => res.data.server),
    delete: (server) =>
      axios.delete(`/api/servers/${server._id}`).then(res => res.data.server)
  },
  channel: {
    getOne: (channelId) =>
      axios.get(`/api/channels/${channelId}`).then(res => res.data.channel)
  },
  membership: {
    fetchMemberServers: () =>
      axios.get("/api/memberships/servers"),
    fetchServerMembers: (serverId) =>
      axios.get(`/api/memberships/${serverId}/members`)
  }
};
