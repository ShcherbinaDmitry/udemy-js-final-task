/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");

 // import {getData, postData} from './services/service';

window.addEventListener('DOMContentLoaded', function () {
  Object(_modules_modal__WEBPACK_IMPORTED_MODULE_0__["default"])('.popup_engineer_btn', '.popup_engineer');
  Object(_modules_modal__WEBPACK_IMPORTED_MODULE_0__["default"])('.phone_link', '.popup');
  Object(_modules_forms__WEBPACK_IMPORTED_MODULE_1__["default"])('form');
});

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/js/modules/modal.js");
/* harmony import */ var _services_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/service */ "./src/js/services/service.js");



function forms(formSelector) {
  const forms = document.querySelectorAll(formSelector),
        message = {
    sending: "Отправляем Вашу информацию",
    success: "С Вами свяжется наш специалист",
    failure: "Произошла ошибка. Попробуйте еще раз"
  };
  forms.forEach(item => {
    postFormData(item);
    checkFormInfo(item);
  });

  function postFormData(form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const formData = new FormData(form);
      const formObject = Object.fromEntries(formData.entries());
      const json = JSON.stringify(formObject);

      if (formObject.user_phone.match(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)) {
        let statusMessage = document.createElement('div');
        statusMessage.innerHTML = `
                    <div>
                        <img src="../../assets/slick/ajax-loader.gif" alt=${message.sending}/>
                        <span>${message.sending}</span>
                    </div>
                `;
        form.insertAdjacentElement('afterend', statusMessage);
        Object(_services_service__WEBPACK_IMPORTED_MODULE_1__["postData"])('http://localhost:3000/items', json).then(() => {
          statusMessage.remove();
          showSubmitMessage(form, message.success);
          console.log('Sent!');
        }).catch(error => {
          showSubmitMessage(form, message.failure);
          console.log(error);
        }).finally(() => {
          form.reset();
        });
      } else {
        form.querySelector('[name="user_phone"]').value = '';
        form.querySelector('[name="user_phone"]').placeholder = 'Введите номер телефона в виде цифр';
      }
    });
  }

  function showSubmitMessage(form, message) {
    const messageModal = document.createElement('div');
    messageModal.classList.add('message-modal');
    messageModal.innerHTML = `
            <div>
                ${message}          
            </div>
        `;
    form.insertAdjacentElement("afterend", messageModal);
    setTimeout(() => {
      messageModal.remove();
    }, 2000);
  }

  function checkFormInfo(form) {
    const input = form.querySelector('[name="user_phone"]');
    input.addEventListener('input', () => {
      if (input.value.match(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)) {
        input.style.borderColor = "rgb(204,204,204)";
      } else {
        input.style.borderColor = 'red';
      }
    });
  }
}

/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function openModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('popup_show');
  modal.classList.remove('popup_hide');
  document.body.style.overflow = 'hidden';
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('popup_hide');
  modal.classList.remove('popup_show');
  document.body.style.overflow = 'visible';
  modal.querySelector('.form').reset();
  modal.querySelector('[name="user_phone"]').style.borderColor = "rgb(204,204,204)";
}

function modal(triggerSelector, modalSelector) {
  const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);
  modalTrigger.forEach(elem => {
    elem.addEventListener('click', e => {
      e.preventDefault();
      openModal(modalSelector);
    });
  });
  document.addEventListener('keydown', e => {
    if (e.code === "Escape" && modal.classList.contains('popup_show')) {
      closeModal(modalSelector);
    }
  });
  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.parentElement.classList.contains('popup_close')) {
      closeModal(modalSelector);
    }
  });
}

/* harmony default export */ __webpack_exports__["default"] = (modal);

/***/ }),

/***/ "./src/js/services/service.js":
/*!************************************!*\
  !*** ./src/js/services/service.js ***!
  \************************************/
/*! exports provided: getData, postData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getData", function() { return getData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postData", function() { return postData; });
const postData = async (url, data) => {
  let result = await fetch(url, {
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    },
    body: data
  });

  if (!result.ok) {
    throw new Error(`Couldn't post data to ${url}, status: ${result.status}`);
  }

  return await result.json();
};

async function getData(url) {
  let result = await fetch(url);

  if (!result.ok) {
    throw new Error(`Couldn't get data from ${url}, status: ${result.status}`);
  }

  return await result.json();
}



/***/ })

/******/ });
//# sourceMappingURL=script.js.map