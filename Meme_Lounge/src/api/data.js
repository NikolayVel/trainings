import * as api from './api.js' 

api.settings.host = 'http://localhost:3030';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

//Implement application specific requests

export async function getAllMemes(){
    return await api.get('/data/memes?sortBy=_createdOn%20desc')
} 

export async function getMemeById(id) {
    return await api.get('/data/memes/'+id)
}

export async function createMeme(data){
    return await api.post('/data/memes', data);
}

export async function editMeme(id, data) {
    return api.put('/data/memes/'+id, data)
}

export async function deleteMeme(id) {
    return await api.del('/data/memes/'+id)
}

export async function getUserMemes(userId){
    return await api.get(`/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}


 /*
export async function getItems() {
    return await api.get('/data/catalog')
}

export async function getItemById(id) {
    return await api.get('/data/catalog/'+id)
}

export async function getMyItems() {
    const userId = sessionStorage.getItem('userId')
    return await api.get(`/data/catalog?where=_ownerId%3D%22${userId}%22`)
}

export async function createItem(data) {
    return await api.post('/data/catalog', data)
}

export async function editItem(id, data) {
    return await api.put('/data/catalog/' + id, data)
}

export async function deleteItem(id) {
    return await api.del('/data/catalog/'+id)
}
*/