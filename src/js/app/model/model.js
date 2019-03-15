/**
 * @Author: Liang Liang
 * @Date: 2019/2/14
 * @Description:
 **/
import * as THREE from 'three';

import Material from '../helpers/material';
import MeshHelper from '../helpers/meshHelper';
import Helpers from '../../utils/helpers';
import Config from '../../data/config';

export default class Model {
  constructor(scene, manager, textures) {
    this.scene = scene;
    this.textures = textures;

    this.loader = new THREE.ObjectLoader(manager);
    this.obj = null;
  }

  load() {
    this.loader.load(
      Config.model.path,
      obj => {
        obj.traverse(child => {
          if (child instanceof THREE.Mesh) {
            const material = new Material(0xffffff).standard;
            material.map = this.textures.UV;
            child.material = material;

            if (Config.shadow.enabled) {
              child.receiveShadow = true;
              child.castShadow = true;
            }
          }
        });

        if (Config.isDev && Config.mesh.enableHelper) {
          new MeshHelper(this.scene, obj);
        }

        this.obj = obj;

        obj.scale.multiplyScalar(Config.model.scale);
        this.scene.add(obj);
      },
      Helpers.logProgress(),
      Helpers.logError()
    );
  }
}
