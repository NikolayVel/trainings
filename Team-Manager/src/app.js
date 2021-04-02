import page from '../node_modules/page/page.mjs'
import {render} from '../node_modules/lit-html/lit-html.js'
import { logout} from './api/data.js'
import { homePage } from './views/home.js';
import { browsePage } from './views/browse.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { myTeamsPage } from './views/myTeams.js';


const main = document.querySelector('main');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

page('/', decorateContext, homePage);
page('/index.html', decorateContext, homePage);
page('/browse', decorateContext, browsePage);
page('/login', decorateContext, loginPage);
page('/register', decorateContext, registerPage);
page('/create', decorateContext, createPage);
page('/details/:id', decorateContext, detailsPage);
page('/edit/:id', decorateContext, editPage);
page('/my-teams', decorateContext, myTeamsPage);

page.start();
setUserNav();

function decorateContext(context, next) {
    context.render = (content) => render(content, main);
    context.setUserNav = setUserNav;
    next()
}

function setUserNav() {
    const userId = sessionStorage.getItem('userId');
    if (userId != null) {
        [...document.querySelectorAll('nav > a.user')].forEach(a => a.style.display = 'block');
        [...document.querySelectorAll('nav > a.guest')].forEach(a => a.style.display = 'none');
    } else {
        [...document.querySelectorAll('nav > a.user')].forEach(a => a.style.display = 'none');
        [...document.querySelectorAll('nav > a.guest')].forEach(a => a.style.display = 'block');
    }
}

async function onLogout() {
    await logout();
    setUserNav();
    page.redirect('/');
}