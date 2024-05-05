import { Component, OnInit, inject } from '@angular/core';
import { postsStore } from './posts.store';
import { JsonPipe } from '@angular/common';
import { PostItemComponent } from "./post-item/post-item.component";
import { userStore } from '../../common/global-store/users/users.store';

@Component({
    selector: 'app-posts',
    standalone: true,
    templateUrl: './posts.component.html',
    styleUrl: './posts.component.scss',
    providers: [postsStore, userStore],
    imports: [PostItemComponent,JsonPipe]
})
export class PostsComponent{
  store = inject(postsStore);
  userStore = inject(userStore);
}
