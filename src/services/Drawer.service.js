

export class DrawerService {

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

    static fillNAngleFigure(ctx, n, len) {
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
        ctx.fillStyle = "#000";
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }

    static clearCanvas(ctx, size) {
        ctx.clearRect(0, 0, size, size);
    }

}