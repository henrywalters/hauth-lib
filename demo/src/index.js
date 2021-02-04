import {HAuthClient, HAuthCore, HAuthServer} from 'hauth-lib';

const client = new HAuthClient({
    loginUrl: 'http://localhost:4040',
    apiUrl: 'http://localhost:4200/v1',
    organizationId: '1c8120ef-8b79-4667-a6b3-6231ddba1db7',
    applicationId: '25d72652-d80f-4e56-8c6b-028050ba7b5e'
});

const server = new HAuthServer({
    apiUrl: 'http://localhost:4200/v1',
    organizationId: '1c8120ef-8b79-4667-a6b3-6231ddba1db7',
    applicationId: '25d72652-d80f-4e56-8c6b-028050ba7b5e'
})

const api = new HAuthCore.Api('http://localhost:3030/');

const token = '&542n11&n(2*r0lt2j92#&4615(6(3@#k$$142w$^9%)26xp7!!#r@!qw8%^7w83itr122$&qio)y@&7$*%&!#9xcuoz@)5uay#391x^6xw)hw4#30ufv#$$l8#4bd0i';

api.setAppToken(token);
server.api.setAppToken(token);

document.getElementById('login').addEventListener('click', (e) => {
    client.login()
        .then((data) => {
            api.setBearerToken(data.accessToken)
        })
        .catch((e) => {
            console.warn(e);
        })
})

document.getElementById('logout').addEventListener('click', (e) => {
    client.logout();
})

document.getElementById('self').addEventListener('click', (e) => {
    //server.getSelf()
    //    .then(data => {
            api.http.get('user').then((res) => {
                console.log(res);
            })

            api.http.get('app').then((res) => {
                console.log(res);
            })

            document.getElementById('user').innerHTML = (data.thumbnailUrl ? `<img src='${data.thumbnailUrl}' />` : '') + `<p>${data.name}</p>`;
    //    })
    //    .catch((e) => {
    //        document.getElementById('user').innerHTML = '💩';
    //    });
})