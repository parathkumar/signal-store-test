import { inject } from '@angular/core';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { User } from '../../model/user.i';
import { UsersService } from '../../services/users.service';
import { tapResponse } from '@ngrx/operators';

type UserState = {
  users: User[];
  isLoading: boolean;
};

const initUserState: UserState = {
  users: [],
  isLoading: false,
};
export const userStore = signalStore(
  withState(initUserState),
  withMethods((store, userService = inject(UsersService)) => ({
    loadAllUsers: rxMethod(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() =>
          userService
            .getUsers()
            .pipe(
              tapResponse({
                next: (users) => patchState(store, { isLoading: false, users }),
                error: (err) => console.error(err),
              })
            )
        )
      )
    ),
  })),
  withHooks({onInit(store) {
    store.loadAllUsers(null)
  },})
);
