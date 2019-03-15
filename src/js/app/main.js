/**
 * @Author: Liang Liang
 * @Date: 2019/2/14
 * @Description:
 **/
import * as THREE from 'three';
import TWEEN from 'tween.js';

import Renderer from './components/renderer';
import Camera from './components/camera';
import Light from './components/light';
import Controls from './components/controls';

import Geometry from './helpers/geometry';
import Texture from './model/texture';
import Model from './model/model';

import Interaction from './managers/interaction';

import Config from './../data/config';

export default class Main {
  constructor(container) {
    this.container = container;

    this.clock = new THREE.Clock();

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(Config.fog.color, Config.fog.near);

    if (window.devicePixelRatio) {
      Config.dpr = window.devicePixelRatio;
    }

    this.renderer = new Renderer(this.scene, container);

    this.camera = new Camera(this.renderer.threeRenderer);
    this.controls = new Controls(this.camera.threeCamera, container);
    this.light = new Light(this.scene);

    const lights = ['ambient', 'directional', 'point', 'hemi'];
    lights.forEach(light => this.light.place(light));

    this.geometry = new Geometry(this.scene);
    this.geometry.make('plane')(150, 150, 10, 10);
    this.geometry.place([0, -20, 0], [Math.PI / 2, 0, 0]);

    this.texture = new Texture();

    this.texture.load().then(() => {
      this.manager = new THREE.LoadingManager();

      this.model = new Model(this.scene, this.manager, this.texture.textures);
      this.model.load();

      this.manager.onProgress = (item, loaded, total) => {
        console.log(`${item}: ${loaded} ${total}`);
      };

      this.manager.onLoad = () => {
        new Interaction(
          this.renderer.threeRenderer,
          this.scene,
          this.camera.threeCamera,
          this.controls.threeControls
        );

        Config.isLoaded = true;
        this.container.querySelector('#loading').style.display = 'none';
      };
    });

    this.render();
  }

  render() {
    this.renderer.render(this.scene, this.camera.threeCamera);
    TWEEN.update();
    this.controls.threeControls.update();
    requestAnimationFrame(this.render.bind(this));
  }
}
