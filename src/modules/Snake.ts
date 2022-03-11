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
    }
    set Y(value) {
        if (this.Y === value) return;

        if (value < 0 || value > 294) {
            throw new Error('Die');
        }
    
        this.moveBody();
        this.head.style.top = value + 'px';   
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
}

export default Snake;