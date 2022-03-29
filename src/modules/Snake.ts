class Snake {
    // 找蛇头
    head: HTMLElement;
    // 身体（包括身体）
    bodies: HTMLCollection;
    // 找蛇的容器，外面那个div
    element: HTMLElement;

    constructor() {
        this.element = document.getElementById('snake')!;
        this.head = document.querySelector('#snake>div')!;
        this.bodies = this.element.getElementsByTagName('div')!;
    }

    //蛇头坐标
    get X() {
        return this.head.offsetLeft;
    }
    get Y() {
        return this.head.offsetTop;
    }
    set X(value) {
        if (this.X === value) return;

        if (value < 0 || value > 294) {
            throw new Error('Die');
        }

        this.moveBody();
        this.head.style.left = value + 'px';

        // 检查自己撞自己
        this.checkCollide();
    }
    set Y(value) {
        if (this.Y === value) return;

        if (value < 0 || value > 294) {
            throw new Error('Die');
        }

        // 不允许垂直方向调头
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            if (value > this.Y) { // 发生向下调头
                value = this.Y - 10; // 使其向上走
            } else {
                value = this.Y + 10; // 使其向下走
            }
        }
        this.moveBody();
        this.head.style.top = value + 'px';

        // 检查自己撞自己
        this.checkCollide();
    }

    // 增加身体
    addBody() {
        this.element.insertAdjacentHTML('beforeend', "<div></div>")
    }

    // 身体移动
    moveBody() {
        for (let i = this.bodies.length - 1; i > 0; i--) {
            const X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            const Y = (this.bodies[i - 1] as HTMLElement).offsetTop;

            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';
        }
    }

    checkCollide() {
        for (let i = 1; i < this.bodies.length; i++) {
            if (this.X === (this.bodies[i] as HTMLElement).offsetLeft &&
                this.Y === (this.bodies[i] as HTMLElement).offsetTop
            ) throw new Error('Die');
        }
    }
}

export default Snake;