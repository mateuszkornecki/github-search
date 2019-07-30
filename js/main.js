!function(e){var g={};function I(n){if(g[n])return g[n].exports;var C=g[n]={i:n,l:!1,exports:{}};return e[n].call(C.exports,C,C.exports,I),C.l=!0,C.exports}I.m=e,I.c=g,I.d=function(e,g,n){I.o(e,g)||Object.defineProperty(e,g,{enumerable:!0,get:n})},I.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},I.t=function(e,g){if(1&g&&(e=I(e)),8&g)return e;if(4&g&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(I.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&g&&"string"!=typeof e)for(var C in e)I.d(n,C,function(g){return e[g]}.bind(null,C));return n},I.n=function(e){var g=e&&e.__esModule?function(){return e.default}:function(){return e};return I.d(g,"a",g),g},I.o=function(e,g){return Object.prototype.hasOwnProperty.call(e,g)},I.p="",I(I.s=0)}([function(module,exports,__webpack_require__){"use strict";eval("\n\nconst searchInput = document.querySelector('.search__input--js');\nconst profilePage = document.querySelector('.profile--js');\nconst profileBuilder = () => {\n    profilePage.innerHTML = '';\n    searchInput.value = localStorage.getItem('User Name');\n\n    fetch(`https://api.github.com/users/${localStorage.getItem('User Name')}`)\n        .then(resp => resp.json())\n        .then(resp => {\n            let owner = resp;\n            if (owner.login != undefined) {\n                const ownerSection = document.createElement('section');\n                const ownerAvatar = document.createElement('img');\n                const ownerTextWrapper = document.createElement('div');\n                const ownerName = document.createElement('h2');\n                const ownerLogin = document.createElement('span');\n                const ownerBio = document.createElement('p');\n                ownerSection.classList.add('owner', 'owner--js');\n                ownerAvatar.className = 'owner__avatar';\n                ownerTextWrapper.className = 'owner__text-wrapper';\n                ownerName.className = 'owner__name';\n                ownerLogin.className = 'owner__login';\n                ownerBio.className = 'owner__bio';\n                ownerAvatar.src = owner.avatar_url;\n                ownerAvatar.alt = `${owner.name} avatar`;\n                profilePage.appendChild(ownerSection);\n                ownerSection.appendChild(ownerAvatar);\n                ownerSection.appendChild(ownerTextWrapper);\n                ownerTextWrapper.appendChild(ownerName);\n                ownerTextWrapper.appendChild(ownerLogin);\n                ownerTextWrapper.appendChild(ownerBio);\n                ownerName.innerHTML = owner.name;\n                ownerLogin.innerHTML = owner.login;\n                ownerBio.innerHTML = owner.bio;\n            }\n        })\n        .catch(err => {\n            console.log(err);\n        })\n\n    fetch(`https://api.github.com/users/${localStorage.getItem('User Name')}/repos?sort=full_name&direction=asc`)\n\n    .then(resp => resp.json())\n        .then(resp => {\n            let repos = resp;\n            const repositories = document.createElement('section');\n            repositories.classList.add('repos', 'repos--js');\n            profilePage.appendChild(repositories);\n            repos.forEach(repo => {\n                const repoSection = document.createElement('section');\n                const repoName = document.createElement('h3');\n                const repoDescription = document.createElement('p');\n                const repoLanguage = document.createElement('span');\n                repoSection.className = 'repo';\n                repoName.className = 'repo__title';\n                repoDescription.className = 'repo__description';\n                repoLanguage.className = 'repo__language';\n                repositories.appendChild(repoSection);\n                repoSection.appendChild(repoName);\n                repoSection.appendChild(repoDescription);\n                repoSection.appendChild(repoLanguage);\n                repoName.innerHTML = `<a class=\"repo__link\" href=\"${repo.svn_url}\">${repo.name}</a>`;\n                repoLanguage.innerHTML = repo.language;\n                repoDescription.innerHTML = repo.description;\n                localStorage.removeItem('User Name');\n            })\n        })\n        .catch(err => {\n            profilePage.innerHTML = '';\n            const p = document.createElement('p');\n            p.className = 'err';\n            profilePage.appendChild(p);\n            p.innerHTML = `Nie znaleziono użytkownika o nazwie <b> ${localStorage.getItem('User Name')} </b>`;\n            localStorage.removeItem('User Name');\n        })\n}\n\n//! if you are on second.html and localStorage record exist then print it\nif (profilePage && localStorage.getItem('User Name')) {\n    profileBuilder();\n}\n\nsearchInput.addEventListener('keyup', (e) => {\n    //! if enter is pressed print profile\n    let userName = searchInput.value;\n    if (e.keyCode === 13) {\n        localStorage.setItem('User Name', userName);\n        if (profilePage) {\n            profileBuilder();\n        } else {\n            //? \"_top\" - need to read more about that\n            window.open(\"second.html\", \"_top\");\n        }\n    }\n})//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvbWFpbi5qcz85MjkxIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMENBQTBDLGtDQUFrQztBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLFdBQVc7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7O0FBRVQsMENBQTBDLGtDQUFrQzs7QUFFNUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvRUFBb0UsYUFBYSxJQUFJLFVBQVU7QUFDL0Y7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUVBQXFFLGtDQUFrQztBQUN2RztBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJmaWxlIjoiMC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBzZWFyY2hJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2hfX2lucHV0LS1qcycpO1xuY29uc3QgcHJvZmlsZVBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZmlsZS0tanMnKTtcbmNvbnN0IHByb2ZpbGVCdWlsZGVyID0gKCkgPT4ge1xuICAgIHByb2ZpbGVQYWdlLmlubmVySFRNTCA9ICcnO1xuICAgIHNlYXJjaElucHV0LnZhbHVlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1VzZXIgTmFtZScpO1xuXG4gICAgZmV0Y2goYGh0dHBzOi8vYXBpLmdpdGh1Yi5jb20vdXNlcnMvJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVXNlciBOYW1lJyl9YClcbiAgICAgICAgLnRoZW4ocmVzcCA9PiByZXNwLmpzb24oKSlcbiAgICAgICAgLnRoZW4ocmVzcCA9PiB7XG4gICAgICAgICAgICBsZXQgb3duZXIgPSByZXNwO1xuICAgICAgICAgICAgaWYgKG93bmVyLmxvZ2luICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG93bmVyU2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICAgICAgICAgICAgICBjb25zdCBvd25lckF2YXRhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG93bmVyVGV4dFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBjb25zdCBvd25lck5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG93bmVyTG9naW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3duZXJCaW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgICAgICAgICAgb3duZXJTZWN0aW9uLmNsYXNzTGlzdC5hZGQoJ293bmVyJywgJ293bmVyLS1qcycpO1xuICAgICAgICAgICAgICAgIG93bmVyQXZhdGFyLmNsYXNzTmFtZSA9ICdvd25lcl9fYXZhdGFyJztcbiAgICAgICAgICAgICAgICBvd25lclRleHRXcmFwcGVyLmNsYXNzTmFtZSA9ICdvd25lcl9fdGV4dC13cmFwcGVyJztcbiAgICAgICAgICAgICAgICBvd25lck5hbWUuY2xhc3NOYW1lID0gJ293bmVyX19uYW1lJztcbiAgICAgICAgICAgICAgICBvd25lckxvZ2luLmNsYXNzTmFtZSA9ICdvd25lcl9fbG9naW4nO1xuICAgICAgICAgICAgICAgIG93bmVyQmlvLmNsYXNzTmFtZSA9ICdvd25lcl9fYmlvJztcbiAgICAgICAgICAgICAgICBvd25lckF2YXRhci5zcmMgPSBvd25lci5hdmF0YXJfdXJsO1xuICAgICAgICAgICAgICAgIG93bmVyQXZhdGFyLmFsdCA9IGAke293bmVyLm5hbWV9IGF2YXRhcmA7XG4gICAgICAgICAgICAgICAgcHJvZmlsZVBhZ2UuYXBwZW5kQ2hpbGQob3duZXJTZWN0aW9uKTtcbiAgICAgICAgICAgICAgICBvd25lclNlY3Rpb24uYXBwZW5kQ2hpbGQob3duZXJBdmF0YXIpO1xuICAgICAgICAgICAgICAgIG93bmVyU2VjdGlvbi5hcHBlbmRDaGlsZChvd25lclRleHRXcmFwcGVyKTtcbiAgICAgICAgICAgICAgICBvd25lclRleHRXcmFwcGVyLmFwcGVuZENoaWxkKG93bmVyTmFtZSk7XG4gICAgICAgICAgICAgICAgb3duZXJUZXh0V3JhcHBlci5hcHBlbmRDaGlsZChvd25lckxvZ2luKTtcbiAgICAgICAgICAgICAgICBvd25lclRleHRXcmFwcGVyLmFwcGVuZENoaWxkKG93bmVyQmlvKTtcbiAgICAgICAgICAgICAgICBvd25lck5hbWUuaW5uZXJIVE1MID0gb3duZXIubmFtZTtcbiAgICAgICAgICAgICAgICBvd25lckxvZ2luLmlubmVySFRNTCA9IG93bmVyLmxvZ2luO1xuICAgICAgICAgICAgICAgIG93bmVyQmlvLmlubmVySFRNTCA9IG93bmVyLmJpbztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICB9KVxuXG4gICAgZmV0Y2goYGh0dHBzOi8vYXBpLmdpdGh1Yi5jb20vdXNlcnMvJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVXNlciBOYW1lJyl9L3JlcG9zP3NvcnQ9ZnVsbF9uYW1lJmRpcmVjdGlvbj1hc2NgKVxuXG4gICAgLnRoZW4ocmVzcCA9PiByZXNwLmpzb24oKSlcbiAgICAgICAgLnRoZW4ocmVzcCA9PiB7XG4gICAgICAgICAgICBsZXQgcmVwb3MgPSByZXNwO1xuICAgICAgICAgICAgY29uc3QgcmVwb3NpdG9yaWVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuICAgICAgICAgICAgcmVwb3NpdG9yaWVzLmNsYXNzTGlzdC5hZGQoJ3JlcG9zJywgJ3JlcG9zLS1qcycpO1xuICAgICAgICAgICAgcHJvZmlsZVBhZ2UuYXBwZW5kQ2hpbGQocmVwb3NpdG9yaWVzKTtcbiAgICAgICAgICAgIHJlcG9zLmZvckVhY2gocmVwbyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVwb1NlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWN0aW9uJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVwb05hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlcG9EZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgICAgICAgICBjb25zdCByZXBvTGFuZ3VhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICAgICAgcmVwb1NlY3Rpb24uY2xhc3NOYW1lID0gJ3JlcG8nO1xuICAgICAgICAgICAgICAgIHJlcG9OYW1lLmNsYXNzTmFtZSA9ICdyZXBvX190aXRsZSc7XG4gICAgICAgICAgICAgICAgcmVwb0Rlc2NyaXB0aW9uLmNsYXNzTmFtZSA9ICdyZXBvX19kZXNjcmlwdGlvbic7XG4gICAgICAgICAgICAgICAgcmVwb0xhbmd1YWdlLmNsYXNzTmFtZSA9ICdyZXBvX19sYW5ndWFnZSc7XG4gICAgICAgICAgICAgICAgcmVwb3NpdG9yaWVzLmFwcGVuZENoaWxkKHJlcG9TZWN0aW9uKTtcbiAgICAgICAgICAgICAgICByZXBvU2VjdGlvbi5hcHBlbmRDaGlsZChyZXBvTmFtZSk7XG4gICAgICAgICAgICAgICAgcmVwb1NlY3Rpb24uYXBwZW5kQ2hpbGQocmVwb0Rlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgICAgICByZXBvU2VjdGlvbi5hcHBlbmRDaGlsZChyZXBvTGFuZ3VhZ2UpO1xuICAgICAgICAgICAgICAgIHJlcG9OYW1lLmlubmVySFRNTCA9IGA8YSBjbGFzcz1cInJlcG9fX2xpbmtcIiBocmVmPVwiJHtyZXBvLnN2bl91cmx9XCI+JHtyZXBvLm5hbWV9PC9hPmA7XG4gICAgICAgICAgICAgICAgcmVwb0xhbmd1YWdlLmlubmVySFRNTCA9IHJlcG8ubGFuZ3VhZ2U7XG4gICAgICAgICAgICAgICAgcmVwb0Rlc2NyaXB0aW9uLmlubmVySFRNTCA9IHJlcG8uZGVzY3JpcHRpb247XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ1VzZXIgTmFtZScpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICBwcm9maWxlUGFnZS5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgIGNvbnN0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgICAgICBwLmNsYXNzTmFtZSA9ICdlcnInO1xuICAgICAgICAgICAgcHJvZmlsZVBhZ2UuYXBwZW5kQ2hpbGQocCk7XG4gICAgICAgICAgICBwLmlubmVySFRNTCA9IGBOaWUgem5hbGV6aW9ubyB1xbx5dGtvd25pa2EgbyBuYXp3aWUgPGI+ICR7bG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1VzZXIgTmFtZScpfSA8L2I+YDtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdVc2VyIE5hbWUnKTtcbiAgICAgICAgfSlcbn1cblxuLy8hIGlmIHlvdSBhcmUgb24gc2Vjb25kLmh0bWwgYW5kIGxvY2FsU3RvcmFnZSByZWNvcmQgZXhpc3QgdGhlbiBwcmludCBpdFxuaWYgKHByb2ZpbGVQYWdlICYmIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdVc2VyIE5hbWUnKSkge1xuICAgIHByb2ZpbGVCdWlsZGVyKCk7XG59XG5cbnNlYXJjaElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGUpID0+IHtcbiAgICAvLyEgaWYgZW50ZXIgaXMgcHJlc3NlZCBwcmludCBwcm9maWxlXG4gICAgbGV0IHVzZXJOYW1lID0gc2VhcmNoSW5wdXQudmFsdWU7XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ1VzZXIgTmFtZScsIHVzZXJOYW1lKTtcbiAgICAgICAgaWYgKHByb2ZpbGVQYWdlKSB7XG4gICAgICAgICAgICBwcm9maWxlQnVpbGRlcigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8/IFwiX3RvcFwiIC0gbmVlZCB0byByZWFkIG1vcmUgYWJvdXQgdGhhdFxuICAgICAgICAgICAgd2luZG93Lm9wZW4oXCJzZWNvbmQuaHRtbFwiLCBcIl90b3BcIik7XG4gICAgICAgIH1cbiAgICB9XG59KSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///0\n")}]);