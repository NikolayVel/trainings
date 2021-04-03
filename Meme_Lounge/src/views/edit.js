import { html } from '../../node_modules/lit-html/lit-html.js'
import { editMeme, getMemeById } from '../api/data.js';
import {notify} from './commonError.js'

const editTemplate = (currentData, onSubmit) => html`

<section id="edit-meme">
    <form @submit=${onSubmit} id="edit-form">
        <h1>Edit Meme</h1>
        <div class="container">
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title" .value=${currentData.title}>
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description">${currentData.description}</textarea>
            <label for="imageUrl">Image Url</label>
            <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${currentData.imageUrl}>
            <input type="submit" class="registerbtn button" value="Edit Meme">
        </div>
    </form>
</section>`;

export async function editPage(context) {
    const memeId = context.params.id;
    const currentData = await getMemeById(memeId);
    context.render(editTemplate(currentData, onSubmit))

    async function onSubmit(event){
        event.preventDefault();

        const formData = new FormData(event.target);
        const title = formData.get('title');
        const description = formData.get('description');
        const imageUrl = formData.get('imageUrl');

        try {

            if (title == '' || description =='' || imageUrl == ''){
                throw new Error( "All fields are required")
                
            }
            
            await editMeme(memeId, {title, description, imageUrl});
            context.page.redirect('/details/'+memeId);
        }catch(err) {
            notify(err.message);
        }
    }
}

