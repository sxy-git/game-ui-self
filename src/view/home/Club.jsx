import { useEffect, useState } from 'react';
import styled from 'styled-components';
// import { getClubListApi } from '../../services/account';
import { getClubListApi } from '@/services/account';
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
						<div key={index}>
							<div>{item.clubName}</div>
							<div>{item.clubGrade}</div>
							<img src={item?.clubIcon} alt="" />
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
	/* background: url('../../assets/pixel_bg.webp') repeat;
	background-size: '8.25rem 8.25rem'; */
`;
const Header = styled.div`
	width: 100%;
	height: 5.75rem;
	padding-top: 2.56rem;
`;
const ClubList = styled.div`
	width: 100%;
	height: 55rem;
	overflow-y: auto;
`;
