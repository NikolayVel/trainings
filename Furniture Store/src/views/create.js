import {html} from '../../node_modules/lit-html/lit-html.js'
import {createItem} from '../api/data.js'

const createTemplate = (onSubmit, validModel, validYear, validDescription, validPrice, validImg) => html`
<div class="row space-top">
            <div class="col-md-12">
                <h1>Create New Furniture</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${onSubmit}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-make">Make</label>
                        <input class="form-control valid" id="new-make" type="text" name="make">
                    </div>
                    <div class="form-group has-success">
                        <label class="form-control-label" for="new-model">Model</label>
                        <input @change =${validModel} class="form-control" id="new-model" type="text" name="model">
                    </div>
                    <div class="form-group has-danger">
                        <label class="form-control-label" for="new-year">Year</label>
                        <input @change =${validYear} class="form-control" id="new-year" type="number" name="year">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-description">Description</label>
                        <input @change =${validDescription} class="form-control" id="new-description" type="text" name="description">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-price">Price</label>
                        <input @change =${validPrice} class="form-control" id="new-price" type="number" name="price">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-image">Image</label>
                        <input @change =${validImg} class="form-control" id="new-image" type="text" name="img">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-material">Material (optional)</label>
                        <input class="form-control" id="new-material" type="text" name="material">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Create" />
                </div>
            </div>
        </form>
`;

const validation = {
    validYear: false,
    validModel: false,
    validDescription: false,
    validPrice: false,
    validImg: false,

}
export async function createPage(context){
    context.render(createTemplate(onSubmit,validModel, validYear, validDescription, validPrice, validImg))
    context.setActiveNav("createLink"); 
    async function onSubmit(event){
        event.preventDefault();
        if (Object.values(validation).some((el) => el==false)){
            return alert('All fields must contain valid data')
        }

        const formData = new FormData(event.target);
        const allData = [...formData.entries()];
        const data = allData.reduce((a, [k,v]) => Object.assign(a, {[k]: v}), {});
        await createItem(data)

        context.page.redirect('/')


    }
}

function validYear(event) {
    
    if ((event.target).value >= 1950 && 2050 >= (event.target).value) {
        event.target.classList.add('is-valid')
        event.target.classList.remove('is-invalid')
        validation.validYear =  true
    } else {
        event.target.classList.add('is-invalid')
        event.target.classList.remove('is-valid')
        validation.validYear =  false
    }

    
}

function validModel(event) {
    if((event.target).value.length > 3) {
        event.target.classList.add('is-valid')
        event.target.classList.remove('is-invalid')
        validation.validModel = true
    } else {
        event.target.classList.remove('is-valid')
        event.target.classList.add('is-invalid')
        validation.validModel = false
    }
}
function validDescription(event) {
    if((event.target).value.length > 10) {
        event.target.classList.add('is-valid')
        event.target.classList.remove('is-invalid')
        validation.validDescription = true
    } else {
        event.target.classList.remove('is-valid')
        event.target.classList.add('is-invalid')
        validation.validDescription = false
    }
}

function validPrice(event) {
    if((event.target).value >= 0 && (event.target).value.length > 0) {
        event.target.classList.add('is-valid')
        event.target.classList.remove('is-invalid')
        validation.validPrice = true
    } else {
        event.target.classList.remove('is-valid')
        event.target.classList.add('is-invalid')
        validation.validPrice = false
    }
}

function validImg(event) {
    if((event.target).value.length >= 0) {
        event.target.classList.add('is-valid')
        event.target.classList.remove('is-invalid')
        validation.validImg = true
    } else {
        event.target.classList.remove('is-valid')
        event.target.classList.add('is-invalid')
        validation.validImg = false
    }
}

