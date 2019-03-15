/**
 * @Author: Liang Liang
 * @Date: 2019/2/14
 * @Description:
 **/
import * as THREE from 'three';

import { Promise } from 'es6-promise';

import Helpers from '../../utils/helpers';
import Config from '../../data/config';

export default class Texture {
  constructor() {
    this.textures = {};
  }

  load() {
    const loader = new THREE.TextureLoader();
    const maxAnisotropy = Config.maxAnisotropy;
    const imageFiles = Config.texture.imageFiles;
    const promiseArray = [];

    loader.setPath(Config.texture.path);

    imageFiles.forEach(imageFile => {
      promiseArray.push(
        new Promise((resolve, reject) => {
          loader.load(
            imageFile.image,
            texture => {
              texture.anisotropy = maxAnisotropy;

              const modelOBJ = {};
              modelOBJ[imageFile.name] = texture;
              if (modelOBJ[imageFile.name] instanceof THREE.Texture)
                resolve(modelOBJ);
            },
            Helpers.logProgress(),
            xhr =>
              reject(
                new Error(
                  xhr +
                    'An error occurred loading while loading ' +
                    imageFile.image
                )
              )
          );
        })
      );
    });

    return Promise.all(promiseArray).then(
      textures => {
        for (let i = 0, len = textures.length; i < len; i++) {
          this.textures[Object.keys(textures[i])[0]] =
            textures[i][Object.keys(textures[i])[0]];
        }
      },
      reason => console.log(reason)
    );
  }
}
