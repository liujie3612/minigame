import DataStore from "./base/DataStore.js";
import UpPencil from "./runtime/UpPencil.js";
import DownPencil from "./runtime/DownPencil.js";


//导演类，控制游戏的逻辑
export default class Director {
  static getInstance() {
    // 单例模式
    if (!Director.instance) {
      Director.instance = new Director();
    }
    return Director.instance;
  }

  constructor() {
    this.dataStore = DataStore.getInstance();
    this.moveSpeed = 2;
  }


  createPencil() {
    const minTop = window.innerHeight / 8
    const maxTop = window.innerHeight / 2
    const top = minTop + Math.random() * (maxTop - minTop);
    console.log(top)

    this.dataStore.get('pencils').push(new UpPencil(top));
    this.dataStore.get('pencils').push(new DownPencil(top));
  }

  run() {
    if (!this.isGameOver) {
      // 整个canvas都在重绘
      this.dataStore.get('background').draw();
      const pencils = this.dataStore.get('pencils');


      //到达左边界
      if (pencils[0].x + pencils[0].width <= 0 && pencils.length === 4) {
        pencils.shift();
        pencils.shift();
      }

      if (pencils[0].x <= (window.innerWidth - pencils[0].width) / 2 && pencils.length === 2) {
        this.createPencil();
      }

      for (let pencil of this.dataStore.get('pencils')) {
        pencil.draw();
      }

      this.dataStore.get('land').draw();
      this.dataStore.get('birds').draw();

      // 自己调用自己
      let timer = requestAnimationFrame(() => this.run());
      this.dataStore.put('timer', timer)
      //
    } else {
      console.log('游戏结束')
      cancelAnimationFrame(this.dataStore.get('timer'));
      this.dataStore.destroy();
    }


  }

}
