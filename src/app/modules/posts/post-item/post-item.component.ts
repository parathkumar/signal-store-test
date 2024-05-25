import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { Post, PostWithUser } from '../models/post.i';
import { DialogComponent } from "../../../shared/dialog/dialog.component";

@Component({
    selector: 'st-post-item',
    standalone: true,
    templateUrl: './post-item.component.html',
    styleUrl: './post-item.component.scss',
    imports: [JsonPipe, DialogComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostItemComponent {
  details = input.required<PostWithUser>();
}
