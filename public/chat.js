const socket = io();

// DOM elements
let message = document.getElementById("message");
let username = document.getElementById("username");
let btn = document.getElementById("send");
let output = document.getElementById("output");
let actions = document.getElementById("actions");

btn.addEventListener("click", function () {
  socket.emit("chat:message", {
    message: message.value,
    username: username.value,
  });

  // clear message
  message.value = "";
});

message.addEventListener("keypress", function () {
  console.log(username.value);
  socket.emit("chat:typing", username.value);
});

socket.on("chat:message", function (data) {
  if (data.username === username.value) {
    output.innerHTML += `<section class="message -right">
                            <!-- Balloon -->
                            <div class="nes-balloon from-right">
                              <p><strong>${data.username}</strong>: ${data.message}</p>
                            </div>
                            <i class="nes-bulbasaur"></i>
                          </section>
   `;
  } else {
    output.innerHTML += `<section class="message -left">
                            <i class="nes-mario"></i>
                            <!-- Balloon -->
                            <div class="nes-balloon from-left">
                                <p>
                                    <strong>${data.username}</strong>: ${data.message}
                                </p>
                            </div>
                        </section>
   `;

    // clean action
    actions.innerHTML = "";
  }
});

socket.on("chat:typing", function (data) {
  actions.innerHTML = `<p><em>${data} is typing messague </em></p>`;
});
