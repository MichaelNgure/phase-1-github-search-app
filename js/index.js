const searchUser = document.querySelector('#search')
const userInfo = document.querySelector('#user-list')
const submitInput = document.getElementById('submit')
const repoList = document.getElementById('repos-list')

const githubForm = document.getElementById('github-form')
githubForm.addEventListener('submit', (e) =>{
    e.preventDefault()
})

submitInput.addEventListener('click', (e) =>{
    // Grab data from the text input field
    let userNameInput = searchUser.value 
    const xhrRequest = new XMLHttpRequest()

    // Use that data to grab user info from github API
    xhrRequest.open("GET", `https://api.github.com/users/${userNameInput}`)
    xhrRequest.onreadystatechange = function(){
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200){
            const response = JSON.parse(this.response)
            console.log(response)
            // Display the response data from the github API
            userInfo.innerHTML = `
            <div>
            <img src='${response.avatar_url}'>
            <h1>${response.name}</h1>
            <h2>${response.login}</h2>
            <p>${response.bio}</p>
            </div>
            `
            repoList.innerHTML = `
            <li>${response.public_repos}</li>
            `
        }
    }
    xhrRequest.send()
})