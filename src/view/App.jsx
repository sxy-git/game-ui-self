import styled from 'styled-components';
import MRouter from '../router';
import LeftTabPage from '../components/LeftTab';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCookieValue } from '../utils/StorageFn';
export default function App() {
	const [isHiddenLeftTab, setIsHiddenLeftTab] = useState(true);
	const location = useLocation();
	const navigate = useNavigate();
	useEffect(() => {
		const tokne = getCookieValue('token');
		if (!location.pathname.includes('/login') && !tokne) {
			navigate('/login');
		} else if (location.pathname.includes('/login') && tokne) {
			navigate('/home');
		}
	}, [location]);
	useEffect(() => {
		console.log(location);
		if (location.pathname.includes('/home')) {
			setIsHiddenLeftTab(false);
		} else {
			setIsHiddenLeftTab(true);
		}
	}, [location]);
	return (
		<Styled>
			{!isHiddenLeftTab && <LeftTabPage></LeftTabPage>}
			<MRouter></MRouter>
		</Styled>
	);
}
const Styled = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
`;
