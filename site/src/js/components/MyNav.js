// Nav module
export class MyNav {

    constructor(nav) {
        this.nav = document.getElementById(nav);

        this.initBtn();
        this.initLinks();
    }

    initBtn() {
        this.btn = this.nav.querySelector('.open-btn');

        this.btn.oncontextmenu = false;
        this.navIsOpen = false;

        this.btn.addEventListener('click', () => {
            this.activate();
        }) 
    }

    initLinks() {
        this.nav.addEventListener('click', (e) => {
            e.preventDefault();
 
            let link = e.target.closest('[href^="#"]');
            if(!link) return;

            this.closeNav();

            const id = link.getAttribute('href');
            document.querySelector(id).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
        });
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
        this.toogleNav(true);
        return this.nav.querySelector('.overlay').style.height = "100%";
    }

    closeNav() {
        this.toogleNav(false);
        return this.nav.querySelector('.overlay').style.height = "0%";
    }

    toogleNav(isOpen) {
        this.navIsOpen = isOpen;
        this.btn.classList.toggle('animate', isOpen);
        document.body.classList.toggle('fixed', isOpen);
    }
}
