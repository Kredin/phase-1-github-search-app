const submitUserSearch = document.getElementsByName("submit")[0];
const submitRepoSearch = document.getElementsByName("submit")[1];

submitUserSearch.addEventListener("click", (e) => {
  e.preventDefault();
  const query = document.querySelector("#search").value;
  fetch(`https://api.github.com/search/users?q=${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Accept: application / vnd.github.v3 + json,
    },
  })
    .then((res) => res.json())
    .then((data) => createUserCards(data.items));
});

function createUserCards(data) {
  const userList = document.querySelector("#user-list");
  userList.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    let li = document.createElement("li");
    li.addEventListener("click", (e) => {
      e.preventDefault();
      const query = data[i].login;
      fetch(`https://api.github.com/users/${query}/repos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Accept: application / vnd.github.v3 + json,
        },
      })
        .then((res) => res.json())
        .then((data) => createRepoCards(data));
    });
    let h2 = document.createElement("h2");
    h2.textContent = data[i].login;

    let img = document.createElement("img");
    img.setAttribute("src", data[i].avatar_url);

    let p = document.createElement("p");
    p.textContent = data[i].html_url;

    li.appendChild(h2);
    li.appendChild(img);
    li.appendChild(p);

    userList.appendChild(li);
  }
}

submitRepoSearch.addEventListener("click", (e) => {
  e.preventDefault();
  const query = document.querySelector("#search").value;
  fetch(`https://api.github.com/users/${query}/repos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Accept: application / vnd.github.v3 + json,
    },
  })
    .then((res) => res.json())
    .then((data) => createRepoCards(data));
});

function createRepoCards(data) {
  const repoList = document.querySelector("#repos-list");
  repoList.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    let li = document.createElement("li");

    let h2 = document.createElement("h2");
    h2.textContent = data[i].name;

    let p1 = document.createElement("p");
    p1.textContent = data[i].description;

    let p2 = document.createElement("p");
    p2.textContent = data[i].html_url;

    li.appendChild(h2);
    li.appendChild(p1);
    li.appendChild(p2);

    repoList.appendChild(li);
  }
}
