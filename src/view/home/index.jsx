import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

export default function Home() {
	return (
		<Styled>
			<Outlet></Outlet>
		</Styled>
	);
}
const Styled = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	background-color: #111;
	/* padding-left: 11rem; */
`;
