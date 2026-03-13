let Name = document.getElementById('name')
let number = document.getElementById('num')
let email = document.getElementById('email')
let password = document.getElementById('pass')
let createAcc = document.getElementById('btn')
let login = document.getElementById('login')
let logout = document.getElementById('logout')
let allusers = JSON.parse(localStorage.getItem('createUser')) || []


if (login) {
        login.addEventListener('click', () => {
                 
                let user = false
                let userIndex = 0
                for (let i = 0; i < allusers.length; i++) {

                        if (email.value == allusers[i].email && password.value == allusers[i].password) {
                                user = true
                                userIndex = i;
                                email.value=""
                                password.value=""
                                break;
                        }
                }
                if (user) {
                       
                        
                        Swal.fire({
                                title: 'Success!',
                                text: 'Login successfull',
                                icon: 'success',
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: 'OK'
                        }).then(() => {
                                localStorage.setItem('userStatus', 'userlogin');
                                localStorage.setItem('userIndex', userIndex);
                                window.location.href="dashboard.html";
                        });
                       
                }
                else {
                        Swal.fire({
                                title: 'Error!',
                                text: 'User not found',
                                icon: 'error',
                                confirmButtonColor: '#d33',
                                confirmButtonText: 'Try Again'
                        })
                        email.value=""
                        password.value=""
                }

                
        })
}

        

if (createAcc) {
       
        createAcc.addEventListener('click', () => {

                if (Name.value == "" || number.value == "" || email.value == "" || password.value == "") {
                        Swal.fire({
                                title: 'Warning!',
                                text: 'Please fill all inputs',
                                icon: 'warning',
                                confirmButtonColor: '#ff9800',
                                confirmButtonText: 'OK'
                        })
                        return;
                }
                
                let createUser = {
                        Name: Name.value,
                        number: number.value,
                        email: email.value,
                        password: password.value
                }

                let emailExists = false;

                for (let i = 0; i < allusers.length; i++) {
                        if (email.value === allusers[i].email) {
                                emailExists = true;
                                break;
                        }
                }

                if (emailExists) {
                        Swal.fire({
                                title: 'Error!',
                                text: 'Email already exists!',
                                icon: 'error',
                                confirmButtonColor: '#d33',
                                confirmButtonText: 'OK'
                        })
                        return;  
                }

                allusers.push(createUser)
                localStorage.setItem('createUser', JSON.stringify(allusers))
                
                Swal.fire({
                        title: 'Success!',
                        text: 'Account created successfully!',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Login'
                }).then((result) => {
                        if (result.isConfirmed) {
                                window.location.href="login page.html"
                        }
                })
        })
}
                        let userName = document.getElementById('user-name');
                         let index = localStorage.getItem('userIndex');
                         if (userName && index !== null && allusers[index]) {
                                 userName.innerText = allusers[index].Name;
                         } 




if (logout) {
                logout.addEventListener('click', () => {
                        localStorage.removeItem('userIndex');
                        localStorage.removeItem('userStatus');
                        window.location.href = "login page.html";
                });
        }

                       
       
       

                        let addPost = document.getElementById('add-post');
                        if(addPost){
                                addPost.addEventListener('click', () => {
                                        document.getElementById('overlay').style.display = 'block';
                                        document.getElementById('dialogue-box').style.display = 'block';        
                                });
                        }

                        let submit = document.getElementById('submit');
                        if(submit){
                                submit.addEventListener('click', () => {
                                        let title = document.getElementById('title').value;
                                        let content = document.getElementById('content').value;
                                        if(title && content){
                                                let posts = JSON.parse(localStorage.getItem('posts')) || [];
                                                let index = localStorage.getItem('userIndex');
                                                let user = allusers[index];
                                                let post = {
                                                        title: title,
                                                        content: content,
                                                        author: user.Name,
                                                        date: new Date().toLocaleString()
                                                };
                                                posts.push(post);
                                                localStorage.setItem('posts', JSON.stringify(posts));
                                                document.getElementById('title').value = '';
                                                document.getElementById('content').value = '';
                                                document.getElementById('overlay').style.display = 'none';
                                                document.getElementById('dialogue-box').style.display = 'none';
                                                displayPosts();
                                                Swal.fire('Success!', 'Post added successfully!', 'success');
                                        } else {
                                                Swal.fire('Error!', 'Please fill all fields!', 'error');
                                        }
                                });
                        }

                        function displayPosts() {
                                let posts = JSON.parse(localStorage.getItem('posts')) || [];
                                let container = document.getElementById('posts-container');
                                if(container){
                                        container.innerHTML = '';
                                        posts.forEach(post => {
                                                let postCard = document.createElement('div');
                                                postCard.className = 'post-card';
                                                postCard.innerHTML = `
                                                        <h4>${post.title}</h4>
                                                        <p>${post.content}</p>
                                                        <div class="post-meta">By ${post.author} on ${post.date}</div>
                                                `;
                                                container.appendChild(postCard);
                                        });
                                }
                        }

                        displayPosts();

                        let overlay = document.getElementById('overlay');
                        if(overlay){
                                overlay.addEventListener('click', () => {
                                        document.getElementById('overlay').style.display = 'none';
                                        document.getElementById('dialogue-box').style.display = 'none';
                                });
                        }

        
        
                        
                       
                        
                        let toggle = document.getElementById("togglePassword");
                        if(toggle && password){
                                
                        toggle.addEventListener("click", () => {
                        
                                if (password.type === "password") {
                                        password.type = "text";
                                        toggle.classList.replace("fa-eye-slash", "fa-eye");
                                } else {
                                        password.type = "password";
                                        toggle.classList.replace("fa-eye", "fa-eye-slash");
                                }
                        
                        });
                                }