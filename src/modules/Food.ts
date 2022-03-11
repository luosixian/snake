class Food {
    element: HTMLElement;

    constructor() {
        //获取food元素并赋值给element
        this.element = document.getElementById('food')!;
    }

    // 获取食物X轴坐标
    get X() {
        return this.element.offsetLeft;
    }
    // 获取食物Y轴坐标
    get Y() {
        return this.element.offsetTop;
    }

    // 修改食物位置
    change() {
        //食物范围 0-290，且必须是10的倍数
        let top = Math.round(Math.random() * 29) * 10
        let left = Math.round(Math.random() * 29) * 10
        this.element.style.left = left + 'px';
        this.element.style.top = top + 'px';
    }
}

export default Food;