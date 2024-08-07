import { useEffect } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';

export default function Nowplaying(params) {
	const [searchParams, setSearchParams] = useSearchParams();
	//useSearchParams 配合 (URLsearch) 传参 /home/main?id=3
	const dynamicParams = useParams();
	//useParams 配合 动态路由
	const location = useLocation();

	useEffect(() => {
		console.log('重新加载Nowplaying');
		console.log(searchParams.get('id'), 'searchParams'); //3
		console.log(dynamicParams, 'dynamicParams'); //{}
		console.log(location, 'location'); //{pathname: '/home/main/nowplaying', search: '?id=3&name=zhangsan', hash: '', state: null, key: 'ts5wrbrt'}
	}, []);
	return (
		<h1
			onClick={() => {
				setSearchParams({ id: 9, name: 'lisi' });
			}}
		>
			Nowplaying
		</h1>
	);
}
