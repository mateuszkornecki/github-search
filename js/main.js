!function(g){var I={};function e(C){if(I[C])return I[C].exports;var n=I[C]={i:C,l:!1,exports:{}};return g[C].call(n.exports,n,n.exports,e),n.l=!0,n.exports}e.m=g,e.c=I,e.d=function(g,I,C){e.o(g,I)||Object.defineProperty(g,I,{enumerable:!0,get:C})},e.r=function(g){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(g,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(g,"__esModule",{value:!0})},e.t=function(g,I){if(1&I&&(g=e(g)),8&I)return g;if(4&I&&"object"==typeof g&&g&&g.__esModule)return g;var C=Object.create(null);if(e.r(C),Object.defineProperty(C,"default",{enumerable:!0,value:g}),2&I&&"string"!=typeof g)for(var n in g)e.d(C,n,function(I){return g[I]}.bind(null,n));return C},e.n=function(g){var I=g&&g.__esModule?function(){return g.default}:function(){return g};return e.d(I,"a",I),I},e.o=function(g,I){return Object.prototype.hasOwnProperty.call(g,I)},e.p="",e(e.s=0)}([function(module,exports,__webpack_require__){"use strict";eval("\n\nconst searchInput = document.querySelector('.search__input--js');\nconst profilePage = document.querySelector('.profile--js');\n//! CSS TRICK SOLUTION FOR 100vh on mobiles\n// First we get the viewport height and we multiple it by 1% to get a value for a vh unit\nlet vh = window.innerHeight * 0.01;\n// Then we set the value in the --vh custom property to the root of the document\ndocument.documentElement.style.setProperty('--vh', `${vh}px`);\n\nconst profileBuilder = () => {\n    profilePage.innerHTML = '';\n    searchInput.value = localStorage.getItem('User Name');\n\n    fetch(`https://api.github.com/users/${localStorage.getItem('User Name')}`)\n        .then(resp => resp.json())\n        .then(resp => {\n            let owner = resp;\n            if (owner.login != undefined) {\n\n                const ownerSection = document.createElement('section');\n                const ownerAvatar = document.createElement('img');\n                const ownerTextWrapper = document.createElement('div');\n                const ownerName = document.createElement('h2');\n                const ownerLogin = document.createElement('span');\n                const ownerBio = document.createElement('p');\n                ownerSection.classList.add('owner', 'owner--js');\n                ownerAvatar.className = 'owner__avatar';\n                ownerTextWrapper.className = 'owner__text-wrapper';\n                ownerName.className = 'owner__name';\n                ownerLogin.className = 'owner__login';\n                ownerBio.className = 'owner__bio';\n                ownerAvatar.src = owner.avatar_url;\n                ownerAvatar.alt = `${owner.name} avatar`;\n                profilePage.appendChild(ownerSection);\n                ownerSection.appendChild(ownerAvatar);\n                ownerSection.appendChild(ownerTextWrapper);\n                ownerTextWrapper.appendChild(ownerName);\n                ownerTextWrapper.appendChild(ownerLogin);\n                ownerTextWrapper.appendChild(ownerBio);\n                ownerName.innerHTML = owner.name;\n                ownerLogin.innerHTML = owner.login;\n                ownerBio.innerHTML = owner.bio;\n            }\n        })\n        .catch(err => {\n            console.log(err);\n        })\n\n    fetch(`https://api.github.com/users/${localStorage.getItem('User Name')}/repos?sort=full_name&direction=asc`)\n\n    .then(resp => resp.json())\n        .then(resp => {\n            let repos = resp;\n            const repositories = document.createElement('div');\n            repositories.classList.add('repos', 'repos--js');\n            profilePage.appendChild(repositories);\n            repos.forEach(repo => {\n                const repoSection = document.createElement('section');\n                const repoTextWrapper = document.createElement('div');\n                const repoName = document.createElement('h3');\n                const repoDescription = document.createElement('p');\n                const repoFooter = document.createElement('footer');\n                const repoLanguage = document.createElement('span');\n                const repoFooterTextWrapper = document.createElement('div');\n                const repoGithub = document.createElement('a');\n\n                //Display 'Live' only if it exist\n                if (repo.homepage) {\n                    const repoLive = document.createElement('a');\n                    repoLive.className = 'repo__live';\n                    repoFooterTextWrapper.appendChild(repoLive);\n                    repoLive.innerHTML = `<a class=\"repo__link\" href=\"${repo.homepage}\">Live</a>`;\n                }\n                repoSection.className = 'repo';\n                repoTextWrapper.className = 'repo__text-wrapper';\n                repoName.className = 'repo__title';\n                repoDescription.className = 'repo__description';\n                repoLanguage.className = 'repo__language';\n                repoFooter.className = 'repo__footer';\n                repoFooterTextWrapper.className = 'repo__footer-text-wrapper';\n                repoGithub.className = 'repo__github';\n\n\n                repositories.appendChild(repoSection);\n                repoSection.appendChild(repoTextWrapper);\n                repoTextWrapper.appendChild(repoName);\n                repoTextWrapper.appendChild(repoDescription);\n                repoSection.appendChild(repoFooter);\n                repoFooter.appendChild(repoLanguage);\n                repoFooter.appendChild(repoFooterTextWrapper);\n                repoFooterTextWrapper.appendChild(repoGithub);\n\n\n                repoName.innerHTML = repo.name;\n                repoDescription.innerHTML = repo.description;\n\n                repoGithub.innerHTML = `<a class=\"repo__link\" href=\"${repo.svn_url}\">Github</a>`;\n\n                localStorage.removeItem('User Name');\n\n                switch (repo.language) {\n                    case 'HTML':\n                        repoLanguage.innerHTML = `<img class=\"language__icon\" src=\"assets/img/${repo.language}.png\" alt=\"${repo.language} icon\">`\n                        break;\n                    case 'JavaScript':\n                        repoLanguage.innerHTML = `<img class=\"language__icon\" src=\"assets/img/${repo.language}.png\" alt=\"${repo.language} icon\">`\n                        break;\n                    case 'CSS':\n                        repoLanguage.innerHTML = `<img class=\"language__icon\" src=\"assets/img/${repo.language}.png\" alt=\"${repo.language} icon\">`\n                        break;\n                    default:\n                        repoLanguage.innerHTML = repo.language;\n                }\n\n            })\n        })\n        .catch(err => {\n            profilePage.innerHTML = '';\n            const p = document.createElement('p');\n            p.className = 'err';\n            profilePage.appendChild(p);\n            p.innerHTML = `Nie znaleziono użytkownika o nazwie <b> ${localStorage.getItem('User Name')} </b>`;\n            localStorage.removeItem('User Name');\n        })\n}\n\n//! if you are on second.html and localStorage record exist then print it\nif (profilePage && localStorage.getItem('User Name')) {\n    profileBuilder();\n}\n\nsearchInput.addEventListener('keyup', (e) => {\n    //! if enter is pressed print profile\n    let userName = searchInput.value;\n    if (e.keyCode === 13) {\n        localStorage.setItem('User Name', userName);\n        if (profilePage) {\n            profileBuilder();\n        } else {\n            //? \"_top\" - need to read more about that\n            window.open(\"second.html\", \"_top\");\n        }\n    }\n})//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvbWFpbi5qcz85MjkxIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCxHQUFHOztBQUV6RDtBQUNBO0FBQ0E7O0FBRUEsMENBQTBDLGtDQUFrQztBQUM1RTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxXQUFXO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTOztBQUVULDBDQUEwQyxrQ0FBa0M7O0FBRTVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0VBQXdFLGNBQWM7QUFDdEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBLHNFQUFzRSxhQUFhOztBQUVuRjs7QUFFQTtBQUNBO0FBQ0EsZ0dBQWdHLGNBQWMsYUFBYSxjQUFjO0FBQ3pJO0FBQ0E7QUFDQSxnR0FBZ0csY0FBYyxhQUFhLGNBQWM7QUFDekk7QUFDQTtBQUNBLGdHQUFnRyxjQUFjLGFBQWEsY0FBYztBQUN6STtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxRUFBcUUsa0NBQWtDO0FBQ3ZHO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsImZpbGUiOiIwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaF9faW5wdXQtLWpzJyk7XG5jb25zdCBwcm9maWxlUGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9maWxlLS1qcycpO1xuLy8hIENTUyBUUklDSyBTT0xVVElPTiBGT1IgMTAwdmggb24gbW9iaWxlc1xuLy8gRmlyc3Qgd2UgZ2V0IHRoZSB2aWV3cG9ydCBoZWlnaHQgYW5kIHdlIG11bHRpcGxlIGl0IGJ5IDElIHRvIGdldCBhIHZhbHVlIGZvciBhIHZoIHVuaXRcbmxldCB2aCA9IHdpbmRvdy5pbm5lckhlaWdodCAqIDAuMDE7XG4vLyBUaGVuIHdlIHNldCB0aGUgdmFsdWUgaW4gdGhlIC0tdmggY3VzdG9tIHByb3BlcnR5IHRvIHRoZSByb290IG9mIHRoZSBkb2N1bWVudFxuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLXZoJywgYCR7dmh9cHhgKTtcblxuY29uc3QgcHJvZmlsZUJ1aWxkZXIgPSAoKSA9PiB7XG4gICAgcHJvZmlsZVBhZ2UuaW5uZXJIVE1MID0gJyc7XG4gICAgc2VhcmNoSW5wdXQudmFsdWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVXNlciBOYW1lJyk7XG5cbiAgICBmZXRjaChgaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS91c2Vycy8ke2xvY2FsU3RvcmFnZS5nZXRJdGVtKCdVc2VyIE5hbWUnKX1gKVxuICAgICAgICAudGhlbihyZXNwID0+IHJlc3AuanNvbigpKVxuICAgICAgICAudGhlbihyZXNwID0+IHtcbiAgICAgICAgICAgIGxldCBvd25lciA9IHJlc3A7XG4gICAgICAgICAgICBpZiAob3duZXIubG9naW4gIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBvd25lclNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWN0aW9uJyk7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3duZXJBdmF0YXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgICAgICAgICBjb25zdCBvd25lclRleHRXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3duZXJOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICAgICAgICAgICAgICBjb25zdCBvd25lckxvZ2luID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG93bmVyQmlvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgICAgIG93bmVyU2VjdGlvbi5jbGFzc0xpc3QuYWRkKCdvd25lcicsICdvd25lci0tanMnKTtcbiAgICAgICAgICAgICAgICBvd25lckF2YXRhci5jbGFzc05hbWUgPSAnb3duZXJfX2F2YXRhcic7XG4gICAgICAgICAgICAgICAgb3duZXJUZXh0V3JhcHBlci5jbGFzc05hbWUgPSAnb3duZXJfX3RleHQtd3JhcHBlcic7XG4gICAgICAgICAgICAgICAgb3duZXJOYW1lLmNsYXNzTmFtZSA9ICdvd25lcl9fbmFtZSc7XG4gICAgICAgICAgICAgICAgb3duZXJMb2dpbi5jbGFzc05hbWUgPSAnb3duZXJfX2xvZ2luJztcbiAgICAgICAgICAgICAgICBvd25lckJpby5jbGFzc05hbWUgPSAnb3duZXJfX2Jpbyc7XG4gICAgICAgICAgICAgICAgb3duZXJBdmF0YXIuc3JjID0gb3duZXIuYXZhdGFyX3VybDtcbiAgICAgICAgICAgICAgICBvd25lckF2YXRhci5hbHQgPSBgJHtvd25lci5uYW1lfSBhdmF0YXJgO1xuICAgICAgICAgICAgICAgIHByb2ZpbGVQYWdlLmFwcGVuZENoaWxkKG93bmVyU2VjdGlvbik7XG4gICAgICAgICAgICAgICAgb3duZXJTZWN0aW9uLmFwcGVuZENoaWxkKG93bmVyQXZhdGFyKTtcbiAgICAgICAgICAgICAgICBvd25lclNlY3Rpb24uYXBwZW5kQ2hpbGQob3duZXJUZXh0V3JhcHBlcik7XG4gICAgICAgICAgICAgICAgb3duZXJUZXh0V3JhcHBlci5hcHBlbmRDaGlsZChvd25lck5hbWUpO1xuICAgICAgICAgICAgICAgIG93bmVyVGV4dFdyYXBwZXIuYXBwZW5kQ2hpbGQob3duZXJMb2dpbik7XG4gICAgICAgICAgICAgICAgb3duZXJUZXh0V3JhcHBlci5hcHBlbmRDaGlsZChvd25lckJpbyk7XG4gICAgICAgICAgICAgICAgb3duZXJOYW1lLmlubmVySFRNTCA9IG93bmVyLm5hbWU7XG4gICAgICAgICAgICAgICAgb3duZXJMb2dpbi5pbm5lckhUTUwgPSBvd25lci5sb2dpbjtcbiAgICAgICAgICAgICAgICBvd25lckJpby5pbm5lckhUTUwgPSBvd25lci5iaW87XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgfSlcblxuICAgIGZldGNoKGBodHRwczovL2FwaS5naXRodWIuY29tL3VzZXJzLyR7bG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1VzZXIgTmFtZScpfS9yZXBvcz9zb3J0PWZ1bGxfbmFtZSZkaXJlY3Rpb249YXNjYClcblxuICAgIC50aGVuKHJlc3AgPT4gcmVzcC5qc29uKCkpXG4gICAgICAgIC50aGVuKHJlc3AgPT4ge1xuICAgICAgICAgICAgbGV0IHJlcG9zID0gcmVzcDtcbiAgICAgICAgICAgIGNvbnN0IHJlcG9zaXRvcmllcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgcmVwb3NpdG9yaWVzLmNsYXNzTGlzdC5hZGQoJ3JlcG9zJywgJ3JlcG9zLS1qcycpO1xuICAgICAgICAgICAgcHJvZmlsZVBhZ2UuYXBwZW5kQ2hpbGQocmVwb3NpdG9yaWVzKTtcbiAgICAgICAgICAgIHJlcG9zLmZvckVhY2gocmVwbyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVwb1NlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWN0aW9uJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVwb1RleHRXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVwb05hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlcG9EZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgICAgICAgICBjb25zdCByZXBvRm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9vdGVyJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVwb0xhbmd1YWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlcG9Gb290ZXJUZXh0V3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlcG9HaXRodWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5cbiAgICAgICAgICAgICAgICAvL0Rpc3BsYXkgJ0xpdmUnIG9ubHkgaWYgaXQgZXhpc3RcbiAgICAgICAgICAgICAgICBpZiAocmVwby5ob21lcGFnZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXBvTGl2ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgICAgICAgICAgICAgcmVwb0xpdmUuY2xhc3NOYW1lID0gJ3JlcG9fX2xpdmUnO1xuICAgICAgICAgICAgICAgICAgICByZXBvRm9vdGVyVGV4dFdyYXBwZXIuYXBwZW5kQ2hpbGQocmVwb0xpdmUpO1xuICAgICAgICAgICAgICAgICAgICByZXBvTGl2ZS5pbm5lckhUTUwgPSBgPGEgY2xhc3M9XCJyZXBvX19saW5rXCIgaHJlZj1cIiR7cmVwby5ob21lcGFnZX1cIj5MaXZlPC9hPmA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlcG9TZWN0aW9uLmNsYXNzTmFtZSA9ICdyZXBvJztcbiAgICAgICAgICAgICAgICByZXBvVGV4dFdyYXBwZXIuY2xhc3NOYW1lID0gJ3JlcG9fX3RleHQtd3JhcHBlcic7XG4gICAgICAgICAgICAgICAgcmVwb05hbWUuY2xhc3NOYW1lID0gJ3JlcG9fX3RpdGxlJztcbiAgICAgICAgICAgICAgICByZXBvRGVzY3JpcHRpb24uY2xhc3NOYW1lID0gJ3JlcG9fX2Rlc2NyaXB0aW9uJztcbiAgICAgICAgICAgICAgICByZXBvTGFuZ3VhZ2UuY2xhc3NOYW1lID0gJ3JlcG9fX2xhbmd1YWdlJztcbiAgICAgICAgICAgICAgICByZXBvRm9vdGVyLmNsYXNzTmFtZSA9ICdyZXBvX19mb290ZXInO1xuICAgICAgICAgICAgICAgIHJlcG9Gb290ZXJUZXh0V3JhcHBlci5jbGFzc05hbWUgPSAncmVwb19fZm9vdGVyLXRleHQtd3JhcHBlcic7XG4gICAgICAgICAgICAgICAgcmVwb0dpdGh1Yi5jbGFzc05hbWUgPSAncmVwb19fZ2l0aHViJztcblxuXG4gICAgICAgICAgICAgICAgcmVwb3NpdG9yaWVzLmFwcGVuZENoaWxkKHJlcG9TZWN0aW9uKTtcbiAgICAgICAgICAgICAgICByZXBvU2VjdGlvbi5hcHBlbmRDaGlsZChyZXBvVGV4dFdyYXBwZXIpO1xuICAgICAgICAgICAgICAgIHJlcG9UZXh0V3JhcHBlci5hcHBlbmRDaGlsZChyZXBvTmFtZSk7XG4gICAgICAgICAgICAgICAgcmVwb1RleHRXcmFwcGVyLmFwcGVuZENoaWxkKHJlcG9EZXNjcmlwdGlvbik7XG4gICAgICAgICAgICAgICAgcmVwb1NlY3Rpb24uYXBwZW5kQ2hpbGQocmVwb0Zvb3Rlcik7XG4gICAgICAgICAgICAgICAgcmVwb0Zvb3Rlci5hcHBlbmRDaGlsZChyZXBvTGFuZ3VhZ2UpO1xuICAgICAgICAgICAgICAgIHJlcG9Gb290ZXIuYXBwZW5kQ2hpbGQocmVwb0Zvb3RlclRleHRXcmFwcGVyKTtcbiAgICAgICAgICAgICAgICByZXBvRm9vdGVyVGV4dFdyYXBwZXIuYXBwZW5kQ2hpbGQocmVwb0dpdGh1Yik7XG5cblxuICAgICAgICAgICAgICAgIHJlcG9OYW1lLmlubmVySFRNTCA9IHJlcG8ubmFtZTtcbiAgICAgICAgICAgICAgICByZXBvRGVzY3JpcHRpb24uaW5uZXJIVE1MID0gcmVwby5kZXNjcmlwdGlvbjtcblxuICAgICAgICAgICAgICAgIHJlcG9HaXRodWIuaW5uZXJIVE1MID0gYDxhIGNsYXNzPVwicmVwb19fbGlua1wiIGhyZWY9XCIke3JlcG8uc3ZuX3VybH1cIj5HaXRodWI8L2E+YDtcblxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdVc2VyIE5hbWUnKTtcblxuICAgICAgICAgICAgICAgIHN3aXRjaCAocmVwby5sYW5ndWFnZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdIVE1MJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcG9MYW5ndWFnZS5pbm5lckhUTUwgPSBgPGltZyBjbGFzcz1cImxhbmd1YWdlX19pY29uXCIgc3JjPVwiYXNzZXRzL2ltZy8ke3JlcG8ubGFuZ3VhZ2V9LnBuZ1wiIGFsdD1cIiR7cmVwby5sYW5ndWFnZX0gaWNvblwiPmBcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdKYXZhU2NyaXB0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcG9MYW5ndWFnZS5pbm5lckhUTUwgPSBgPGltZyBjbGFzcz1cImxhbmd1YWdlX19pY29uXCIgc3JjPVwiYXNzZXRzL2ltZy8ke3JlcG8ubGFuZ3VhZ2V9LnBuZ1wiIGFsdD1cIiR7cmVwby5sYW5ndWFnZX0gaWNvblwiPmBcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdDU1MnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwb0xhbmd1YWdlLmlubmVySFRNTCA9IGA8aW1nIGNsYXNzPVwibGFuZ3VhZ2VfX2ljb25cIiBzcmM9XCJhc3NldHMvaW1nLyR7cmVwby5sYW5ndWFnZX0ucG5nXCIgYWx0PVwiJHtyZXBvLmxhbmd1YWdlfSBpY29uXCI+YFxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBvTGFuZ3VhZ2UuaW5uZXJIVE1MID0gcmVwby5sYW5ndWFnZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgcHJvZmlsZVBhZ2UuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICBjb25zdCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgcC5jbGFzc05hbWUgPSAnZXJyJztcbiAgICAgICAgICAgIHByb2ZpbGVQYWdlLmFwcGVuZENoaWxkKHApO1xuICAgICAgICAgICAgcC5pbm5lckhUTUwgPSBgTmllIHpuYWxlemlvbm8gdcW8eXRrb3duaWthIG8gbmF6d2llIDxiPiAke2xvY2FsU3RvcmFnZS5nZXRJdGVtKCdVc2VyIE5hbWUnKX0gPC9iPmA7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnVXNlciBOYW1lJyk7XG4gICAgICAgIH0pXG59XG5cbi8vISBpZiB5b3UgYXJlIG9uIHNlY29uZC5odG1sIGFuZCBsb2NhbFN0b3JhZ2UgcmVjb3JkIGV4aXN0IHRoZW4gcHJpbnQgaXRcbmlmIChwcm9maWxlUGFnZSAmJiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVXNlciBOYW1lJykpIHtcbiAgICBwcm9maWxlQnVpbGRlcigpO1xufVxuXG5zZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChlKSA9PiB7XG4gICAgLy8hIGlmIGVudGVyIGlzIHByZXNzZWQgcHJpbnQgcHJvZmlsZVxuICAgIGxldCB1c2VyTmFtZSA9IHNlYXJjaElucHV0LnZhbHVlO1xuICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdVc2VyIE5hbWUnLCB1c2VyTmFtZSk7XG4gICAgICAgIGlmIChwcm9maWxlUGFnZSkge1xuICAgICAgICAgICAgcHJvZmlsZUJ1aWxkZXIoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vPyBcIl90b3BcIiAtIG5lZWQgdG8gcmVhZCBtb3JlIGFib3V0IHRoYXRcbiAgICAgICAgICAgIHdpbmRvdy5vcGVuKFwic2Vjb25kLmh0bWxcIiwgXCJfdG9wXCIpO1xuICAgICAgICB9XG4gICAgfVxufSkiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///0\n")}]);