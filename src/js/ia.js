window.onload = () => iniciar();

const iniciar = () => {
  const redNeuronal = new brain.NeuralNetwork();
  const datos = [
    {
      input: character("hola"),
      output: { hola: 1 },
    },
    {
      input: character("buenos dias"),
      output: { hola: 1 },
    },
    {
      input: character("buenas"),
      output: { hola: 1 },
    },
    {
      input: character("como te llamas"),
      output: { me_llamo_robin: 1 },
    },
    {
      input: character("como estas"),
      output: { bien_y_tu_como_estas: 1 },
    },
    {
      input: character("cuentame un chiste"),
      output: { no_quiero: 1 },
    },
    {
      input: character("sabes contar"),
      output: { uno_dos_tres: 1 },
    },
    {
      input: character("gracias"),
      output: { de_nada: 1 },
    },
    {
      input: character("quien te creo"),
      output: { daniel: 1 },
    },
    {
      input: character("chao"),
      output: { chao: 1 },
    },
    {
      input: character("adios"),
      output: { chao: 1 },
    },
  ];
  redNeuronal.train(datos);
  const formulario = document.getElementById("texto-usuario");
  const input = document.getElementById("texto");
  const chat = document.getElementById("chat");
  const contenedorChat = document.getElementById("contenedor-chat");

  formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    chat.innerHTML += usuario(input.value);
    const respuesta = redNeuronal.run(character(input.value));
    for (let index in respuesta) {
      if (respuesta[index] > 0.75) {
        chat.innerHTML += bot(index.split("_").join(" "));
        input.value = "";
        contenedorChat.scroll(0,contenedorChat.clientHeight);
        return;
      }
    }
    chat.innerHTML += bot("no entiendo");
    input.value = "";
    contenedorChat.scroll(0,contenedorChat.clientHeight);
  });
};

const character = (string) => {
  return string.trim().split("").map(integer);
};

const bot = (string) => {
  return `
  <li  class="chat-bot d-flex justify-content-start  align-items-center w-100 px-2">
  <img src="src/images/bot.svg" alt="" class="chat-img" />
  <div class="chat-body px-2">
      <p>
          ${string}
      </p>
  </div>
</li>
  `;
};
const usuario = (string) => {
  return `
  <li class="chat-usuario d-flex justify-content-end w-100 px-2">
  <div class="chat-body py-2">
      <p>
      ${string}
      </p>
  </div>
</li>
  `;
};

const integer = (character) => {
  const letra = character.charCodeAt(0) / 127;
  return letra > 1 ? 0 : letra;
};
