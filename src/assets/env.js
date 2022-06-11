(function(window) {
  // file usato da ngserve per lo sviluppo
  window["env"] = window["env"] || {};
  // Environment variables
  // puntamento locale per sviluppo
  window["env"]["apiUrl"] = "http://localhost:8083/api/";
  // window["env"]["debug"] = true;
})(this);
