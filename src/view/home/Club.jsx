import { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Input, Select } from 'antd';
import styled from 'styled-components';
// import { getClubListApi } from '../../services/account';
import { getClubListApi } from '@/services/account';
import ClubGrade from '@/components/ClubGrade';

import club_user_icon from '@/assets/club/club_user_icon.webp';
import club_race_icon from '@/assets/club/club_race_icon.webp';
import club_list_bg from '@/assets/club/club_list_bg.webp';
import my_create_club_icon from '@/assets/club/my_create_club_icon.webp';
import my_joined_club_icon from '@/assets/club/my_joined_club_icon.webp';
import HeaderPage from './club/Header';

export default function Club() {
	const clubHeaderHandleRef = useRef(null);
	const clubNameInpuRef = useRef(null);
	const [clubList, setClubList] = useState([]);
	const [clubListTotal, setClubListTotal] = useState(0);

	//获取俱乐部列表
	const handleGetClubList = async ({ name, orderBy, hasJoin }) => {
		getClubListApi({
			name,
			orderBy,
			pageNum: 1,
			pageSize: 20,
			hasJoin,
		}).then((response) => {
			if (response.data.code === 200) {
				setClubListTotal(response.data.total);
				setClubList(response.data.rows);
			}
			console.log(response, 'response');
		});
	};
	//根据俱乐部图片编号获取对应的背景颜色
	const handleBgColor = (url) => {
		if (!url) {
			return;
		}
		if (url.includes('clublogo_common_colour_6')) {
			return 'club_logo_colour_gradient_6';
		} else if (url.includes('clublogo_common_colour_5')) {
			return 'club_logo_colour_gradient_5';
		} else if (url.includes('clublogo_common_colour_4')) {
			return 'club_logo_colour_gradient_4';
		} else if (url.includes('clublogo_common_colour_3')) {
			return 'club_logo_colour_gradient_3';
		} else if (url.includes('clublogo_common_colour_2')) {
			return 'club_logo_colour_gradient_2';
		} else if (url.includes('clublogo_common_colour_1')) {
			return 'club_logo_colour_gradient_1';
		}
	};

	return (
		<Styled>
			<HeaderPage
				handleGetClubList={handleGetClubList}
				clubNameInpuRef={clubNameInpuRef}
				clubListTotal={clubListTotal}
				ref={clubHeaderHandleRef}
			></HeaderPage>
			<button
				style={{ color: '#000' }}
				onClick={() => {
					// clubNameInpuRef.current && clubNameInpuRef.current.input.focus();
					// clubHeaderHandleRef.current.handleEditJoined(true);
					clubHeaderHandleRef.current.handleInputPressEnter();
				}}
			>
				搜索
			</button>
			<ClubList>
				{clubList.map((item, index) => {
					return (
						<div
							key={index}
							className={`clubItme ${handleBgColor(item.clubIcon)}`}
							style={{
								marginRight: (index + 1) % 4 === 0 ? '0' : '3rem',
								position: 'relative',
							}}
						>
							<img src={club_list_bg} alt="" className="club_list_bg" />
							{item?.isCreator && (
								<img src={my_create_club_icon} alt="" className="clubIden" />
							)}
							{!item?.isCreator && item?.hasJoin && (
								<img src={my_joined_club_icon} alt="" className="clubIden" />
							)}
							<div className="box">
								<div className="clubName">{item.clubName}</div>
								<div className="clubGrade">
									<ClubGrade grade={item.clubGrade}></ClubGrade>
								</div>
								<img src={item?.clubIcon} alt="" className="clunIcon" />
								<div className="clubItemFloor">
									<div className="left">
										<img src={club_user_icon} alt="" />{' '}
										<span style={{ color: '#fcde2f' }}>
											{item?.currentPeople}/
										</span>
										<span>{item?.maxPeople || '0'}</span>
									</div>
									<div className="right">
										<img src={club_race_icon} alt="" />{' '}
										<span>{item?.raceCount || '0'}</span>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</ClubList>
		</Styled>
	);
}
const Styled = styled.div`
	width: 100%;
	height: 100%;
	padding: 0 12rem;
	color: white;
`;

const ClubList = styled.div`
	width: 100%;
	height: calc(100% - 5.75rem);
	overflow-y: auto;
	display: flex;
	flex-wrap: wrap;
	.clubItme {
		margin-bottom: 1.13rem;
		width: 18.31rem;
		height: 21.63rem;
		background: rgba(0, 255, 255, 0.2);
		border-radius: 1rem;
		cursor: pointer;
		.club_list_bg {
			width: 100%;
			height: 100%;
			mix-blend-mode: overlay;
		}
		.clubIden {
			position: absolute;
			left: 0;
			top: 0;
			width: 4rem;
			height: 1.75rem;
		}
		.box {
			width: 100%;
			height: 100%;
			position: absolute;
			left: 0;
			top: 0;
			display: flex;
			flex-direction: column;
			align-items: center;
		}
	}
	.clubName {
		margin: 1rem 0;
		font-size: 1.38rem;
		color: #ffffff;
		line-height: 1.61rem;
		text-shadow: 0px 0.13rem 0.13rem rgba(0, 0, 0, 0.34);
	}
	.clunIcon {
		width: 10.75rem;
		height: 10.75rem;
		margin-top: 1rem;
		margin-bottom: 2rem;
	}

	.clubItemFloor {
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding: 0 1.25rem;
		font-size: 1rem;
		color: #ffffff;
		line-height: 1.17rem;
		.left,
		.right {
			display: flex;
			align-items: center;
			& > img {
				height: 0.94rem;
				width: 0.94rem;
				margin-right: 0.25rem;
			}
		}
	}
	/* club 俱乐部图标对应的底色*/
	.club_logo_colour_gradient_1 {
		background: linear-gradient(180deg, #eab748 0%, #cca33f 100%);
	}

	.club_logo_colour_gradient_2 {
		background: linear-gradient(180deg, #7a63c6 0%, #5c4c99 100%);
	}

	.club_logo_colour_gradient_3 {
		background: linear-gradient(180deg, #28816b 0%, #226757 100%);
	}

	.club_logo_colour_gradient_4 {
		background: linear-gradient(180deg, #28816b 0%, #226757 100%);
	}

	.club_logo_colour_gradient_5 {
		background: linear-gradient(180deg, #4c93cb 0%, #3c74a0 100%);
	}

	.club_logo_colour_gradient_6 {
		background: linear-gradient(180deg, #be464d 0%, #8a3237 100%);
	}
`;
