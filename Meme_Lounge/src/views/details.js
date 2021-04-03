import { html } from '../../node_modules/lit-html/lit-html.js'
import { deleteMeme, getMemeById } from '../api/data.js';

const detailsTemplate = (meme, isOwner, onDelete) => html`
<section id="meme-details">
    <h1>${meme.title}

    </h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src=${meme.imageUrl}>
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>
                ${meme.description}
            </p>

            <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
            ${isOwner ? html`
            <a class="button warning" href="/edit/${meme._id}">Edit</a>
            <button @click=${onDelete} class="button danger">Delete</button>
            `: ''}
            

        </div>
    </div>
</section>`;

export async function detailsPage(context) {
    
    const memeId = context.params.id
    const data = await getMemeById(memeId)
    const isOwner = data._ownerId == sessionStorage.getItem('userId')
    
    context.render(detailsTemplate(data, isOwner, onDelete));

    async function onDelete() {
        const confirmed = confirm('Are you sure you want t delete this meme?')
        if (confirmed) {
            await deleteMeme(data._id);
            context.page.redirect('/all-memes')
        }
    }
} 