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

const searchInput = document.querySelector('.search__input');
const profilePage = document.querySelector('.profile');
searchInput.addEventListener('keyup', (e) => {

    //! if enter is pressed print userName
    let userName = searchInput.value;
    if (e.keyCode === 13) {
        console.log(userName);
        profilePage.innerHTML = '';
        localStorage.setItem('User Name', userName);
        fetch(`https://api.github.com/users/${localStorage.getItem('User Name')}/repos?sort=full_name&direction=asc`)
            .then(resp => resp.json())
            .then(resp => {
                let repos = resp;
                console.log(repos);
                repos.forEach(repo => {
                    console.log(repo.name);
                    const p = document.createElement('p');
                    p.className = 'repo-name';
                    profilePage.appendChild(p);
                    p.innerHTML = repo.name;
                })
            })
            .catch(err => {
                console.log(err);
                const p = document.createElement('p');
                p.className = 'err';
                profilePage.appendChild(p);
                p.innerHTML = `Nie znaleziono użytkownika o nazwie <b>${localStorage.getItem('User Name')}</b>`;

            })
    }
})

// console.log(`moje imie to ${localStorage.getItem('User Name')}`);