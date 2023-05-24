import Circle from "./Circle";

export default class Bolinha extends Circle{
    
    //criando o construtor do circulo da bolinha
    constructor(x, y, size, speed, color){
        super(x, y, size, speed, color);
    }

    move(limits){
        this.y += this.speed
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
}