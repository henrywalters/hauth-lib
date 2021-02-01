import {HAuthClient, HAuthCore, HAuthServer} from 'hauth-lib';

const client = new HAuthClient({
    loginUrl: 'http://localhost:4040',
    apiUrl: 'http://localhost:4200/v1',
    organizationId: '8811164c-28f9-496f-9533-3bad28a5694e',
    applicationId: '1e1f6495-8013-492a-9857-15839f6c2726'
});

const server = new HAuthServer({
    apiUrl: 'http://localhost:4200/v1',
    organizationId: '8811164c-28f9-496f-9533-3bad28a5694e',
    applicationId: '1e1f6495-8013-492a-9857'
})

const token = '&^6svfpl!*8897h^i#397741q5c3*^7*&cl0b34314l63m880!#780bo2o4z%52d#n^eheses7tif0@9m9650xz0*7003^9d4h^)l09*3!r8of0&%*k3$!cb$wj82)%1';

server.api.setAppToken(token);

document.getElementById('login').addEventListener('click', (e) => {
    client.login()
        .then((data) => {
            console.log(data);
        })
        .catch((e) => {
            console.warn(e);
        })
})

document.getElementById('logout').addEventListener('click', (e) => {
    client.logout();
})

document.getElementById('self').addEventListener('click', (e) => {
    server.getSelf()
        .then(data => {
            console.log(data);

            server.authenticateForApp()
                .then((authed) => {
                    console.log(authed);
                })

            document.getElementById('user').innerHTML = (data.thumbnailUrl ? `<img src='${data.thumbnailUrl}' />` : '') + `<p>${data.name}</p>`;
        })
        .catch((e) => {
            document.getElementById('user').innerHTML = '💩';
        });
})