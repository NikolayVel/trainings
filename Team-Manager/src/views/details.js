import { html } from '../../node_modules/lit-html/lit-html.js'
import { until } from '../../node_modules/lit-html/directives/until.js'
import { getTeamById, requestToJoin, getRequestsByTeamId, cancelMembership, approveMember } from '../api/data.js'
import { loaderTemplate } from './common/loader.js';

const detailsTemplate = (team, isOwner, createControls, members, pending) => html`
<section id="team-home">
    <article class="layout">
        <img src=${team.logoUrl} class="team-logo left-col">
        <div class="tm-preview">
            <h2>${team.name}</h2>
            <p>${team.description}</p>
            <span class="details">${team.numberOfMembers} Members</span>
            <div>


                ${createControls()}

            </div>
        </div>
        <div class="pad-large">
            <h3>Members</h3>
            <ul class="tm-members">
                ${members.map(m => memberTemplate(m, isOwner))}

            </ul>
        </div>

        ${isOwner ? html`<div class="pad-large">
            <h3>Membership Requests</h3>
            <ul class="tm-members">
                ${pending.map(pendingTemplate)}

            </ul>
        </div>`: ''}

    </article>
</section>
`;

const memberTemplate = (request, isOwner) => html`
<li>${request.user.username}${isOwner ? html`<a @click=${request.decline}href="javascript:void(0)"
        class="tm-control action">Remove from team</a>` : ''}</li>
`;

const pendingTemplate = (request) => html`
<li>${request.user.username}
    <a @click=${request.approve} href="javascript:void(0)" class="tm-control action">Approve</a>
    <a @click=${request.decline} href="javascript:void(0)" class="tm-control action">Decline</a>
</li>`;


export async function detailsPage(context) {
    const teamId = context.params.id;

    context.render(until(populateTemplate(teamId), loaderTemplate()))

    // TODO load members 
    async function populateTemplate(teamId) {
        const userId = sessionStorage.getItem('userId')
        const [team, requests] = await Promise.all([
            getTeamById(teamId),
            getRequestsByTeamId(teamId)
        ]);

        const isOwner = (userId == team._ownerId)
        const members = requests.filter(r => r.status == 'member')
        team.numberOfMembers = members.length

        requests.forEach(r => {
            r.approve = (e) => approve(e, r);
            r.decline = (e) => leave(e, r._id);
        });

        const pending = requests
            .filter(r => r.status == 'pending');


        return detailsTemplate(team, isOwner, createControls, members, pending);

        function createControls() {
            if (userId != null) {
                const request = requests.find(r => r._ownerId == userId);
                if (isOwner) {
                    return html`<a href=${'/edit/' + team._id} class="action">Edit team</a>`
                } else if (request && request.status == 'member') {
                    return html`<a @click=${e=> leave(e, request._id)} href="javascript:void(0)" class="action invert">Leave team</a>`
                } else if (request && request.status == 'pending') {
                    return html`Membership pending. <a @click=${e=> leave(e, request._id)} href="javascript:void(0)">Cancel request</a>`
                } else {
                    return html`<a @click=${join} href="javascript:void(0)" class="action">Join team</a>`
                }
            } else {
                return ''
            }
        }

        async function join(event) {
            event.target.remove()
            await requestToJoin(teamId);
            context.render(await populateTemplate(teamId))

        }
        async function leave(event, requestId) {
            const confirmed = confirm('Are you sure you want to leave?')
            if (confirmed) {
                event.target.remove();
                await cancelMembership(requestId)
                context.render(await populateTemplate(teamId))
            }
        }

        async function approve(event, request) {
            event.target.remove();
            await approveMember(request)
            context.render(await populateTemplate(teamId))
        }
    }
}

