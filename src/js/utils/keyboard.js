/**
 * @Author: Liang Liang
 * @Date: 2019/2/14
 * @Description:
 **/
const ALIAS = {
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  space: 32,
  tab: 9,
  escape: 27
};

export default class Keyboard {
  constructor(domElement) {
    this.domElement = domElement || document;
    this.keyCodes = {};

    this.domElement.addEventListener(
      'keydown',
      event => this.onKeyChange(event),
      false
    );
    this.domElement.addEventListener(
      'keyup',
      event => this.onKeyChange(event),
      false
    );

    window.addEventListener('blur', () => this.onBlur, false);
  }

  destroy() {
    this.domElement.removeEventListener(
      'keydown',
      event => this.onKeyChange(event),
      false
    );
    this.domElement.removeEventListener(
      'keyup',
      event => this.onKeyChange(event),
      false
    );

    window.removeEventListener('blur', () => this.onBlur, false);
  }

  onBlur() {
    for (const prop in this.keyCodes) this.keyCodes[prop] = false;
  }

  onKeyChange(event) {
    const keyCode = event.keyCode;
    this.keyCodes[keyCode] = event.type === 'keydown';
  }

  pressed(keyDesc) {
    const keys = keyDesc.split('+');
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      let pressed = false;
      if (Object.keys(ALIAS).indexOf(key) !== -1) {
        pressed = this.keyCodes[ALIAS[key]];
      } else {
        pressed = this.keyCodes[key.toUpperCase().charCodeAt(0)];
      }
      if (!pressed) return false;
    }

    return true;
  }

  eventMatches(event, keyDesc) {
    const aliases = ALIAS;
    const aliasKeys = Object.keys(aliases);
    const keys = keyDesc.split('+');
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      let pressed = false;
      if (key === 'shift') {
        pressed = event.shiftKey ? true : false;
      } else if (key === 'ctrl') {
        pressed = event.ctrlKey ? true : false;
      } else if (key === 'alt') {
        pressed = event.altKey ? true : false;
      } else if (key === 'meta') {
        pressed = event.metaKey ? true : false;
      } else if (aliasKeys.indexOf(key) !== -1) {
        pressed = event.keyCode === aliases[key];
      } else if (event.keyCode === key.toUpperCase().charCodeAt(0)) {
        pressed = true;
      }
      if (!pressed) return false;
    }

    return true;
  }
}
