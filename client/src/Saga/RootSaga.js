import { fork,all } from "redux-saga/effects";
import { UserLoginWatcher } from "./AuthSaga";
import { PaintingWatcher } from "./Painting";

export default function* rootSaga() {
    yield all([
        fork(UserLoginWatcher),
        fork(PaintingWatcher)
    ]);
}