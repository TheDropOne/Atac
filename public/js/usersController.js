/**
 * Created by Semen on 22-May-17.
 */
/* global XMLHttpRequest */

const usersController = (function () {
  const request = new XMLHttpRequest();

  function logIn(user) {
    return new Promise((resolve, reject) => {
      request.open('POST', '/login');
      request.setRequestHeader('content-type', 'application/json');
      request.onload = function load() {
        if (this.status === 200) {
          resolve(JSON.parse(request.responseText));
        } else {
          const error = new Error(this.statusText);
          error.code = this.status;
          reject(error);
        }
      };
      request.onerror = function () {
        reject(new Error('Log in request error'));
      };
      request.send(JSON.stringify(user));
    });
  }

  function logOut() {
    return new Promise((resolve, reject) => {
      request.open('GET', '/logout');
      request.setRequestHeader('content-type', 'application/json');
      request.onload = function load() {
        if (this.status === 200) {
          resolve();
        } else {
          const error = new Error(this.statusText);
          error.code = this.status;
          reject(error);
        }
      };
      request.onerror = function () {
        reject(new Error('Log out request error'));
      };
      request.send();
    });
  }

  return {
    logIn,
    logOut,
  };
}());