import * as api from './api.js' 

api.settings.host = 'http://localhost:3030';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

//Implement application specific requests

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