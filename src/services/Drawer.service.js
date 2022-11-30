

export class DrawerService {

    static #calculateVertexes(x, y, n, len) {
        const vertexes = [];
        const rad = 2 * Math.PI / n;
        const rotation = Math.random();

        for (let i = 0; i <= n; i++) {
            vertexes.push([
                x + len * Math.cos(rad * i + rotation * rad),
                y + len * Math.sin(rad * i + rotation * rad),
            ]);
        }

        return vertexes;
    }

    static fillNAngleFigure(ctx, x, y, n, len) {
        if (n < 3) return;
        const vertexes = this.#calculateVertexes(x, y, n, len);
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
        // ctx.fill();
        ctx.closePath();
    }

}