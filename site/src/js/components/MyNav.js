// Nav module
export class MyNav {

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
        this.btn.classList.toggle('animate', true);
        document.body.classList.toggle('fixed', true);
        return this.nav.querySelector('.overlay').style.height = "100%";
    }

    closeNav() {
        this.navIsOpen = false;
        this.btn.classList.toggle('animate', false);
        document.body.classList.toggle('fixed', false);
        return this.nav.querySelector('.overlay').style.height = "0%";
    }
}
