"use strict";

const searchInput = document.querySelector('.search__input--js');
const profilePage = document.querySelector('.profile--js');
//! CSS TRICK SOLUTION FOR 100vh on mobiles
// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);
const profileBuilder = () => {
    profilePage.innerHTML = '';
    searchInput.value = localStorage.getItem('User Name');

    fetch(`https://api.github.com/users/${localStorage.getItem('User Name')}`)
        .then(resp => resp.json())
        .then(resp => {
            let owner = resp;
            if (owner.login != undefined) {
                const ownerSection = document.createElement('section');
                const ownerAvatar = document.createElement('img');
                const ownerTextWrapper = document.createElement('div');
                const ownerName = document.createElement('h2');
                const ownerLogin = document.createElement('span');
                const ownerBio = document.createElement('p');
                ownerSection.classList.add('owner', 'owner--js');
                ownerAvatar.className = 'owner__avatar';
                ownerTextWrapper.className = 'owner__text-wrapper';
                ownerName.className = 'owner__name';
                ownerLogin.className = 'owner__login';
                ownerBio.className = 'owner__bio';
                ownerAvatar.src = owner.avatar_url;
                ownerAvatar.alt = `${owner.name} avatar`;
                profilePage.appendChild(ownerSection);
                ownerSection.appendChild(ownerAvatar);
                ownerSection.appendChild(ownerTextWrapper);
                ownerTextWrapper.appendChild(ownerName);
                ownerTextWrapper.appendChild(ownerLogin);
                ownerTextWrapper.appendChild(ownerBio);
                ownerName.innerHTML = owner.name;
                ownerLogin.innerHTML = owner.login;
                ownerBio.innerHTML = owner.bio;
            }
        })
        .catch(err => {
            console.log(err);
        })

    fetch(`https://api.github.com/users/${localStorage.getItem('User Name')}/repos?sort=full_name&direction=asc`)

    .then(resp => resp.json())
        .then(resp => {
            let repos = resp;
            const repositories = document.createElement('section');
            repositories.classList.add('repos', 'repos--js');
            profilePage.appendChild(repositories);
            repos.forEach(repo => {
                const repoSection = document.createElement('section');
                const repoName = document.createElement('h3');
                const repoDescription = document.createElement('p');
                const repoLanguage = document.createElement('span');
                repoSection.className = 'repo';
                repoName.className = 'repo__title';
                repoDescription.className = 'repo__description';
                repoLanguage.className = 'repo__language';
                repositories.appendChild(repoSection);
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
            profilePage.innerHTML = '';
            const p = document.createElement('p');
            p.className = 'err';
            profilePage.appendChild(p);
            p.innerHTML = `Nie znaleziono użytkownika o nazwie <b> ${localStorage.getItem('User Name')} </b>`;
            localStorage.removeItem('User Name');
        })
}

//! if you are on second.html and localStorage record exist then print it
if (profilePage && localStorage.getItem('User Name')) {
    profileBuilder();
}

searchInput.addEventListener('keyup', (e) => {
    //! if enter is pressed print profile
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