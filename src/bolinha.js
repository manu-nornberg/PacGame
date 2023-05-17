import Circle from './circle.js';

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
        if(this.y - this.size > limits.height){
            this.y = -2*this.size
            this.x = Math.random()*limits.width;
        }
    }
}