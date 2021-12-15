import { storage, debounce } from '@core/utils';
import { delayWriteToLocalStorage } from '../constants';

function storageName(param) {
  return 'excel:' + param;
}

export class LocalStorageClient {
  constructor(name) {
    this.name = storageName(name);
    // запускаю метод для создания debounce
    this.prepare();
  }

  prepare() {
    this.save = debounce(this.save, delayWriteToLocalStorage);
  }

  save(state) {
    storage(this.name, state);
    return Promise.resolve();
  }

  get() {
    return new Promise((resolve) => {
      const state = storage(this.name);

      setTimeout(() => {
        resolve(state);
      }, 2500);
    });
  }
}
