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
            const ownerSection = document.createElement('section');
            const ownerName = document.createElement('h2');
            const ownerAvatar = document.createElement('img');
            ownerSection.className = 'owner';
            ownerName.className = 'owner__name';
            ownerAvatar.className = "owner__avatar";
            ownerAvatar.src = owner.avatar_url;
            ownerAvatar.alt = `${owner.name} avatar`;
            profilePage.appendChild(ownerSection);
            ownerSection.appendChild(ownerName);
            ownerSection.appendChild(ownerAvatar);
            ownerName.innerHTML = owner.name;

        })
        .catch(err => {
            console.log(err);
        })

    fetch(`https://api.github.com/users/${localStorage.getItem('User Name')}/repos?sort=full_name&direction=asc`)
        .then(resp => resp.json())
        .then(resp => {
            let repos = resp;
            repos.forEach(repo => {

                const repoSection = document.createElement('section');
                const repoName = document.createElement('h3');
                const repoDescription = document.createElement('p');
                const repoLanguage = document.createElement('span');
                repoSection.className = 'repo';
                repoName.className = 'repo__title';
                repoDescription.className = 'repo__description';
                repoLanguage.className = 'repo__language';
                profilePage.appendChild(repoSection);
                repoSection.appendChild(repoName);
                repoSection.appendChild(repoDescription);
                repoSection.appendChild(repoLanguage);
                repoName.innerHTML = `<a class="repo__link" href="${repo.svn_url}">${repo.name}</a>`;
                repoLanguage.innerHTML = repo.language;
                repoDescription.innerHTML = repo.description;
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