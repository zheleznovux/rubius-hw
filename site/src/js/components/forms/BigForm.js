import ApiService from '../../services/api-service';
import { Form } from './Form';

export class BigForm extends Form {

    constructor(formElement) {
        super(formElement);
        this.selects = this.formElement.querySelectorAll('select');
    }

    //override
    async init() {
        try 
        {
            this.setDate();

            this.updateMastersData();
            this.updateServiceData();
        } 
        catch (err) 
        {
            console.error(err);
        }
        finally 
        {
            super.init();
        }
    }

    setDate() {
        const dateInput = this.formElement.querySelector('[name="visitDate"]');

        var today = new Date();
        var dd = (today.getDate() < 10) ?
            "0" + today.getDate() :
            today.getDate();

        var mm = ((today.getMonth() + 1) < 10) ?
            "0" + (today.getMonth() + 1) :
            (today.getMonth() + 1);

        var mmEnd = ((today.getMonth() + 4) < 10) ?
            "0" + (today.getMonth() + 4) :
            (today.getMonth() + 4);

        const yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        const endDay = yyyy + '-' + mmEnd + '-' + dd;

        dateInput.setAttribute("min", today);
        dateInput.setAttribute("max", endDay);
    }

    async updateServiceData() 
    {
        let data = [];
        const select = this.formElement.querySelector(`[name="serviceId"]`);

        try 
        {
            data = await ApiService.getSaloonServices();
            console.log(data);
            data.forEach((el) => {
                select.append(this.createServiceEl(el));
            });
        } 
        catch(err)
        {
            console.error(err);
        }
    }

    async updateMastersData() 
    {
        let data = []; 
        const select = this.formElement.querySelector(`[name="masterId"]`);

        try 
        {
            data = await ApiService.getMasters();
            data.forEach((el) => {
                select.append(this.createStaffEl(el));
            })
        } 
        catch(err)
        {
            console.error(err);
        }
    }

    createServiceEl(data) {
        const element = document.createElement("option");
        element.value = data.id;
        element.textContent = data.name;
        return element;
    }

    createStaffEl(data) {
        const element = document.createElement("option");
        element.value = data.id;
        element.textContent = data.fullName;
        return element;
    }

    //@override
    async validate() {
        const formData = {};
        let counter = 0;

        this.inputs.forEach((input) => {
            if (input.value.length > 0) {
                formData[input.name] = input.value;
                input.classList.toggle('err', false);
                counter++;
            } else {
                input.classList.toggle('err', true);
            }
        });

        this.selects.forEach((select) => {
            formData[select.name] = select.value;
        })

        if (counter > 2) {
            await super.sendData(formData);
            $.fancybox.close();
        }
    }
}
