
class UI {
  constructor(){
    this.post = document.querySelector('#posts');
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postSubmit = document.querySelector('.post-submit');
    this.forState = 'add';
  }

  //SHOW POSTS
  showPosts(posts){
    let output = '';
    posts.forEach(post => {
      output += `
          <div class="card mb-3">
            <div class="card-body">
              <h4 class="card-title">${post.title}</h4>
              <p class="card-text">${post.body}</p>
              <a href="#" class="edit card-link" data-id="${post.id}"><i class="fa fa-edit"></i></a>
              <a href="#" class="delete card-link" data-id="${post.id}"><i class="fa fa-trash-alt"></i></a>
            </div>
          </div>
      `
    });

    this.post.innerHTML = output;
  }

  //SHOW ALERT
  showAlert(message,className){
    // this.clearAlert();
    //create div
    const div = document.createElement('div');
    //Add classes
    div.className = className;
    //Add test
    div.appendChild(document.createTextNode(message));
    //Get the parent
    const container = document.querySelector('.postsContainer');
    //Get posts
    const posts = document.querySelector('#posts');
    //Insert Alert div
    container.insertBefore(div,posts);
    //Timeout
    setTimeout(() => {
      this.clearAlert();
    },3000);
  }

  //CLEAR ALERT
  clearAlert(){
    const currentAlert = document.querySelector('.alert');
    if(currentAlert){
      currentAlert.remove();
    }

  }

  //Clear Fields
  clearFields(){
    this.titleInput.value = '';
    this.bodyInput.value = '';
  }

  }

export const ui = new UI();
