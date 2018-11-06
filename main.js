//初始化整个游戏的精灵，作为游戏开始的入口
import ResourceLoader from './js/base/ResourceLoader.js'
import Director from './js/Director.js'
import BackGround from './js/runtime/BackGround.js'
import Land from "./js/runtime/Land.js";
import DataStore from './js/base/DataStore.js'
import Birds from "./js/player/Birds.js";

export default class Main {
  constructor() {
    // this.canvas = wx.createCanvas();
    this.canvas = document.getElementById('myCanvas');
    this.ctx = this.canvas.getContext('2d');

    this.dataStore = DataStore.getInstance();
    this.director = Director.getInstance();

    const loader = ResourceLoader.create();
    loader.onLoaded(map => this.onResourceFirstLoaded(map));

  }

  onResourceFirstLoaded(map) {
    // 长期保存在内存的，不断销毁创建的放到dataStore的map中
    this.dataStore.ctx = this.ctx;
    this.dataStore.res = map;
    console.log(this.dataStore)
    this.init()
  }

  init() {
    this.director.isGameOver = false;
    this.dataStore
      // .put('background', new BackGround(this.ctx, this.dataStore.res.get('background')))
      .put('background', BackGround)
      .put('land', Land)
      .put('pencils', [])
      .put('birds', Birds)
    this.director.createPencil();
    this.director.run();
  }

}
