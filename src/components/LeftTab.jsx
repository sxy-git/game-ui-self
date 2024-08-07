import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export default function LeftTabPage() {
	return (
		<Styled>
			<LeftTab>
				<NavLink
					to="/home/main"
					className={(e) => (e.isActive ? 'home_active_tab' : '')}
				>
					<div>Main</div>
				</NavLink>
			</LeftTab>
			<LeftTab>
				<NavLink
					to="/home/champs"
					className={(e) => (e.isActive ? 'home_active_tab' : '')}
				>
					<div>Champs</div>
				</NavLink>
			</LeftTab>
			<LeftTab>
				<NavLink
					to="/home/club"
					className={(e) => (e.isActive ? 'home_active_tab' : '')}
				>
					<div>Club</div>
				</NavLink>
			</LeftTab>
			<LeftTab>
				<NavLink
					to="/home/market"
					className={(e) => (e.isActive ? 'home_active_tab' : '')}
				>
					<div>Market</div>
				</NavLink>
			</LeftTab>
			<LeftTab>
				<NavLink
					to="/home/myRace"
					className={(e) => (e.isActive ? 'home_active_tab' : '')}
				>
					<div>MyRace</div>
				</NavLink>
			</LeftTab>
		</Styled>
	);
}
const Styled = styled.div`
	width: 11rem;
	height: 100vh;
	background: linear-gradient(185deg, #661717 0.44%, #2a1212 55.78%);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
const LeftTab = styled.div`
	a {
		width: 100%;
		color: white;
		text-decoration: none;
		display: block;
	}
	& > a > div {
		width: 11rem;
		height: 5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
	}

	.home_active_tab {
		background-color: red;
	}
`;
