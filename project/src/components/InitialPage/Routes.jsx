import React from "react";
import { Switch, Route, Redirect } from "react-router";

import InitialPage from "./InitialPage";
import FormController from "../Form/Form";
import ScheduleController from "../Schedule/Schedule";
import TaskManagerController from "../TaskManager/TaskManager"
import GradesManagerController from "../Grades/GradesManager";


export default function Routes() {
	return (
		<Switch>
			<Route exact path="/" component={InitialPage} />
			<Route exact path="/subject-form" component={FormController} />
			<Route exact path="/schedule" component={ScheduleController} />
			<Route exact path='/task-manager' component={TaskManagerController}/>
			<Route exact path="/grades" component={GradesManagerController}/>
			<Redirect from="*" to="/" />
		</Switch>
	);
}
