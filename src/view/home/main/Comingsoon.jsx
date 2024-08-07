import { useLocation, useParams, useSearchParams } from 'react-router-dom';
export default function Comingsoon(params) {
	const [searchParams, setSearchParams] = useSearchParams();
	//useSearchParams 配合 (URLsearch) 传参 /home/main?id=3
	const dynamicParams = useParams();
	//useParams 配合 动态路由
	const location = useLocation();
	console.log(searchParams.get('id'), 'searchParams'); // null
	console.log(dynamicParams, 'dynamicParams'); //{id: '15', name: 'zhangsan'}
	console.log(location, 'location'); //{pathname: '/home/main/comingsoon/15/zhangsan', search: '', hash: '', state: null, key: 'ukppqawe'}
	return <h1>Comingsoon</h1>;
}
