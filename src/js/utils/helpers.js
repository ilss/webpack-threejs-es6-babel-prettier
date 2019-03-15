/**
 * @Author: Liang Liang
 * @Date: 2019/2/14
 * @Description:
 **/
export default class Helpers {
  static throttle(fn, threshhold, scope) {
    threshhold || (threshhold = 250);
    let last, deferTimer;

    return function() {
      const context = scope || this;

      const now = +new Date(),
        args = arguments;

      if (last && now < last + threshhold) {
        clearTimeout(deferTimer);
        deferTimer = setTimeout(function() {
          last = now;
          fn.apply(context, args);
        }, threshhold);
      } else {
        last = now;
        fn.apply(context, args);
      }
    };
  }

  static logProgress() {
    return function(xhr) {
      if (xhr.lengthComputable) {
        const percentComplete = (xhr.loaded / xhr.total) * 100;
        console.log(Math.round(percentComplete, 2) + '% downloaded');
      }
    };
  }

  static logError() {
    return function(xhr) {
      console.error(xhr);
    };
  }

  static handleColorChange(color) {
    return value => {
      if (typeof value === 'string') {
        value = value.replace('#', '0x');
      }

      color.setHex(value);
    };
  }

  static update(mesh) {
    this.needsUpdate(mesh.material, mesh.geometry);
  }

  static needsUpdate(material, geometry) {
    return function() {
      material.shading = +material.shading;
      material.vertexColors = +material.vertexColors;
      material.side = +material.side;
      material.needsUpdate = true;
      geometry.verticesNeedUpdate = true;
      geometry.normalsNeedUpdate = true;
      geometry.colorsNeedUpdate = true;
    };
  }

  static updateTexture(material, materialKey, textures) {
    return function(key) {
      material[materialKey] = textures[key];
      material.needsUpdate = true;
    };
  }
}
