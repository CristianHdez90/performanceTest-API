// import http from 'k6/http';
// import { check } from 'k6';

// export const options = {
//     usuariosVirtuales: 5,
//     duration: '10s',
//     thresholds: {
//         http_req_duration: ['p(95)<800'],
//         http_req_failed: ['rate<0.01'],
//     },
// };

// const BASE_URL = __ENV.BASE_URL_API;
// const API_KEY = __ENV.API_KEY;

// export default function () {

//     const params = {
//         headers: {
//             'x-api-key': API_KEY,
//         },
//     };

//     const res = http.get(`${BASE_URL}/users?page=1`, params);

//     check(res, {
//         'status 200': (r) => r.status === 200,
//     });
// }

import http from 'k6/http';
import { check } from 'k6';

export const options = {
    vus: 5,
    duration: '10s',
};

const BASE_URL = __ENV.BASE_URL_API;
const API_KEY = __ENV.API_KEY;

export default function () {

    const params = {
        headers: {
            'x-api-key': API_KEY,
            'Content-Type': 'application/json',
        },
    };

    // =========================
    // GET /users
    // =========================
    const getRes = http.get(`${BASE_URL}/users?page=1`, params);
    check(getRes, {
        'GET status 200': (r) => r.status === 200,
    });

    // =========================
    // POST /register
    // =========================
    const postPayload = JSON.stringify({
        email: 'eve.holt@reqres.in',
        password: 'pistol',
    });
    const postRes = http.post(`${BASE_URL}/register`, postPayload, params);
    check(postRes, {
        'POST status 200': (r) => r.status === 200,
        'POST contiene id': (r) => r.json('id') === 4,
        'POST contiene token': (r) => r.json('token') !== undefined,
    });

    // =========================
    // PUT /users/1
    // =========================
    const putPayload = JSON.stringify({
        email: "george.bluth@reqres.in",
        first_name: "GeorgeTest",
        last_name: "Bluth",
        avatar: "https://reqres.in/img/faces/1-image.jpg"
    });
    const putRes = http.put(`${BASE_URL}/users/1`, putPayload, params);
    check(putRes, {
        'PUT status 200': (r) => r.status === 200,
        'PUT contiene first_name': (r) => r.json('first_name') === 'GeorgeTest',
    });

    // =========================
    // DELETE /users/2
    // =========================
    const deleteRes = http.del(`${BASE_URL}/users/2`, null, params);
    check(deleteRes, {
        'DELETE status 204': (r) => r.status === 204,
    });

    // =========================
    // Logs
    // =========================
    // console.log('GET Response:', getRes.body);
    // console.log('POST Response:', postRes.body);
    // console.log('PUT Response:', putRes.body);
    // console.log('DELETE Response Status:', deleteRes.status);
}


