import { Link } from 'react-router-dom';
import styled from 'styled-components';
export default function NotFound(params) {
	return (
		<Styled>
			<h1>404 页面找不到了</h1>
			<Link to="/home">点击回到首页</Link>
		</Styled>
	);
}
const Styled = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
