import { html } from '../../node_modules/lit-html/lit-html.js'
import { getAllMemes } from '../api/data.js';

const allMemesTemplate = (allMemes) => html`

        <!-- All Memes Page ( for Guests and Users )-->
        <section id="meme-feed">
            <h1>All Memes</h1>
            <div id="memes">
                <!-- Display : All memes in database ( If any ) -->
                ${(allMemes.length>0 ? allMemes.map(individualMemeTemplate): html`<p class="no-memes">No memes in database.</p>`)}
        
                <!-- Display : If there are no memes in database -->
                
            </div>
        </section>
`;

const individualMemeTemplate = (meme) => html`
<div class="meme">
    <div class="card">
        <div class="info">
            <p class="meme-title">${meme.title}</p>
            <img class="meme-image" alt="meme-img" src=${meme.imageUrl}>
        </div>
        <div id="data-buttons">
            <a class="button" href=${`/details/${meme._id}`}>Details</a>
        </div>
    </div>
</div>
`;

export async function allMemesPage(context) {
    const allMemes = await getAllMemes();
    context.render(allMemesTemplate(allMemes));
}