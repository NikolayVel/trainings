import { html } from '../../node_modules/lit-html/lit-html.js'
import {getUserMemes } from '../api/data.js';

const myProfileTemplate = (memes, username, userEmail) => html`
<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <img id="user-avatar-url" alt="user-profile" src="/images/female.png">
        <div class="user-content">
            <p>Username: ${username}</p>
            <p>Email: ${userEmail}</p>
            <p>My memes count: ${memes.length}</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">
        <!-- Display : All created memes by this user (If any) -->
        ${memes.length > 0 ? 
            memes.map(userMemes) : 
            html`<p class="no-memes">No memes in database.</p>
            `}

        <!-- Display : If user doesn't have own memes  -->
    </div>
</section>`;

const userMemes = (meme) => html`<div class="user-meme">
<p class="user-meme-title">${meme.title}</p>
<img class="userProfileImage" alt="meme-img" src=${meme.imageUrl}>
<a class="button" href=${`/details/${meme._id}`}>Details</a>
</div>`;

export async function myProfilePage(context) {
    const userId = sessionStorage.getItem('userId')
    const username = sessionStorage.getItem('username');
    const userEmail = sessionStorage.getItem('userEmail');

    const memes = await getUserMemes(userId)
    context.render(myProfileTemplate(memes, username, userEmail));
    console.log(memes)

}