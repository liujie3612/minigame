//下半部分铅笔
import Pencil from "./Pencil.js";
import Sprite from "../base/Sprite.js";

export default class DownPencil extends Pencil {
  constructor(top) {
    const image = Sprite.getImage('pencilDown');
    super(image, top)
  }

  draw() {
    //间隙
    let gap = window.innerHeight / 5;
    this.y = this.top + gap;
    // console.log('down', this.y)
    super.draw();
  }
}
