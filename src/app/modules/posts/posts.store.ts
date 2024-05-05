import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { PostsService } from './posts.service';
import { pipe, switchMap, tap } from 'rxjs';
import { Post } from './models/post.i';
import { userStore } from '../../common/global-store/users/users.store';

type PostState = {
  posts: Post[];
  isLoading: boolean;
};

const initPostState: PostState = {
  posts: [],
  isLoading: false,
};

export const postsStore = signalStore(
  withState(initPostState),
  withComputed((store, usersStore = inject(userStore)) => ({
    postsWithUsers: computed(() =>
      store
        .posts()
        .map((post) => ({
          ...post,
          user: usersStore.users().find((user) => user.id === post.userId),
        }))
    ),
  })),
  withMethods((store, postsService = inject(PostsService)) => ({
    loadAllPosts: rxMethod(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() =>
          postsService.getPosts().pipe(
            tapResponse({
              next: (posts) => patchState(store, { posts, isLoading: false }),
              error: (err) => console.error(err),
            })
          )
        )
      )
    ),
  })),
  withHooks({
    onInit(store) {
      store.loadAllPosts(null);
    },
  })
);
