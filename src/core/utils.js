import { delayWriteToLocalStorage } from '../constants.js';

// Pure functions
export function capitalize(string) {
  if (typeof string !== 'string') {
    return '';
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function range(start, end) {
  if (start > end) {
    [end, start] = [start, end];
  }
  return new Array(end - start + 1).fill('').map((_, index) => start + index);
}

// создал ф-ию обертку, для отложенного запуска переданной ф-ии используя замыкание
function trottle(fn, ms) {
  let waiting = false;
  return function (...args) {
    if (waiting) return;
    fn.apply(this, args);
    waiting = true;
    setTimeout(() => (waiting = false), ms);
  };
}

const setLocalStorageWithDelay = trottle(setLocalStorage, delayWriteToLocalStorage);

function setLocalStorage(key, data) {
  console.log(delayWriteToLocalStorage);
  localStorage.setItem(key, JSON.stringify(data));
}

export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  }
  // т.к. при получении данных из локал сторадж задержка не нужна, то использую задрержку только для записи в локалсторадж 
  setLocalStorageWithDelay(key, data);
}

export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  return a === b;
}

export function camelToDashCase(str) {
  return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

export function toInlineStyles(styles = {}) {
  return Object.keys(styles)
    .map((key) => `${camelToDashCase(key)}: ${styles[key]}`)
    .join(';');
}

export function debounce(fn, wait) {
  let timeout;
  return function (...args) {
    const later = () => {
      clearTimeout(timeout);
      // eslint-disable-next-line
      fn.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function preventDefault(event) {
  event.preventDefault();
}
