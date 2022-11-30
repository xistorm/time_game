import { memo, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import { loginedRoutes, logoutedRoutes } from "./routes";
import { AuthContext } from './context'
import { AuthService } from './services'


import './styles/common.sass'

const App = () => {
	const [user, setUser] = useState(AuthService.getUser());
	const [routes, setRoutes] = useState(user ? loginedRoutes : logoutedRoutes);

	const updateUser = (user) => user ? setUser({ ...user }) : setUser(user);

	const routeDataToRoute = ({ path, element, children }, index) => {
		return (
			<Route key={index} path={path} element={element}>
				{children && children.map(routeDataToRoute)}
			</Route>
		)
	}

	useEffect(() => {
		setRoutes(user ? loginedRoutes : logoutedRoutes);
	}, [user]);

	return (
		<AuthContext.Provider value={{ user, updateUser }}>
			<Routes>
				{routes.map(routeDataToRoute)}
			</Routes>
		</AuthContext.Provider>
	);
}

export default memo(App);
