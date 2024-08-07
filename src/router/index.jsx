import { Navigate, useRoutes } from 'react-router-dom';
import { LazyLoad } from '../utils/Lazyload';

export default function Router() {
	const element = useRoutes([
		{
			path: '/home',
			element: LazyLoad('home'),

			children: [
				{ index: true, element: <Navigate to="/home/main" /> },
				{
					path: 'main',
					element: LazyLoad('home/Main'),
					children: [
						{
							//动态路由
							path: 'comingsoon/:id/:name',
							element: LazyLoad('home/main/Comingsoon'),
						},
						{
							path: 'nowplaying',
							element: LazyLoad('home/main/Nowplaying'),
						},
					],
				},
				{
					path: 'champs',
					element: LazyLoad('home/Champs'),
				},
				{ path: 'club', element: LazyLoad('home/Club'), exact: true },
				{
					path: 'market',
					element: LazyLoad('home/Market'),
				},
				{
					path: 'myRace',
					element: LazyLoad('home/MyRace'),
				},
			],
		},
		{
			path: '/detail',
			element: LazyLoad('Detail'),
		},
		{
			path: '/login',
			element: LazyLoad('Login'),
		},
		{ path: '/', element: <Navigate to="/home" /> },
		{ path: '*', element: LazyLoad('404') },
	]);

	return element;
}
