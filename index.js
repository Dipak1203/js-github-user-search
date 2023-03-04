const url = "https://api.github.com/users/";
const root = document.getElementById('root');
const search = document.getElementById('search');
const getUser = async (username) => {
  try {
    const res = await fetch(url + username);
    const data = await res.json();

    const card = `
    <div class="card">
    <div class="row">
        <div class="images">
            <img src='${data.avatar_url}' alt="profile image" id="img">
        </div>
        <div class="name">
            <h1>${data.name}</h1>
            <p>${data.bio}</p>
            <div class="following">
                <p>${data.followers}: Followers</p>
                <p>${data.following}: Following</p>
                <p>${data.public_repos}: Repos</p>
            </div>
            <div id="repos"> 

            </div>
        </div>
    </div>
</div>
    `
    root.innerHTML = card;
    getRepos(username)
  } catch (error) {
    console.log(error);
  }
};

const getRepos = async(username) =>{
    const repos = document.getElementById('repos')
    try{
        const res = await fetch(url + username + '/repos')
        const data = await res.json();
        data.forEach(
            (item) =>{
                // console.log(item)
                const elem = document.createElement('a');
                elem.classList.add('repo');
                elem.href = item.html_url;
                elem.target = "_blank";
                elem.innerHTML = item.name;
                repos.appendChild(elem);
            }
        )
    }catch(error){
        console.log(error)
    }
}

const formSubmit = () =>{
    if(search.value != ""){
        getUser(search.value);
        search.value = "";
    }

    return false;
}


search.addEventListener('focusout',() =>{
    formSubmit();
})
