import { SearchOutlined } from '@ant-design/icons';

import { useEffect, useRef, useState } from 'react';
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

export default function Club() {
	const clubNameInpuRef = useRef(null);
	const [clubList, setClubList] = useState([]);
	const [clubListTotal, setClubListTotal] = useState(0);
	const [params, setParams] = useState({
		name: '',
		orderBy: 'All',
		hasJoin: false,
	});
	const [hasMyJoined, setHasMyJoined] = useState(false);
	const raceSortList = [
		{
			value: 'All',
			label: 'All',
		},
		{
			value: 'RaceCountLowToHig',
			label: 'Race Count Lowest to Highest',
		},
		{
			value: 'RaceCountHigToLow',
			label: 'Race Count Highest to Lowest',
		},
		{
			value: 'MembersLowToHig',
			label: 'Members Lowest to Highest',
		},
		{
			value: 'MembersHigToLow',
			label: 'Members Highest to Lowest',
		},
		{
			value: 'HonorScoreHigToLow',
			label: 'Honour Score Highest to Lowest',
		},
		{
			value: 'HonorScoreLowToHig',
			label: 'Honour Score Lowest to Highest',
		},
	];
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
	//输入框失焦
	const handleInputBlur = (e) => {
		const iptValue = e.target.value;
		setParams({ ...params, name: iptValue });
		// setParams((prev) => ({ ...prev, name: iptValue }));
		handleGetClubList({ ...params, name: iptValue });
	};
	//输入框回车
	const handleInputPressEnter = (e) => {
		clubNameInpuRef.current && clubNameInpuRef.current.input.blur();
	};
	//选择框改变
	const handleSelectOnChange = (e) => {
		setParams({ ...params, orderBy: e });
		handleGetClubList({ ...params, orderBy: e });
	};
	//俱乐部是否加入 筛选器
	const handleHasMyJoined = () => {
		setHasMyJoined(!hasMyJoined);
		// console.log(hasMyJoined, 'hasMyJoined');
		setParams({ ...params, hasJoin: !hasMyJoined });
		handleGetClubList({ ...params, hasJoin: !hasMyJoined });
	};
	useEffect(() => {
		handleGetClubList(params);
	}, []);
	return (
		<Styled>
			<Header>
				<Input
					ref={clubNameInpuRef}
					className="clubNameIpt"
					prefix={<SearchOutlined />}
					onBlur={handleInputBlur}
					// onBlur={(e)=>{handleInputBlur(e)}}
					onPressEnter={handleInputPressEnter}
				/>
				<Select
					defaultValue="All"
					onChange={handleSelectOnChange}
					options={raceSortList}
					className="clubSelect"
				/>
				<span style={{ marginRight: '2rem' }}>Total:{clubListTotal}</span>
				<div
					className="myJoined"
					onClick={() => {
						//取反
						handleHasMyJoined();
					}}
				>
					{hasMyJoined && '√'}
				</div>
				<span className="myJoinedText">My Joined</span>
			</Header>
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
const Header = styled.div`
	width: 100%;
	height: 5.75rem;
	padding-top: 2.56rem;
	display: flex;
	align-items: center;
	/* 俱乐部搜索输入框 */
	.clubNameIpt {
		width: 10rem;
		height: 2rem;
		border-radius: 1.25rem 1.25rem 1.25rem 1.25rem;
		border: 0.13rem solid #464855;
		margin-right: 0.75rem;
	}
	.ant-input-affix-wrapper:not(.ant-input-affix-wrapper-disabled):hover {
		border-color: #464855;
	}
	/* 俱乐部选择器 */
	.clubSelect {
		width: 15rem;
		height: 2rem;
		margin-right: 0.75rem;
		.ant-select-selector {
			border-radius: 1.25rem 1.25rem 1.25rem 1.25rem;
			border: 0.13rem solid #464855;
		}
	}
	.ant-select:not(.ant-select-disabled):hover .ant-select-selector {
		border-color: #464855;
	}
	/* 我加入的俱乐部筛选器 */
	.myJoined {
		width: 1.25rem;
		height: 1.25rem;
		background: #aeb0b9;
		box-shadow: inset 0rem 0.06rem 0.06rem 0rem rgba(0, 0, 0, 0.12);
		border-radius: 0.25rem 0.25rem 0.25rem 0.25rem;
		margin-right: 0.38rem;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1.13rem;
		cursor: pointer;
	}
	.myJoinedText {
		font-size: 1.13rem;
		color: #d9d9d9;
		line-height: 1.13rem;
	}
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
