import { randomRange } from "../utils";


export class DrawerService {

    static colorsPool = [
        '#edc7b7',
        '#123c69',
        '#DA789A',
        '#ac3b61',
    ]

    static #getRandomColor() {
        const index = randomRange(0, this.colorsPool.length);
        return this.colorsPool[index];
    }

    static #calculateVertexes(n, len) {
        const vertexes = [];
        const rad = 2 * Math.PI / n;
        const rotation = Math.random();

        for (let i = 0; i <= n; i++) {
            vertexes.push([
                len * (Math.cos(rad * (i + rotation)) + 1),
                len * (Math.sin(rad * (i + rotation)) + 1),
            ]);
        }

        return vertexes;
    }

    static fillNAngleFigure(ctx, n, len, color = this.#getRandomColor()) {
        if (n < 3) return;
        const vertexes = this.#calculateVertexes(n, len);
        const [x0, y0] = vertexes[0];

        ctx.beginPath()
        ctx.moveTo(x0, y0);
        for (let i = 1; i <= n; ++i) {
            const [toX, toY] = vertexes[i];
            ctx.lineTo(toX, toY);
        }
        ctx.lineWidth = 5;
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }

    static clearCanvas(ctx, size) {
        ctx.clearRect(0, 0, size, size);
    }

}