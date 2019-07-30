"use strict";

// service worker registration - remove if you're not going to use it

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('serviceworker.js').then(function(registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

// place your code below

const searchInput = document.querySelector('.search__input--js');
const profilePage = document.querySelector('.profile--js');

//! if you are on second.html localStorage exist then print it
if (profilePage && localStorage.getItem('User Name')) {
    profilePage.innerHTML = '';
    searchInput.value = localStorage.getItem('User Name');
    fetch(`https://api.github.com/users/${localStorage.getItem('User Name')}/repos?sort=full_name&direction=asc`)
        .then(resp => resp.json())
        .then(resp => {
            let repos = resp;
            console.log(repos);
            repos.forEach(repo => {
                console.log(repo.name);
                const section = document.createElement('section');
                const h2 = document.createElement('h2');
                const p = document.createElement('p');
                const span = document.createElement('span');
                section.className = 'repo';
                h2.className = 'repo__title';
                p.className = 'repo__description';
                span.className = 'repo__language';
                profilePage.appendChild(section);
                section.appendChild(h2);
                section.appendChild(p);
                section.appendChild(span);
                h2.innerHTML = `<a class="repo__link" href="${repo.svn_url}">${repo.name}</a>`;
                span.innerHTML = repo.language;
                p.innerHTML = repo.description;
            })
        })

    .catch(err => {
        console.log(err);
        const p = document.createElement('p');
        p.className = 'err';
        profilePage.appendChild(p);
        p.innerHTML = `Nie znaleziono użytkownika o nazwie <b> ${localStorage.getItem('User Name')} </b>`;

    })
    localStorage.removeItem('User Name');
}
//! warn



searchInput.addEventListener('keyup', (e) => {
    //! if enter is pressed print userName
    let userName = searchInput.value;
    if (e.keyCode === 13) {
        console.log(userName);
        localStorage.setItem('User Name', userName);
        if (profilePage) {
            profilePage.innerHTML = '';
            fetch(`https://api.github.com/users/${localStorage.getItem('User Name')}/repos?sort=full_name&direction=asc`)
                .then(resp => resp.json())
                .then(resp => {
                    let repos = resp;
                    console.log(repos);
                    repos.forEach(repo => {
                        console.log(repo.name);
                        const section = document.createElement('section');
                        const h2 = document.createElement('h2');
                        const p = document.createElement('p');
                        const span = document.createElement('span');
                        section.className = 'repo';
                        h2.className = 'repo__title';
                        p.className = 'repo__description';
                        span.className = 'repo__language';
                        profilePage.appendChild(section);
                        section.appendChild(h2);
                        section.appendChild(p);
                        section.appendChild(span);
                        h2.innerHTML = `<a class="repo__link" href="${repo.svn_url}">${repo.name}</a>`;
                        span.innerHTML = repo.language;
                        p.innerHTML = repo.description;
                    })
                })

            .catch(err => {
                console.log(err);
                const p = document.createElement('p');
                p.className = 'err';
                profilePage.appendChild(p);
                p.innerHTML = `Nie znaleziono użytkownika o nazwie <b> ${localStorage.getItem('User Name')} </b>`;

            })

        } else {
            //TODO after pressing ENTER open second.html 
            //? "_top" - need to read more about that
            window.open("/second.html", "_top");
            //TODO AND search for input.value 
        }
    }
})