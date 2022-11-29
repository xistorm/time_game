import { memo, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { loginedRoutes, logoutedRoutes } from "./routes";
import { AuthContext } from './context'
import { AuthService } from './services'


import './styles/common.sass'

const App = () => {
	const navigate = useNavigate();

	const [user, setUser] = useState(AuthService.getUser());
	const [routes, setRoutes] = useState(user ? loginedRoutes : logoutedRoutes);

	useEffect(() => {
		setRoutes(user ? loginedRoutes : logoutedRoutes);
		navigate('/');
	}, [user]);

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			<Routes>
				{routes.map((route, index) => <Route key={index} {...route} />)}
			</Routes>
		</AuthContext.Provider>
	);
}

export default memo(App);
