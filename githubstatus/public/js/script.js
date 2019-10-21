
window.onload = () => {
    
  const githubStatus = document.getElementById("github-status");
  const apiStatus = document.getElementById("api-status");
  const issuesStatus = document.getElementById("issues-status");
  const notificationsStatus = document.getElementById("notifications-status");
  const gistsStatus = document.getElementById("gists-status");
  const pagesStatus = document.getElementById("pages-status");
  
  getGithubStatuses(data => {
    githubStatus.innerHTML += ` ${data[0]}`;
    apiStatus.innerHTML += ` ${data[1]}`;
    issuesStatus.innerHTML += ` ${data[2]}`;
    notificationsStatus.innerHTML += ` ${data[3]}`;
    gistsStatus.innerHTML += ` ${data[4]}`;
    pagesStatus.innerHTML += ` ${data[5]}`;

  });
  
  function getGithubStatuses(callback) {
    fetch("/status")
      .then(resp => resp.json())
      .then (data => {
        callback(data);
      })
      .catch(e => console.error(e));
  }
  
}