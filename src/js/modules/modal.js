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
        elem.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(modalSelector);
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('popup_show')) {
            closeModal(modalSelector);
        }
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.parentElement.classList.contains('popup_close')) {
            closeModal(modalSelector);
        }
    })
}

export default modal;