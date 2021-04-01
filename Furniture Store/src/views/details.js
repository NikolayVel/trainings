import { html } from '../../node_modules/lit-html/lit-html.js'
import { getItemById, deleteItem } from '../api/data.js'


const detailsTemplate = (data, isCreator, onClick) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Furniture Details</h1>
    </div>
</div>
<div class="row space-top">
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src=${data.img[0] == '.' ? data.img.slice(1) : data.img} />
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <p>Make: <span>${data.make}</span></p>
        <p>Model: <span>${data.model}</span></p>
        <p>Year: <span>${data.year}</span></p>
        <p>Description: <span>${data.description}</span></p>
        <p>Price: <span>${data.price}</span></p>
        <p>Material: <span>${data.material}</span></p>
        ${(isCreator ? html`<div @click=${onClick}>
            <a href=”#” class="btn btn-info">Edit</a>
            <a href=”#” class="btn btn-red">Delete</a>
        </div>` : '')}
    </div>
</div>
`;

export async function detailsPage(context) {
    const data = await getItemById(context.params.id)
    const isOwner = (data._ownerId == sessionStorage.getItem('userId'))
    context.render(detailsTemplate(data, isOwner, onClick))
    context.setActiveNav("catalogLink"); 

    async function onClick(event) {
        event.preventDefault();
        if (event.target.classList.contains('btn-red')) {
            const confirmed = confirm('Are you sure want to delete this item?')
            if (confirmed) {
                await deleteItem(context.params.id)
                context.page.redirect('/')
            }
        } else if (event.target.classList.contains('btn-info')) {
            context.page.redirect('/edit/' + context.params.id)
        }
    }
}