"use strict";

const searchInput = document.querySelector('.search__input--js');
const profilePage = document.querySelector('.profile--js');
const profileBuilder = () => {
    profilePage.innerHTML = '';
    searchInput.value = localStorage.getItem('User Name');

    fetch(`https://api.github.com/users/${localStorage.getItem('User Name')}`)
        .then(resp => resp.json())
        .then(resp => {
            let owner = resp;
            console.log(owner.login);
            console.log(owner.name);
            console.log(owner.avatar_url);
            //TODO: print repo owner name
            //? check if i need 2x section here
            const ownerSection = document.createElement('section');
            const h2 = document.createElement('h2');
            const avatar = document.createElement('img');
            ownerSection.className = 'owner';
            h2.className = 'owner__login';
            avatar.className = "owner__avatar";
            avatar.src = owner.avatar_url;
            avatar.alt = `${owner.name} avatar`;
            profilePage.appendChild(ownerSection);
            ownerSection.appendChild(h2);
            ownerSection.appendChild(avatar);
            h2.innerHTML = owner.login;

        })
        .catch(err => {
            console.log(err);
        })

    fetch(`https://api.github.com/users/${localStorage.getItem('User Name')}/repos?sort=full_name&direction=asc`)
        .then(resp => resp.json())
        .then(resp => {
            let repos = resp;
            repos.forEach(repo => {

                const section = document.createElement('section');
                const h3 = document.createElement('h3');
                const p = document.createElement('p');
                const span = document.createElement('span');
                section.className = 'repo';
                h3.className = 'repo__title';
                p.className = 'repo__description';
                span.className = 'repo__language';
                profilePage.appendChild(section);
                section.appendChild(h3);
                section.appendChild(p);
                section.appendChild(span);
                h3.innerHTML = `<a class="repo__link" href="${repo.svn_url}">${repo.name}</a>`;
                span.innerHTML = repo.language;
                p.innerHTML = repo.description;
                localStorage.removeItem('User Name');
            })
        })
        .catch(err => {
            const p = document.createElement('p');
            p.className = 'err';
            profilePage.appendChild(p);
            p.innerHTML = `Nie znaleziono użytkownika o nazwie <b> ${localStorage.getItem('User Name')} </b>`;
            localStorage.removeItem('User Name');
        })
}

//! if you are on second.html localStorage exist then print it
if (profilePage && localStorage.getItem('User Name')) {
    profileBuilder();
}

searchInput.addEventListener('keyup', (e) => {
    //! if enter is pressed print userName
    let userName = searchInput.value;
    if (e.keyCode === 13) {
        localStorage.setItem('User Name', userName);
        if (profilePage) {
            profileBuilder();
        } else {
            //? "_top" - need to read more about that
            window.open("second.html", "_top");
        }
    }
})