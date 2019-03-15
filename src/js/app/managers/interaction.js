/**
 * @Author: Liang Liang
 * @Date: 2019/2/14
 * @Description:
 **/

import Keyboard from '../../utils/keyboard';
import Helpers from '../../utils/helpers';
import Config from '../../data/config';

export default class Interaction {
  constructor(renderer, scene, camera, controls) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.controls = controls;

    this.timeout = null;

    this.keyboard = new Keyboard();

    this.renderer.domElement.addEventListener(
      'mousemove',
      event => Helpers.throttle(this.onMouseMove(event), 250),
      false
    );
    this.renderer.domElement.addEventListener(
      'mouseleave',
      event => this.onMouseLeave(event),
      false
    );
    this.renderer.domElement.addEventListener(
      'mouseover',
      event => this.onMouseOver(event),
      false
    );

    this.keyboard.domElement.addEventListener('keydown', event => {
      if (event.repeat) {
        return;
      }

      if (this.keyboard.eventMatches(event, 'escape')) {
        console.log('Escape pressed');
      }
    });
  }

  onMouseOver(event) {
    event.preventDefault();

    Config.isMouseOver = true;
  }

  onMouseLeave(event) {
    event.preventDefault();

    Config.isMouseOver = false;
  }

  onMouseMove(event) {
    event.preventDefault();

    clearTimeout(this.timeout);

    this.timeout = setTimeout(function() {
      Config.isMouseMoving = false;
    }, 200);

    Config.isMouseMoving = true;
  }
}
