/**
 * 判断浏览器对Storage的支持
 *
 * @export
 * @class Browser
 */
class StorageJudge {
  /**
   * 是否支持SessionStorage
   * @returns {Boolean} true|false
   * @memberof BrowserStorage
   */
    isSessionStorage(): Boolean {
        let res = false;
        let testKey = 'test';
        let storage = window.sessionStorage;
        try {
            storage.setItem(testKey, 'testValue');
            storage.removeItem(testKey);
            res = true;
        } catch (error) {
            res = false;
        }
        this.isSessionStorage = function () {
            return res;
        };
        return res;
    }

  /**
   * 是否支持LocalStorage
   * @returns {Boolean} true|false
   * @memberof BrowserStorage
   */
    isLocalStorage(): Boolean {
        let res = false;
        let testKey = 'test';
        let storage = window.localStorage;
        try {
            storage.setItem(testKey, 'testValue');
            storage.removeItem(testKey);
            res = true;
        } catch (error) {
            res = false;
        }

        this.isLocalStorage = function () {
            return res;
        };

        return res;
    }
}

const storageJudge = new StorageJudge();

export {
    storageJudge,
    StorageJudge
};
