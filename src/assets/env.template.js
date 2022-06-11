(function(window) {
  // template utilizzato in docker che con envsubst genera env.js
  window["env"] = window["env"] || {};

  // Environment variables
  window["env"]["apiUrl"] = "${API_URL}";
  // window["env"]["debug"] = true;
})(this);
