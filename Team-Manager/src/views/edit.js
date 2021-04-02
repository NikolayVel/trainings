import { html } from '../../node_modules/lit-html/lit-html.js'
import { until } from '../../node_modules/lit-html/directives/until.js'
import { getTeamById, editTeam } from '../api/data.js'
import { loaderTemplate } from './common/loader.js';

const editTemplate = (teamData, onSubmit, errMsg) => html`
<section id="edit">
    <article class="narrow">
        <header class="pad-med">
            <h1>Edit Team</h1>
        </header>
        <form @submit=${onSubmit} id="edit-form" class="main-form pad-large">
            ${errMsg ? html`<div class="error">${errMsg}</div>`: ''}
            <label>Team name: <input type="text" name="name" .value=${teamData.name}></label>
            <label>Logo URL: <input type="text" name="logoUrl" .value=${teamData.logoUrl}></label>
            <label>Description: <textarea name="description" .value=${teamData.description}></textarea></label>
            <input class="action cta" type="submit" value="Save Changes">
        </form>
    </article>
</section>
`;

export async function editPage(context) {
    const teamId = context.params.id
    let teamData =''
    context.render(until(populateTemplate(), loaderTemplate()));

    async function populateTemplate() {
        teamData = await getTeamById(teamId)
        return editTemplate(teamData, onSubmit)
    }
    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const name = formData.get('name');
        const logoUrl = formData.get('logoUrl');
        const description = formData.get('description');
        [...event.target.querySelectorAll('input')].forEach(i => i.disabled = true)
        
        try {
            if (name.length < 4) {
                throw new Error('Team name must be at least 4 characters long')
            }
            if (logoUrl.length < 1) {
                throw new Error('Logo URL is required')
            }
            if (description.length < 10) {
                throw new Error('Description must be at least 10 characters long')
            }

            const team = await editTeam(teamId,{name, description, logoUrl})
            event.target.reset();
            context.page.redirect('/details/' + team._id);


        } catch (err) {
            console.log(err)
            context.render(editTemplate(teamData, onSubmit, err.message))
        } finally {
            [...event.target.querySelectorAll('input')].forEach(i => i.disabled = false)

        }

    }
}