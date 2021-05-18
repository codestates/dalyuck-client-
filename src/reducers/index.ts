import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import userReducer from "./UserReducer";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["userReducer"],
};

const rootReducer = combineReducers({
  userReducer,
});

export default persistReducer(persistConfig, rootReducer);
export type RootState = ReturnType<typeof rootReducer>;
