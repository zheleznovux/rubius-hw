export class Loader {
    constructor(elem) {
        this.elem = document.getElementById(elem);

        this.loadContent = this.elem.querySelector(".loader__load-content");
        this.loadFinishedContent = this.elem.querySelector(".loader__load-finished-content");
        this.loadErrorContent = this.elem.querySelector(".loader__load-error-content");
    }

    visible() {
        this.change("load");
        return this.elem.classList.toggle("loader_visible", true);
    }

    loadFinished() {
        return this.change("finished");
    }

    loadError() {
        return this.change("error");
    }

    hide() {
        return this.elem.classList.toggle("loader_visible", false);
    }

    change(type) {
        switch (type) {
            case "load":
                this.loadContent.classList.toggle("loader__load-content_visible", true);
                this.loadFinishedContent.classList.toggle("loader__load-finished-content_visible", false);
                this.loadErrorContent.classList.toggle("loader__load-error-content_visible", false);
                break;

            case "finished":
                this.loadContent.classList.toggle("loader__load-content_visible", false);
                this.loadFinishedContent.classList.toggle("loader__load-finished-content_visible", true);
                this.loadErrorContent.classList.toggle("loader__load-error-content_visible", false);
                break;

            case "error":
                this.loadContent.classList.toggle("loader__load-content_visible", false);
                this.loadFinishedContent.classList.toggle("loader__load-finished-content_visible", false);
                this.loadErrorContent.classList.toggle("loader__load-error-content_visible", true);
                break;

            default:
                this.loadContent.classList.toggle("loader__load-content_visible", false);
                this.loadFinishedContent.classList.toggle("loader__load-finished-content_visible", false);
                this.loadErrorContent.classList.toggle("loader__load-error-content_visible", true);
                break;
        }

    }
}