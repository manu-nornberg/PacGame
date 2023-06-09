import Circle from "./circle";
import { loadImage } from "./loaderAssets";


export default class Fantasma2 extends Circle{

	constructor(x, y, size, speed, width, height,imgUrl,FRAMES) {
		super(x, y, size, speed)
		this.imgUrl = imgUrl
		loadImage(this.imgUrl)
		.then(img=>{
			this.img = img
			this.cellWidth = img.naturalWidth/this.totalSprites
		})

		
		this.cellHeight= 280
		this.cellX = 0
		this.totalSprites = 2
		this.spriteSpeed = 1
		console.log('H:'+this.cellHeight)
		

		this.width = width
		this.height = height

		this.status = 'fantasminha'

		
		this.animeSprite(FRAMES)
	}

	draw(CTX){
		this.setCellY()
		if(!this.img) return;
		CTX.drawImage(
			this.img,
			this.cellX * this.cellWidth,
			this.cellY * this.cellHeight,
			this.cellWidth,
			this.cellHeight,
			this.x,
			this.y,
			this.width,
			this.height
		)
	}

	animeSprite(FRAMES){ //Controla a animacao do sprite
		setInterval(() => {
			this.cellX = this.cellX < this.totalSprites - 1 
						 ? this.cellX + 1 
						 : 0;
		}, 1000 / (FRAMES*this.spriteSpeed/10))
	}


	setCellY(){
		let sprites = {
			'fantasminha' : 0
		}

		this.cellY = sprites[this.status]
	}

	move(limits, pac) {
		
		// console.log(pac)

		if (this.x < pac.x) //se o x do fantasma for menor q o do pac
            this.x += this.spriteSpeed //aumenta o x do fantasma (esquerda)
			else
            this.x -= this.spriteSpeed //diminui o x (direita)
			if(this.y < pac.y)
            this.y += this.spriteSpeed //aumenta o y
			else
            this.y -= this.speed //diminui o y
			this.limits(limits)
	}

	limits(limits){
		if(this.y - this.size > limits.height ){
			this.y = -2*this.size
			this.x = Math.random()*limits.width;
		}
	}

}