import {html} from '../../node_modules/lit-html/lit-html.js'
import {getTeams} from '../api/data.js'
import {teamTemplate} from '../views/common/team.js'

const browseTemplate = (teams) => html`
<section id="browse">

<article class="pad-med">
    <h1>Team Browser</h1>
</article>

<article class="layout narrow">
    <div class="pad-small"><a href="/create" class="action cta">Create Team</a></div>
</article>

${teams.map(teamTemplate)}

</section>
`;



export async function browsePage(context){
    const teams = await getTeams();
    context.render(browseTemplate(teams))
}