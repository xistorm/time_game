import { randomRange } from "../utils";


export class DrawerService {

    static colorsPool = [
        '#edc7b7',
        '#123c69',
        '#DA789A',
        '#ac3b61',
    ]

    static getRandomColor = () => {
        const index = randomRange(0, this.colorsPool.length);
        return this.colorsPool[index];
    }

    static #generateRandomPoints = (start, end, step = 20) => {
        const points = [];
        const highest = Math.max(start.y, end.y) + 300;
        const lowest = Math.max(start.y, end.y) - 300;

        points.push({ x: start.x, y: start.y });
        for (let x = start.x + step; x < end.x; x += step) {
            const y = randomRange(lowest, highest);
            points.push({ x, y });
        }
        points.push({ x: end.x, y: end.y });

        return points;
    }

    static #getBezierBasis = (i, n, t) => {
        const factorial = (n) => {
            return (n <= 1) ? 1 : n * factorial(n - 1);
        };

        return (factorial(n) / (factorial(i) * factorial(n - i))) * Math.pow(t, i) * Math.pow(1 - t, n - i);
    }

    static #calculateVertexes = (n, len) => {
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

    static fillNAngleFigure = (ctx, { angles, len, color = this.getRandomColor() }) => {
        if (angles < 3) return;
        const vertexes = this.#calculateVertexes(angles, len);
        const [x0, y0] = vertexes[0];

        ctx.beginPath()
        ctx.moveTo(x0, y0);
        for (let i = 1; i <= angles; ++i) {
            const [toX, toY] = vertexes[i];
            ctx.lineTo(toX, toY);
        }
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }

    static fillCircle = (ctx, { radius, color = this.getRandomColor() }) => {
        ctx.beginPath();
        ctx.arc(radius, radius, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = color;
        ctx.fill()
        ctx.closePath();
    }

    static getBezierCurve = (start, end, step = 0.01) => {
        const points = this.#generateRandomPoints(start, end);
        const res = [];

        for (let t = 0; t < 1 + step; t += step) {
            const index = res.length;

            t = Math.min(t, 1);
            res.push({ x: 0, y: 0 });

            for (var i = 0; i < points.length; i++) {
                var ration = this.#getBezierBasis(i, points.length - 1, t);

                res[index].x += points[i].x * ration;
                res[index].y += points[i].y * ration;
            }
        }

        return res;
    }

    static drawCurve = (ctx, { points, color = this.getRandomColor() }) => {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; ++i) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.lineWidth = 5;
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.closePath();
    }

    static clearCanvas = (ctx, size) => {
        ctx.clearRect(0, 0, size.x, size.y);
    }

}