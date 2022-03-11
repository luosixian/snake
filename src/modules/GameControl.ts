import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";

class GameControl {

    snake: Snake;
    food: Food;
    scorePanel: ScorePanel;
    // 找移动方向
    direction: string = 'ArrowRight';
    // 记录游戏是否结束
    isOver = false;

    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel();
        this.init();
    }

    // 调用后游戏立即开始
    init() {
        // 绑定键盘按下事件,这里的this是document
        document.addEventListener('keydown', this.keydownHandle.bind(this));
        this.move();
    }

    // 键盘按下响应函数
    keydownHandle(e: KeyboardEvent) {
        // 检查按键是否合法
        this.direction = e.key;
        console.log(this.direction);
    }

    // 蛇移动
    move() {
        // 获取当前坐标
        let X = this.snake.X;
        let Y = this.snake.Y;
        switch (this.direction) {
            case "ArrowUp": Y -= 10;
                break;
            case "ArrowDown": Y += 10;
                break;
            case "ArrowLeft": X -= 10;
                break;
            case "ArrowRight": X += 10;
                break;
        }

        this.checkEat(X, Y);

        // 修改蛇的X和Y
        try {
            this.snake.X = X;
            this.snake.Y = Y;
        } catch (e) {
            alert('Game Over');
            this.isOver = true;
        }

        !this.isOver && setTimeout(this.move.bind(this), 100 - (this.scorePanel.level - 1) * 10);
    }

    // 检测食物
    checkEat(X: number, Y: number) {
        if (X === this.food.X && Y === this.food.Y) {
            // 食物换位置
            this.food.change();
            // 加分
            this.scorePanel.addScore();
            // 蛇加一节
            this.snake.addBody();
        }
    }
}

export default GameControl;