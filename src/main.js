// Nav module
class MyNav {
    
    constructor(nav) {
        this.nav = document.getElementById(nav);
        this.btn = this.nav.querySelector('.open-btn');

        this.initBtn();
        this.initLinks();
    }

    // constructor() {} ???

    initBtn() {
        this.btn.oncontextmenu = false;
        this.navIsOpen = false;

        this.btn.addEventListener('click', () => {
            this.activate();
        })
    }

    initLinks() {
        const links = this.nav.querySelectorAll('[href^="#"]');

        links.forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const id = link.getAttribute('href');

                this.closeNav();

                document.querySelector(id).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            });
        })
    }

    getNav() {
        return this.nav;
    }

    setNav(nav) {
        this.nav = document.getElementById(nav);
    }

    activate() {
        if (this.navIsOpen) {
            return this.closeNav();
        } else {
            return this.openNav();
        }
    }

    openNav() {
        this.navIsOpen = true;
        this.btn.classList.toggle('animate');
        return this.nav.querySelector('.overlay').style.height = "100%";
    }

    closeNav() {
        this.navIsOpen = false;
        this.btn.classList.toggle('animate');
        return this.nav.querySelector('.overlay').style.height = "0%";
    }
}

// carousel module
$(function () {
    $('.portfolio__carousel').slick({
        infinite: true,
        centerMode: true,
        slidesToShow: 3,
        swipeToSlide: true,
        slidesToScroll: 1,
        prevArrow: $('.portfolio__btn-left'),
        nextArrow: $('.portfolio__btn-right'),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true
                }
            },
            {
                breakpoint: 880,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
});

// tabs module
class TabItem {
    constructor(link, content) {
        this.link = link;
        this.content = content;
    }

    onClick(callback) {
        this.link.addEventListener('click', () => callback());
    }

    activate() {
        this._toggle(true);
    }

    deactivate() {
        this._toggle(false);
    }

    _toggle(activate) {
        this.link.classList.toggle('active-links', activate);
        this.content.classList.toggle('active', activate);
    }
}


class TabsManager {

    constructor(tabsElem) {
        this.tabs = [];
        this.activeTab = null;

        this.init(tabsElem);
        this.activateTab(this.tabs[0]);
    }

    init(tabsElem) {
        const links = tabsElem.querySelectorAll('.prices__links-item');
        const contents = tabsElem.querySelectorAll('.prices__list');

        for (let i = 0; i < links.length; i++) {
            const tab = new TabItem(links[i], contents[i]);
            this.tabs.push(tab);

            tab.onClick(() => this.activateTab(tab));
        }
    }

    activateTab(tab) {
        if (this.activeTab) {
            this.activeTab.deactivate();
        }

        this.activeTab = tab;
        this.activeTab.activate();
    }
}


//  form module
class Form {
    constructor(formElement) {
        this.formElement = formElement;
        this.init();
    }

    init() {
        const inputs = this.formElement.querySelectorAll('input');

        this.formElement.addEventListener('submit', (event) => {
            event.preventDefault();

            const formData = {};

            inputs.forEach((input) => {
                if (input.value.length > 0) {
                    formData[input.name] = input.value;
                    input.classList.toggle('err', false);
                } else {
                    input.classList.toggle('err', true);
                }
            });

            if (Object.keys(formData).length == inputs.length) {
                this.sendData(formData);
            }
        })
    }

    sendData(formData) {
        console.log(formData);

        this.formElement.reset();
    }
}

window.onload = function () {
    const tabsElem = document.getElementById('prices');
    new TabsManager(tabsElem);

    const formElement = document.getElementById('feedback-form');
    new Form(formElement);

    const nav = new MyNav('nav');

}
