import modal from "./modal";
import {postData} from '../services/service'

function forms(formSelector) {
    const forms = document.querySelectorAll(formSelector),
          message = {
              sending: "Отправляем Вашу информацию",
              success: "С Вами свяжется наш специалист",
              failure: "Произошла ошибка. Попробуйте еще раз"
          }

    forms.forEach(item => {
        postFormData(item);
        checkFormInfo(item);
    });

    function postFormData(form) {


        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const formObject = Object.fromEntries(formData.entries())
            const json = JSON.stringify(formObject);

            if(formObject.user_phone.match(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)) {
                let statusMessage = document.createElement('div');
                statusMessage.innerHTML = `
                    <div>
                        <img src="../../assets/slick/ajax-loader.gif" alt=${message.sending}/>
                        <span>${message.sending}</span>
                    </div>
                `
                form.insertAdjacentElement('afterend', statusMessage);

                postData('http://localhost:3000/items', json)
                .then(() => {
                    statusMessage.remove();
                    showSubmitMessage(form, message.success);
                    console.log('Sent!')
                })
                .catch(error => {
                    showSubmitMessage(form, message.failure);
                    console.log(error)
                })
                .finally(() => {
                    form.reset();
                })
            } else {
                form.querySelector('[name="user_phone"]').value = '';
                form.querySelector('[name="user_phone"]').placeholder = 'Введите номер телефона в виде цифр';
            }
        })
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
        }, 2000)

    }

    function checkFormInfo(form) {
        const input = form.querySelector('[name="user_phone"]');

        input.addEventListener('input', () => {
            if(input.value.match(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)) {
                input.style.borderColor = "rgb(204,204,204)";
            } else {
                input.style.borderColor = 'red';
            }
        });
    }



    
}

export default forms;