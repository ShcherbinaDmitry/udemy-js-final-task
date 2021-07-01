import checkNumInputs from "./checkNumInputs";

const forms = (state) => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input');

    checkNumInputs('input[name="user_phone"]');
    
    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);
            if (item.getAttribute('data-calc') === "end") {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }
            const formObject = Object.fromEntries(formData.entries())
            const json = JSON.stringify(formObject);

            postData('http://localhost:3000/items', json)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => statusMessage.textContent = message.failure)
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 5000);
                });
        });
    });
};

export default forms;

// import {postData} from '../services/service'

// function forms(formSelector) {
//     const forms = document.querySelectorAll('form'),
//           inputs = document.querySelectorAll('input'),
//           phoneInputs = document.querySelectorAll('input[name="user_phone"]'),
//           message = {
//               sending: "Отправляем Вашу информацию",
//               success: "С Вами свяжется наш специалист",
//               failure: "Произошла ошибка. Попробуйте еще раз"
//           };

//     phoneInputs.forEach(item => {
//         item.addEventListener('input', () => {
//             item.value = item.replace(/\D/, '');
//         })
//     })
    

//     forms.forEach(item => {
//         postFormData(item);
//         checkFormInfo(item);
//     });

//     function postFormData(form) {
//         form.addEventListener('submit', (e) => {
//             e.preventDefault();

//             const formData = new FormData(form);
//             const formObject = Object.fromEntries(formData.entries())
//             const json = JSON.stringify(formObject);

//             if(formObject.user_phone.match(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)) {
//                 let statusMessage = document.createElement('div');
//                 statusMessage.innerHTML = `
//                     <div>
//                         <img src="../../assets/slick/ajax-loader.gif" alt=${message.sending}/>
//                         <span>${message.sending}</span>
//                     </div>
//                 `
//                 form.insertAdjacentElement('beforeend', statusMessage);

//                 postData('http://localhost:3000/items', json)
//                 .then(() => {
//                     statusMessage.remove();
//                     showSubmitMessage(form, message.success);
//                     console.log('Sent!')
//                 })
//                 .catch(error => {
//                     showSubmitMessage(form, message.failure);
//                     console.log(error)
//                 })
//                 .finally(() => {
//                     form.reset();
//                 })
//             } else {
//                 form.querySelector('[name="user_phone"]').value = '';
//                 form.querySelector('[name="user_phone"]').placeholder = 'Введите номер телефона в виде цифр';
//             }
//         })
//     }

//     function showSubmitMessage(form, message) {

//         const messageModal = document.createElement('div');
//         messageModal.classList.add('message-modal');
//         messageModal.innerHTML = `
//             <div>
//                 ${message}          
//             </div>
//         `;

//         form.insertAdjacentElement("beforeend", messageModal);

//         setTimeout(() => {
//             messageModal.remove();
//         }, 2000)

//     }

//     function checkFormInfo(form) {
//         const input = form.querySelector('[name="user_phone"]');

//         input.addEventListener('input', () => {
//             if(input.value.match(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)) {
//                 input.style.borderColor = "rgb(204,204,204)";
//             } else {
//                 input.style.borderColor = 'red';
//             }
//         });
//     }



    
// }

// export default forms;