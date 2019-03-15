/**
 * @Author: Liang Liang
 * @Date: 2019/2/14
 * @Description:
 **/
import * as THREE from 'three';

import Material from './material';

import Config from '../../data/config';

export default class Geometry {
  constructor(scene) {
    this.scene = scene;
    this.geo = null;
  }

  make(type) {
    if (type === 'plane') {
      return (width, height, widthSegments = 1, heightSegments = 1) => {
        this.geo = new THREE.PlaneGeometry(
          width,
          height,
          widthSegments,
          heightSegments
        );
      };
    }

    if (type === 'sphere') {
      return (radius, widthSegments = 32, heightSegments = 32) => {
        this.geo = new THREE.SphereGeometry(
          radius,
          widthSegments,
          heightSegments
        );
      };
    }
  }

  place(position, rotation) {
    const material = new Material(0xeeeeee).standard;
    const mesh = new THREE.Mesh(this.geo, material);

    mesh.position.set(...position);
    mesh.rotation.set(...rotation);

    if (Config.shadow.enabled) {
      mesh.receiveShadow = true;
    }

    this.scene.add(mesh);
  }
}
