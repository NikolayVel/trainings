const settings = {
    host: ''
}

export {
    get,
    post,
    put,
    del,
    login,
    register,
    logout,
    settings,
}

async function request(url, options) {
    const response = await fetch(url, options);
    
    if (response.ok == false) {
        const err = await response.json();
        alert(err.message);
        throw new Error(err.message); // sends the error to the module that have invoked this function, otherwise will receive undefined 
    }
    
    try {
        return await response.json();
    } catch (err) {
        return response
    }
}

function createOptions(method = 'get', data) {
    const result = {
        method,
        headers: {}
    };

    if (data != null) {
        result.headers['Content-Type'] = 'application/json';
        result['body'] = JSON.stringify(data);
        }

    const token = sessionStorage.getItem('authToken');

    if (token) {
        result.headers['X-Authorization'] = token;
    }

    return result;
}

async function get(url) {
    return await request(settings.host + url, createOptions());
}

async function post(url, data) {
    return await request(settings.host + url, createOptions('post', data))
}

async function put(url, data) {
    return await request(settings.host + url, createOptions('put', data))
}

async function del(url, data) {
    return await request(settings.host + url, createOptions('delete', data))
}

async function login(email, password) {
    const response = await post('/users/login', {email, password });

    sessionStorage.setItem('authToken', response.accessToken);
    sessionStorage.setItem('userEmail', response.email);
    sessionStorage.setItem('userId', response._id);
    sessionStorage.setItem('username', response.username);

    return response
}
async function register(data) {
    const response = await post('/users/register', data);

    sessionStorage.setItem('authToken', response.accessToken);
    sessionStorage.setItem('userEmail', response.email);
    sessionStorage.setItem('userId', response._id);
    sessionStorage.setItem('username', response.username);

    return response
}

async function logout() {
    const response = await get('/users/logout')
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userId');

    return response;
}
