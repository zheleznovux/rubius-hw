export class MinText {
    constructor(element) {
        this.block = document.getElementById(element);
        this.subElements = this.block.querySelectorAll('.about__sub-description');
        this.btn = this.block.querySelector('button');
        this.addBtnListener();
    }
    
    addBtnListener() {
        this.btn.addEventListener("click", () => {
            this.toggleText();
        });
    }

    toggleText() {
        this.subElements.forEach((element) => {
            element.classList.toggle("show");
            setTimeout(()=>{
                element.classList.toggle("visible");
            },)
        }); 
    }
}