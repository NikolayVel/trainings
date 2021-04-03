import {render} from '../node_modules/lit-html/lit-html.js'
import page from '../node_modules/page/page.mjs'
import { logout } from './api/data.js'
import { allMemesPage } from './views/allMemes.js'
import { createPage } from './views/create.js'
import { detailsPage } from './views/details.js'
import { editPage } from './views/edit.js'

import { homePage } from './views/home.js'
import { loginPage } from './views/login.js'
import { myProfilePage } from './views/myProfile.js'
import { registerPage } from './views/register.js'

const main = document.querySelector('main')
document.getElementById('logoutBtn').addEventListener('click', onLogout);

setUserNav();

page('/', decoratePage, homePage);
page('/login', decoratePage, loginPage);
page('/register', decoratePage, registerPage);
page('/all-memes', decoratePage, allMemesPage);
page('/create', decoratePage, createPage);
page('/edit/:id', decoratePage, editPage);
page('/my-profile', decoratePage, myProfilePage);
page('/details/:id', decoratePage, detailsPage);


page.start();



function decoratePage(context, next) {
    context.render = (content) => render(content, main);
    context.setUserNav = setUserNav;
    
    next();
}

function setUserNav(){
    const user = sessionStorage.getItem('authToken');
    if (user) {
        document.getElementById('welcomeMsg').textContent = `Welcome, ${sessionStorage.getItem('userEmail')}`
        document.getElementById('user-nav').style.display = ''
        document.getElementById('guest-nav').style.display = 'none'
    } else {
        document.getElementById('user-nav').style.display = 'none'
        document.getElementById('guest-nav').style.display = ''
    }
}

async function onLogout(){
    await logout();
    setUserNav();
    page.redirect('/');
}



