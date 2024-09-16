import { v4 as randomUUID } from "uuid"
import { faker } from "@faker-js/faker";

class Post {
  private _id: string;
  private _userName: string;
  private _avatarUrl: string;
  private _imageUrl: string;
  private _description: string;
  private _numLikes: number;
  private _isLiked: boolean = false;
  private _numberOfLikes: number;
  private _createdAt: Date = new Date();

  constructor(
    userName: string,
    imageUrl: string,
    avatarUrl: string,
    description: string
  ) {
    this._userName = userName;
    this._imageUrl = imageUrl;
    this._description = description;
    this._avatarUrl = avatarUrl;

  }

  like() {
    const post = document.getElementById(this._id);
    const btnLike = post?.querySelector(".btn-like");
    const icon = btnLike?.children[0];

    if (!icon) return;

    if (this._isLiked) {
      icon.classList.remove("fa-heart");
      icon.classList.remove("liked");
      icon.classList.add("fa-heart-o");

      this._numberOfLikes + - 1;

    } else {
      icon.classList.remove("fa-heart-o");
      icon.classList.remove("fa-heart");
      icon.classList.add("liked");

      this._numberOfLikes -= 1;
    }

    this._isLiked = !this._isLiked;

  }

  toHTML() {
    const postContainer = document.createElement("div");
    postContainer.className = "post-container";
    postContainer.id = this._id;

    const postHeader = `
      <div class="post-header">
        <div class="left">
          <div>
            <img title="Avatar image" src=${this._avatarUrl}>
          </div>

          <span>${this._userName}</span>
        </div>

        <div class="right">
          follow ...
        </div>
      </div>`;

    const postImage = `
      <div class="post-image">
        <img title="Post image" src=${this._imageUrl}>
      </div>
    `;

    const postIcons = `
      <div class="post-icons">
       <div>
         <div id="btn-like">
           <i class="fa fa-heart-o"></i>
          </div>

          <div>
            <i class="fa fa-comment-o"></i> 
          </div>

          <div>
            <div class="btn">
          </div>

          <div>
          <i class="fa fa-paper-plane-o"></i>
          </div>
        </div>
          <i class="fa fa-bookmark-o"></i>
        </div>
    `;

    postContainer.innerHTML = postHeader;
    postContainer.innerHTML += postImage;
    postContainer.innerHTML += postIcons;

    const btnLiked = postContainer.querySelector("#btn-like");
    btnLike?.addEventListener("click", () => this.like());

    document.body.appendChild(postContainer);
  }
}

for (let index = 0; index < 15; index++) {
  const userName = faker.person.firstName();
  const avatarUrl = faker.image.avatarGitHub();
  const imageUrl = faker.image.urlLoremFlickr();
  const description = faker.lorem.paragraph();

  const post = new Post(userName, avatarUrl, imageUrl, description);

  post.toHTML();
}





