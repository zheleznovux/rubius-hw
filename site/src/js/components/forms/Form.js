import IMask from 'imask';
import { Loader } from "../Loader";
import ApiServis from '../../services/api-service';

export class Form {
    
    constructor(element) {
        this.element = element;
        this.formElement = element.querySelector("#form");
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

        if (counter = 2) {
            this.sendData(formData);
        }

    }

    async sendData(formData) {

        const loader = new Loader("loader");
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
