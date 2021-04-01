import page from '../node_modules/page/page.mjs'
import {render} from '../node_modules/lit-html/lit-html.js'

import {createPage} from './views/create.js'
import {dashboardPage} from './views/dashboard.js'
import {detailsPage} from './views/details.js'
import {editPage} from './views/edit.js'
import {loginPage} from './views/login.js'
import {myPage} from './views/myFurniture.js'
import {registerPage} from './views/register.js'

import * as data from './api/data.js'

window.data = data;

const main = document.querySelector('.container')

page('/', decorateContext, dashboardPage); // func "dashboardPage" or any other is a view controller: fetch data, interpolate template, handle user input, return content 
page('/dashboard',decorateContext, dashboardPage);
page('/details/:id',decorateContext, detailsPage);
page('/create',decorateContext, createPage);
page('/edit/:id',decorateContext, editPage);
page('/login',decorateContext, loginPage);
page('/myFurniture',decorateContext, myPage);
page('/register',decorateContext, registerPage);

document.getElementById('logoutBtn').addEventListener('click', async () => {
    await data.logout();
    setUserNav();
    page.redirect('/');
})

setUserNav();

// application start
page.start();

function decorateContext(context, next) {
    context.render = (content) => render(content, main);
    context.setUserNav = setUserNav;
    context.setActiveNav = setActiveNav;
    next();
}

function setUserNav() {
    const userId = sessionStorage.getItem('userId')
    if (userId != null) {
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}

function setActiveNav(link) {
    document.getElementById('catalogLink').classList.remove('active')
    document.getElementById('createLink').classList.remove('active')
    document.getElementById('profileLink').classList.remove('active')
    document.getElementById('loginLink').classList.remove('active')
    document.getElementById('registerLink').classList.remove('active')

    document.getElementById(link).classList.add('active')
}