import * as api from './api.js' 

api.settings.host = 'http://localhost:3030';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

//Implement application specific requests

export async function getTeams() {
    const teams =  await api.get('/data/teams');
    const members = await getMembers(teams.map(t => t._id));
    teams.forEach(t => {t.memberCount = members.filter(m => m.teamId == t._id).length})
    console.log(teams)
    return teams;
}

export async function getMyTeams() {
    const userId = sessionStorage.getItem('userId');
    const teams = await api.get(`/data/members?where=_ownerId%3D%22${userId}%22%20AND%20status%3D%22member%22&load=team%3DteamId%3Ateams`)
    return teams
}

export async function getTeamById(id) {
    return await api.get('/data/teams/'+id)
}

export async function createTeam(data) {
    const team = await api.post('/data/teams', data)
    const request = await requestToJoin(team._id)
    await approveMember(request)
    return team
}

export async function editTeam(id, team) {
    return await api.put('/data/teams/'+id, team)
}

export async function deleteTeam(id) {
    return api.del('/data/teams/' + id)
}

export async function requestToJoin(teamId) {
    const body = {teamId}
    return await api.post('/data/members', body)
}

export async function getRequestsByTeamId(teamId){
    return await api.get(`/data/members?where=teamId%3D%22${teamId}%22&load=user%3D_ownerId%3Ausers`)
}

export async function cancelMembership(requestId) {
    return await api.del('/data/members/' + requestId);
}

export async function approveMember(request){
    const body = {
        teamId: request.teamId,
        status: 'member'
    }
    return await api.put('/data/members/'+request._id, body)

}

export async function getMembers(teamIds) {
    const query = encodeURIComponent(`teamId IN ("${teamIds.join('", "')}") AND status="member"`);
    return await api.get(`/data/members?where=${query}`)
}
