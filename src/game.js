import Fantasma from "./fantasma"
import Fantasma2 from "./fantasma2";
import Fantasma3 from "./fantasma3";
import { keyPress, key } from "./keyboard"
import Pacman from "./Hero"
import { loadImage, loadAudio } from "./loaderAssets";
import Bolinha from "./bolinha";

let CTX
let CANVAS

const FRAMES = 60
const qntfanta = 1
const qntfantaVerde = 1
const qntfantaAzul = 1
const qntfantaPink = 1
const qntfantamortinho = 4
const qntBolinha = 4
const pac = new Pacman(200, 80, 20, 5, 40, 40, 'img/spritepac.png', FRAMES, 3)

let fantas = Array.from({ length: qntfanta });//faz um array com a qnt de inimigos 
let fantasVerde = Array.from({ length: qntfantaVerde });//faz um array com a qnt de inimigos 
let fantasAzul = Array.from({ length: qntfantaAzul });//faz um array com a qnt de inimigos 
let fantasPink = Array.from({ length: qntfantaPink });//faz um array com a qnt de inimigos
let fantamorto = Array.from({ length: qntfantamortinho }); //faz um array com a qnt de inimigos
let bolinhas = Array.from({ length: qntBolinha }); //faz um array com a qnt de bolinhas
let gameover = false
let anime;
let boundaries
let pontuacao = 0
let backgroundImage = null
let sound
let sound2
let sound3

const init = async () => {
	console.log("Initialize Canvas")
	CANVAS = document.querySelector('canvas')
	CTX = CANVAS.getContext('2d')

	backgroundImage = await loadImage('img/fundo.jpg')
	sound = await loadAudio('sounds/gameover.wav')
	sound.volume = 1
	// sound2 = await loadAudio('sounds/funky.mp3')
	// sound2.volume = .2
	sound3 = await loadAudio('sounds/retrogame.ogg')
	sound3.volume = 1

	boundaries = {
		width: CANVAS.width,
		height: CANVAS.height
	}

	fantas = fantas.map(f => new Fantasma(
		Math.random() * CANVAS.width,
		Math.random() * CANVAS.height,
		20, 2, 40, 40, 'img/spritefantasma.png', FRAMES
	))

	fantasVerde = fantasVerde.map(f => new Fantasma2(
		Math.random() * CANVAS.width,
		Math.random() * CANVAS.height,
		20, 2, 40, 40, 'img/spritefantasmaverde.png', FRAMES
	))

	fantasAzul = fantasAzul.map(f => new Fantasma2(
		Math.random() * CANVAS.width,
		Math.random() * CANVAS.height,
		20, 2, 40, 40, 'img/spritefantasmaazul.png', FRAMES
	))

	fantasPink = fantasPink.map(f => new Fantasma3(
		Math.random() * CANVAS.width,
		Math.random() * CANVAS.height,
		20, 2, 40, 40, 'img/spritefantasmapink.png', FRAMES
	))

	fantamorto = fantamorto.map(f => new Fantasma(
		Math.random() * CANVAS.width,
		Math.random() * CANVAS.height,
		20, 2, 40, 40, 'img/spritefantasmamortinho.png', FRAMES
	))

	bolinhas = bolinhas.map(b => new Bolinha(
		Math.random() * CANVAS.width,
		Math.random() * CANVAS.height,
		6, 0, 'white'
	))


	keyPress(window)
	loop()
}

const loop = () => {
	setTimeout(() => {

		CTX.drawImage(backgroundImage, 0, 0, CANVAS.width, CANVAS.height)

		pac.move(boundaries, key)
		pac.draw(CTX)

		// sound2.play()


		if (pontuacao < 10 || pontuacao > 20) {
			if (pontuacao < 40 || pontuacao > 50) {
				if (pontuacao < 70 || pontuacao > 90) {
					fantas.forEach(f => {
						f.move(boundaries, pac)
						f.draw(CTX)
						if (f.colide(pac)) {
							pac.vidinha -= 1
							f.x = Math.random() * CANVAS.width
							f.y = Math.random() * CANVAS.height
						}

						gameover = pac.vidinha == 0
							? true
							: false
					})

					fantasVerde.forEach(f => {
						f.move(boundaries, pac)
						f.draw(CTX)
						if (f.colide(pac)) {
							pac.vidinha -= 1
							f.x = Math.random() * CANVAS.width
							f.y = Math.random() * CANVAS.height
						}

						gameover = pac.vidinha == 0
							? true
							: false
					})

					fantasAzul.forEach(f => {
						f.move(boundaries, pac)
						f.draw(CTX)
						if (f.colide(pac)) {
							pac.vidinha -= 1
							f.x = Math.random() * CANVAS.width
							f.y = Math.random() * CANVAS.height
						}

						gameover = pac.vidinha == 0
							? true
							: false
					})

					fantasPink.forEach(f => {
						f.move(boundaries, pac)
						f.draw(CTX)
						if (f.colide(pac)) {
							pac.vidinha -= 1
							f.x = Math.random() * CANVAS.width
							f.y = Math.random() * CANVAS.height
						}

						gameover = pac.vidinha == 0
							? true
							: false

					})

				} else {
					fantamorto.forEach(f => {
						f.move(boundaries, 0)
						f.draw(CTX)
						if (f.colide(pac)) {
							pontuacao += 1
							f.x = Math.random() * CANVAS.width
							f.y = Math.random() * CANVAS.height
						}
					})
				}
			} else {
				fantamorto.forEach(f => {
					f.move(boundaries, 0)
					f.draw(CTX)
					if (f.colide(pac)) {
						pontuacao += 1
						f.x = Math.random() * CANVAS.width
						f.y = Math.random() * CANVAS.height
					}
				})
			}
		} else {
			fantamorto.forEach(f => {
				f.move(boundaries, 0)
				f.draw(CTX)
				if (f.colide(pac)) {
					pontuacao += 1
					f.x = Math.random() * CANVAS.width
					f.y = Math.random() * CANVAS.height
				}
			})
		}

			bolinhas.forEach(b => {
				b.move(boundaries, 0)
				b.draw(CTX)
				if (b.colide(pac)) {
					b.x = Math.random() * CANVAS.width
					b.y = Math.random() * CANVAS.height
					sound3.play()
					pontuacao += 1;
				}
			})

			let textSize = 18;
			CTX.fillStyle = 'purple'
			CTX.fillRect(0, 0, CANVAS.width, 28)
			CTX.font = `bold ${textSize}px sans`;
			CTX.textBaseline = "top";
			let texto = (`Pontuação: ${pontuacao} Vidas: ${pac.vidinha}`);
			let textMetric = CTX.measureText(texto);
			CTX.fillStyle = "#fff";
			CTX.fillText(
				texto,
				CANVAS.width / 2 - textMetric.width / 2,
				CANVAS.height / 20 - textSize
			)

			if (gameover) {
				sound.play()
				console.error('DEAD!!!')
				cancelAnimationFrame(anime)
			} else {
				anime = requestAnimationFrame(loop)
			}

		}, 1000 / FRAMES)
}



export { init }