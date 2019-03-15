/**
 * @Author: Liang Liang
 * @Date: 2019/2/14
 * @Description:
 **/
import * as THREE from 'three';

import Config from '../../data/config';

export default class Light {
  constructor(scene) {
    this.scene = scene;

    this.init();
  }

  init() {
    this.ambientLight = new THREE.AmbientLight(Config.ambientLight.color);
    this.ambientLight.visible = Config.ambientLight.enabled;

    this.pointLight = new THREE.PointLight(
      Config.pointLight.color,
      Config.pointLight.intensity,
      Config.pointLight.distance
    );
    this.pointLight.position.set(
      Config.pointLight.x,
      Config.pointLight.y,
      Config.pointLight.z
    );
    this.pointLight.visible = Config.pointLight.enabled;

    this.directionalLight = new THREE.DirectionalLight(
      Config.directionalLight.color,
      Config.directionalLight.intensity
    );
    this.directionalLight.position.set(
      Config.directionalLight.x,
      Config.directionalLight.y,
      Config.directionalLight.z
    );
    this.directionalLight.visible = Config.directionalLight.enabled;

    this.directionalLight.castShadow = Config.shadow.enabled;
    this.directionalLight.shadow.bias = Config.shadow.bias;
    this.directionalLight.shadow.camera.near = Config.shadow.near;
    this.directionalLight.shadow.camera.far = Config.shadow.far;
    this.directionalLight.shadow.camera.left = Config.shadow.left;
    this.directionalLight.shadow.camera.right = Config.shadow.right;
    this.directionalLight.shadow.camera.top = Config.shadow.top;
    this.directionalLight.shadow.camera.bottom = Config.shadow.bottom;
    this.directionalLight.shadow.mapSize.width = Config.shadow.mapWidth;
    this.directionalLight.shadow.mapSize.height = Config.shadow.mapHeight;

    this.directionalLightHelper = new THREE.CameraHelper(
      this.directionalLight.shadow.camera
    );
    this.directionalLightHelper.visible = Config.shadow.helperEnabled;

    this.hemiLight = new THREE.HemisphereLight(
      Config.hemiLight.color,
      Config.hemiLight.groundColor,
      Config.hemiLight.intensity
    );
    this.hemiLight.position.set(
      Config.hemiLight.x,
      Config.hemiLight.y,
      Config.hemiLight.z
    );
    this.hemiLight.visible = Config.hemiLight.enabled;
  }

  place(lightName) {
    switch (lightName) {
      case 'ambient':
        this.scene.add(this.ambientLight);
        break;

      case 'directional':
        this.scene.add(this.directionalLight);
        this.scene.add(this.directionalLightHelper);
        break;

      case 'point':
        this.scene.add(this.pointLight);
        break;

      case 'hemi':
        this.scene.add(this.hemiLight);
        break;
    }
  }
}
