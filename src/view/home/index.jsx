import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import pixel_bg from '@/assets/pixel_bg.webp';
export default function Home() {
	return (
		<Styled style={{ background: `url(${pixel_bg}) repeat`, backgroundSize: '7rem 7rem' }}>
			<Outlet></Outlet>
		</Styled>
	);
}
const Styled = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	background-color: #111;
`;
