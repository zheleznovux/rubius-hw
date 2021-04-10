import IMask from 'imask';
import { FormLoader } from "./Loader";
import ApiServis from '../../services/api-service';

export class Form {
    
    constructor(element, formElement = "form") {
        this.element = document.getElementById(element);

        formElement = '#' + formElement;
        this.formElement = this.element.querySelector(formElement);
        
        this.inputs = this.formElement.querySelectorAll('input');

        this.init();
    }

    init() {

        IMask(this.formElement.querySelector('[name="phone"]'), {
            mask: '+{7} (000) 000-00-00'
          });

        this.formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            
            this.validate();
        });        
    }

    validate() {

        const formData = {};
        var counter = 0;

        this.inputs.forEach((input) => {
            if (input.value.length > 0) {
                formData[input.name] = input.value;
                input.classList.toggle('err', false);
                counter++;
            } else {
                input.classList.toggle('err', true);
            }
        });

        if (counter == 2) {
            this.sendData(formData);
        }

    }

    async sendData(formData) {

        const loader = new FormLoader("loader");
        try 
        {
            loader.visible();

            const res = await ApiServis.createOrder(formData);

            loader.loadFinished();
            await this.timeout(3000);
            this.formElement.reset(); 
        } 
        catch(err)
        {
            console.error(err);
            loader.loadError();
            await this.timeout(3000);
        } 
        finally 
        {
            loader.hide();
        }    
    }

    timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
