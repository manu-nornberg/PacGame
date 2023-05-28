import './styles/style.css'
import {init} from "./game.js"

// window.addEventListener("load", init, false)

let botao = document.querySelector("#jogar")
botao.addEventListener('click', init,false)