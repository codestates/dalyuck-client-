import React from "react";
import "./App.css";
import {
  Switch,
  Route,
  Redirect,
  withRouter,
  BrowserRouter,
} from "react-router-dom";
import Main from "./pages/Main";
import "./style/Main.scss";
import CreateCalendar from "./pages/CreateCalendar";
import RequestSubCalendar from "./pages/RequestSubCalendar";
import UpdateCalendar from "./pages/UpdateCalendar";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/main" render={() => <Main />} />
        <Route
          path="/setting/createcalendar"
          render={() => <CreateCalendar />}
        />
        <Route
          path="/setting/requestsubcalendar"
          render={() => <RequestSubCalendar />}
        />
        <Route
          path="/setting/updatecalendar"
          render={() => <UpdateCalendar />}
        />
        <Route
          path="/"
          render={() => {
            return <Redirect to="/main" />;
          }}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
