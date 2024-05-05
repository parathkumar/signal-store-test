import { Component, input, viewChild } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { Post, PostWithUser } from '../models/post.i';
import { DialogComponent } from "../../../shared/dialog/dialog.component";

@Component({
    selector: 'st-post-item',
    standalone: true,
    templateUrl: './post-item.component.html',
    styleUrl: './post-item.component.scss',
    imports: [JsonPipe, DialogComponent]
})
export class PostItemComponent {
  details = input.required<PostWithUser>();
}
