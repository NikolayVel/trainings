import { html } from '../../node_modules/lit-html/lit-html.js'
import {editItem, getItemById} from '../api/data.js'

const editTemplate = (data, onChange, onSubmit) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Edit Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @change=${onChange} @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class="form-control" id="new-make" type="text" name="make" .value=${data.make}>
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class="form-control" id="new-model" type="text" name="model" .value=${data.model}>
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class="form-control" id="new-year" type="number" name="year" .value=${data.year}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class="form-control" id="new-description" type="text" name="description" .value=${data.description}>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class="form-control" id="new-price" type="number" name="price" .value=${data.price}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class="form-control" id="new-image" type="text" name="img" .value=${data.img}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material" value=${data.material}>
            </div>
            <input type="submit" class="btn btn-info" value="Edit" />
        </div>
    </div>
</form>`;

const validator = {
    model: (v) => {return v.length > 3},
    year: (v) => {return (v >=1950 && v <= 2050)},
    description: (v) => {return v.length>10},
    price: (v) => {return v > 0},
    img: (v) => {return v.length > 0},

}

export async function editPage(context) {
    const initialData = await getItemById(context.params.id)
    context.render(editTemplate(initialData, onChange, onSubmit))
    context.setActiveNav("catalogLink"); 
    
    function onChange(event) {
        if (Object.keys(validator).includes(event.target.name)) {

            if (validator[event.target.name]((event.target).value)) {
                event.target.classList.add('is-valid')
                event.target.classList.remove('is-invalid')
                
            } else{
                event.target.classList.remove('is-valid')
                event.target.classList.add('is-invalid')
            }
        }
            
        //console.log(data)  /// TODO: integrate validation for the submit event  
        
    }

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = [...formData.entries()].reduce((a, [k,v]) => Object.assign(a, {[k]:v}), {});
        data.year = Number(data.year);
        data.price = Number(data.price);
        
       if (validator['model'](data.model) && validator['year'](data.year) && validator['description'](data.description) && validator['price'](data.price) && validator.img(data.img)) {
           
            await editItem(context.params.id,data);
           context.page.redirect('/details/'+context.params.id)
       } else {
           alert('Please fullfil correctly all the fields!')
       }
    }
   
}