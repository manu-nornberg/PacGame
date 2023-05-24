import Circle from "./Circle";
import { loadImage } from "./loaderAssets";

export default class Pacman extends Circle{

	constructor(x, y, size, speed, width, height, imgUrl, FRAMES, vidinha) {
		super(x, y, size, speed)
		this.imgUrl = imgUrl
		loadImage(this.imgUrl)
		.then(img=>{
			this.img = img
			this.cellWidth = img.naturalWidth/this.totalSprites
			// console.log('W:'+this.cellWidth)
		})

		
		this.cellHeight= 135
		this.cellX = 0
		this.totalSprites = 3
		this.spriteSpeed = 1
		console.log('H:'+this.cellHeight)
		

		this.width = width
		this.height = height

		this.status = 'parado'

		this.hit = new Circle(
			this.x + this.width/2,
			this.y + this.height/2,
			this.size,
			0,"rgba(0,0,255,.5)"
		)

		this.vidinha = vidinha

		this.animeSprite(FRAMES)
		this.setControls()
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
		//descomentar para ver a area de hit
		// this.hit.draw(CTX)
	}

	animeSprite(FRAMES){ //Controla a animacao do sprite
		setInterval(() => {
			this.cellX = this.cellX < this.totalSprites - 1 
						 ? this.cellX + 1 
						 : 0;
		}, 1000 / (FRAMES*this.spriteSpeed/10))
	}

	setControls(){
		this.controls = {
			's':'down',
			'w':'up',
			'a':'left',
			'd':'right'
		}
	}

	setCellY(){
		let sprites = {
			'down': 3,
			'up': 1,
			'left': 2,
			'right':0,
			'parado': 0
		}

		this.cellY = sprites[this.status]
	}

	move(limits, key) {

		let movements = {
			'down': { x: this.x, y: this.y + this.speed },
			'up': 	{ x: this.x, y: this.y - this.speed },
			'left': { x: this.x - this.speed, y: this.y },
			'right': { x: this.x + this.speed, y: this.y },
			'parado': {x: this.x, y: this.y}
		}

		this.status = this.controls[key] ? this.controls[key] : this.status

		this.x = movements[this.status].x
		this.y = movements[this.status].y

		this.updateHit()
		this.limits(limits)
	}

	limits(limits){
		//borda dele da direita  borda do limite
        if( this.x  >= limits.width - this.size *2 ){
            this.x = limits.width - this.size *2
        }
        //borda dele da esquerda  borda do limite
        if( this.x < 0 ){
            this.x = 0
        }
        //borda dele da direita  borda do limite
        if( this.y >= limits.height - this.size *2 ){
            this.y = limits.height - this.size *2
        }
        //borda dele da esquerda  borda do limite
        if( this.y < 25 ){
            this.y = 25
        }
	}

	updateHit(){
		this.hit.x = this.x + this.width/2
		this.hit.y = this.y + this.height/2
	}

	colide(other) {
		return (this.hit.size + other.size >= Math.sqrt(
			(this.hit.x - other.x) ** 2 + (this.hit.y - other.y) ** 2)
		)
	}
}