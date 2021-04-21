import './App.scss';
import NavBar from './components/NavBar'
import {
	BrowserRouter as Router,
	Switch,
	Route
  } from "react-router-dom";
import HomePage from './pages/Home';
import MastersPage from './pages/Masters';
import NotFoundPage from './pages/NotFound';
import LoginPage from './pages/Login';
import OrdersPage from './pages/Orders';
import { AuthProvider } from './contexts/authContext';
import PrivateRoute from './components/PrivateRoute';
import bem from 'easy-bem';


const b = bem('App');

function App() {
	return (
		<Router>
			<AuthProvider>
				<div className={b()}>
					<header>
						<NavBar className={b('nav-bar')}/>
					</header>


					<main className={b('main')}>
						<Switch>
							<PrivateRoute exact path="/">
								<HomePage />
							</PrivateRoute>

							<PrivateRoute path="/masters">
								<MastersPage />
							</PrivateRoute>

							<PrivateRoute path="/orders">
								<OrdersPage />
							</PrivateRoute>

							<Route path="/login">
								<LoginPage />
							</Route>

							<Route path="*">
								<NotFoundPage />
							</Route>
						</Switch>
					</main>
				</div>
			</AuthProvider>
		</Router>
	);
}

export default App;
