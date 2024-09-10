document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('commentForm');
    const commentsDiv = document.getElementById('comments');

    // Load comments from local storage
    let comments = JSON.parse(localStorage.getItem('comments')) || [];

    // Render comments
    function renderComments() {
        commentsDiv.innerHTML = '';
        comments.forEach((comment, index) => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.innerHTML = `
                <div class="comment-header">
                    <img src="${comment.profilePic}" alt="Profile Pic">
                    <h4>${comment.username}</h4>
                    <button onclick="deleteComment(${index})">Delete</button>
                </div>
                <p>${comment.comment}</p>
                <div class="comment-line"></div>
            `;
            commentsDiv.appendChild(commentElement);
        });
    }

    // Delete comment
    window.deleteComment = function(index) {
        comments.splice(index, 1);
        localStorage.setItem('comments', JSON.stringify(comments));
        renderComments();
    };

    // Submit comment
    commentForm.addEventListener('submit', e => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const comment = document.getElementById('comment').value;
        const profilePicFile = document.getElementById('profilePic').files[0];
        
        // Convert image to data URL
        const reader = new FileReader();
        reader.onload = function(event) {
            const profilePic = event.target.result;
            comments.push({ username, comment, profilePic });
            localStorage.setItem('comments', JSON.stringify(comments));
            renderComments();
        };
        reader.readAsDataURL(profilePicFile);

        // Reset form fields
        commentForm.reset();
    });

    // Render initial comments
    renderComments();
});
