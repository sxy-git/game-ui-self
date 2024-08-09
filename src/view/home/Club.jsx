import { useEffect, useState } from 'react';
import styled from 'styled-components';
// import { getClubListApi } from '../../services/account';
import { getClubListApi } from '@/services/account';
import club_user_icon from '@/assets/club/club_user_icon.webp';
import club_race_icon from '@/assets/club/club_race_icon.webp';
export default function Club() {
	const [clubList, setClubList] = useState([]);
	const [clubListTotal, setClubListTotal] = useState(0);
	const handleGetClubList = async () => {
		getClubListApi({
			name: '',
			orderBy: 'All',
			pageNum: 1,
			pageSize: 20,
			hasJoin: false,
		}).then((response) => {
			if (response.data.code === 200) {
				setClubListTotal(response.data.total);
				setClubList(response.data.rows);
			}
			console.log(response, 'response');
		});
	};
	const handleBgColor = (url) => {
		if (!url) {
			return;
		}
		if (url.includes('clublogo_common_colour_6')) {
			console.log('红色');
		} else if (url.includes('clublogo_common_colour_5')) {
			console.log('蓝色');
		} else if (url.includes('clublogo_common_colour_4')) {
			console.log('绿色');
		}
	};
	useEffect(() => {
		handleGetClubList();
	}, []);
	return (
		<Styled>
			<Header>
				<input type="text" style={{ marginRight: '2rem' }} />
				<select name="" id="" style={{ marginRight: '2rem' }}></select>
				<span style={{ marginRight: '2rem' }}>Total:{clubListTotal}</span>
				<input type="checkbox" style={{ marginRight: '2rem' }} />
			</Header>
			<ClubList>
				{clubList.map((item, index) => {
					return (
						<div
							key={index}
							className="clubItme"
							style={{ marginRight: (index + 1) % 4 === 0 ? '0' : '3rem' }}
						>
							<div className="clubName">
								{item.clubName} {handleBgColor(item.clubIcon)}
							</div>
							<div className="clubGrade">{item.clubGrade}</div>
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
		display: flex;
		flex-direction: column;
		align-items: center;
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
		margin-top: 1.5rem;
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
`;
