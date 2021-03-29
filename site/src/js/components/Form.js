export class Form {
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

