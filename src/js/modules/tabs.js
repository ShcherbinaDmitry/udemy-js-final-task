function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass, display = 'block') {
    const tabs = document.querySelectorAll(tabsSelector),
          tabsContent = document.querySelectorAll(tabsContentSelector),
          tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent() {

        tabsContent.forEach(item => {
            item.style.display = 'none';
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].style.display = display;
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();


    tabsParent.addEventListener('click', (e) => {
        const target = e.target;
        if (target && (target.classList.contains(tabsSelector.slice(1)) ||
        target.parentElement.classList.contains(tabsSelector.slice(1)))) {
            tabs.forEach((item, i) => {
                if (target.parentElement == item || target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    })
}

export default tabs;