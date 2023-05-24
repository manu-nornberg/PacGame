export default class Circle {
	constructor(x, y, size, speed = 10, color = "#00f") {
		this.x = x;
		this.y = y;
		this.size = size;
		this.speed = speed;
		this.color = color;
		this.line = 3
	}

	draw(ctx) {
		this.circ(ctx,
			this.x,
			this.y,
			this.size,
			this.line,
			this.color,
			this.color)

	}

	circ(ctx, pos_x, pos_y, radius, line, color, fill = false) {
		ctx.lineWidth = line;
		ctx.strokeStyle = color
		ctx.beginPath();
		ctx.arc(pos_x, pos_y, radius, 0, Math.PI*2);
		ctx.stroke();
		if (fill) {
			ctx.fillStyle = fill
			ctx.fill()
		}
	}
}