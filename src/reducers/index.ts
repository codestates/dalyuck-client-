import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import userReducer from "./UserReducer";
import dateReducer from "./DateReducer";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["userReducer","dateReducer"],
};

const rootReducer = combineReducers({
  userReducer,
  dateReducer
});

export default persistReducer(persistConfig, rootReducer);
export type RootState = ReturnType<typeof rootReducer>;
