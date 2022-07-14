let cart = JSON.parse(localStorage.getItem('cart')) || [];
let users = JSON.parse(localStorage.getItem('users')) || [];

console.log(users);

const DOMranking = document.getElementById('ranking');

for (let i = 0; i < users.length; i++) {
    users.sort(function(a,b){
        if(a.scoreAll < b.scoreAll){
            return 1;
        }
    });
    DOMranking.innerHTML += `
            <tr>
                <th scope="row">${[i + 1]}</th>
                <td>${users[i].name}</td>
                <td>${users[i].scoreAll[i] = users[i].score_art_literatura + users[i].score_entretenimiento + users[i].score_geografia + users[i].score_historia + users[i].score_natur_ciencia}</td>
                <td>${users[i].score_art_literatura}</td>
                <td>${users[i].score_entretenimiento}</td>
                <td>${users[i].score_geografia}</td>
                <td>${users[i].score_historia}</td>
                <td>${users[i].score_natur_ciencia}</td>
              </tr>
    `;
    
};