/**
 * @Author: Liang Liang
 * @Date: 2019/2/14
 * @Description:
 **/
import * as THREE from 'three';

import Config from '../../data/config';

export default class Renderer {
  constructor(scene, container) {
    this.scene = scene;
    this.container = container;

    this.threeRenderer = new THREE.WebGLRenderer({
      antialias: true
    });

    this.threeRenderer.setClearColor(scene.fog.color);
    this.threeRenderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(this.threeRenderer.domElement);

    this.threeRenderer.shadowMap.enabled = true;
    this.threeRenderer.shadowMap.type = THREE.PCFSoftShadowMap;

    Config.maxAnisotropy = this.threeRenderer.getMaxAnisotropy();

    this.updateSize();

    document.addEventListener(
      'DOMContentLoaded',
      () => this.updateSize(),
      false
    );
    window.addEventListener('resize', () => this.updateSize(), false);
  }

  updateSize() {
    this.threeRenderer.setSize(
      this.container.offsetWidth,
      this.container.offsetHeight
    );
  }

  render(scene, camera) {
    this.threeRenderer.render(scene, camera);
  }
}
