function pageLoaded () {
    const buttonSend = document.querySelector (".btn_send")
    const buttonLocation = document.querySelector (".btn_location")
    const input = document.querySelector ("input")
    const chatField = document.querySelector (".chat_field")
    const websocket = new WebSocket ("wss://echo-ws-service.herokuapp.com")
    websocket.onerror = () => {
      let error = `<div class= "error_connection"> <p> Произошла ошибка</p></div>`;
      chatField.innerHTML += error;
    }
    websocket.onmessage = (msg) => {
      showInChat (msg.data, true);  
  }
    function showInChat (message, isReceived) {
      if (isReceived) {
        let messageGet = `<div class = "get_message">${message}</div>`
       chatField.innerHTML += messageGet;
      } else {
        let messageSent = `<div class = "sent_message">${message}</div>`
       chatField.innerHTML += messageSent;
      }
    }
    buttonSend.addEventListener ("click",
    sendMessage)
    function sendMessage() {
      if (!input.value) return
      websocket.send (input.value);
      showInChat (input.value, false);
      input.value === " "; 
    }
    buttonLocation.addEventListener ("click", getLocation)
    function getLocation ()  {
      if (!navigator.geolocation) {
        showInChat ("Геолокация не поддерживается", false)
      } else {
        showInChat (`<p> Определение местоположения </p>`, false);
        navigator.geolocation.getCurrentPosition (success,error)  
      }
    }
    const error = () => {
     showInChat ("Невозможно определить местоположение ", false);
    }
    const success = (data) => {
      const latitude = data.coords.latitude;
      const longitude = data.coords.longitude;
      showInChat (` <p> <a href=" https://www.openstreetmap.org/#map=18/${latitude}/${longitude}" target =_blank> Показать на карте</a> </p>`, false)
    }
  }
  document.addEventListener ("DOMContentLoaded", pageLoaded)