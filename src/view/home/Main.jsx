import styled from 'styled-components';
import { Progress } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { getStorage } from '../../utils/StorageFn.js';

import header_home_bg from '../../assets/header_home_bg.webp';
import header_border from '../../assets/header_border.webp';
import diamonds_new from '../../assets/diamonds_new.webp';
import goldcoin_new from '../../assets/goldcoin_new.webp';
export default function Main(params) {
	const navigate = useNavigate();
	const [userInfo, setUserInfo] = useState();
	const [experience, setExperience] = useState(0);

	const handleRouteChange = (path) => {
		navigate(path);
		//query (URLsearch) 传参 /home/main?id=3
		//动态路由 /home/main/3
	};
	useEffect(() => {
		const info = getStorage('userInfo');
		setUserInfo(info);
		setExperience(Math.floor((info?.expCount / info?.totalExpCount) * 100));
	}, []);
	return (
		<Styled>
			<Header>
				<div className="headerBg">
					<img src={header_home_bg} alt="" />
				</div>
				<div className="headerImg">
					<img
						src={header_border}
						alt=""
						style={{
							position: 'absolute',
							left: 0,
							top: 0,
							width: '100%',
							height: '100%',
						}}
					/>
					<img
						src={userInfo?.headImage}
						alt=""
						style={{ width: '6.88rem', height: '6.88rem' }}
					/>
				</div>
				<div className="headerInfo">
					<div className="userName">
						<span>{userInfo?.username}</span>
						<span>Lv{userInfo?.grade}</span>
					</div>
					<div className="userLv">
						{/* 当前经验expCount/总经验totalExpCount */}
						<Progress percent={experience} showInfo={false} />
					</div>
					<div className="userAssets">
						<div>
							<img src={diamonds_new} alt="" />
							<div>{userInfo?.diamondNumber}</div>
						</div>
						<div>
							<img src={goldcoin_new} alt="" />
							<div>{userInfo?.goldCoinNumber}</div>
						</div>
					</div>
				</div>
			</Header>
			<div style={{ height: '30rem' }}>
				<Outlet></Outlet>
			</div>

			<Floor>
				<div
					onClick={() => {
						handleRouteChange('/home/main/nowplaying?id=3&name=zhangsan');
					}}
				>
					Nowplaying
				</div>
				<div
					onClick={() => {
						handleRouteChange('/home/main/comingsoon/15/zhangsan');
					}}
				>
					Comingsoon
				</div>
			</Floor>
		</Styled>
	);
}
const Styled = styled.div`
	height: 100%;
	flex: 1;
	position: relative;
	background-color: #111;
`;
const Floor = styled.div`
	height: 5rem;
	width: 100%;
	position: absolute;
	bottom: 0;
	display: flex;
	justify-content: space-evenly;
	& > div {
		width: 49.5%;
		height: 100%;
		color: white;
		font-size: 3rem;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgba(0, 0, 0, 0.7);
	}
`;
const Header = styled.div`
	position: relative;
	display: flex;
	height: 10.06rem;
	align-items: center;
	.headerBg {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
		& > img {
			width: 100%;
			height: 100%;
		}
	}
	.headerImg {
		position: relative;
		width: 8.13rem;
		height: 8.13rem;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 2rem;
	}

	.headerInfo {
		margin-left: 1.06rem;
		z-index: 10;
		.userName {
			font-size: 2.63rem;
			line-height: 3.08rem;
			color: white;
			& > span {
				margin-right: 0.5rem;
			}
		}
		.userLv {
			margin: 0.5rem 0;
			.ant-progress-inner {
				border-radius: 0;
			}
			.ant-progress-success-bg,
			.ant-progress-bg {
				border-radius: 0;
			}
			.ant-progress-inner {
				background: #c9c9c9;
			}
		}
		.userAssets {
			display: flex;
			align-items: center;

			& > div {
				position: relative;
				display: flex;
				align-items: center;
				width: 8rem;
				& > img {
					width: 2.25rem;
					height: 2.25rem;
					z-index: 10;
				}
				& > div {
					position: absolute;
					left: 1.125rem;
					background: #5d616ea3;
					border-radius: 0.25rem;
					padding-left: 1.565rem;
					padding-right: 1rem;
					color: #fff;
				}
			}
		}
	}
`;
