import { SearchOutlined } from '@ant-design/icons';
import { Input, Select } from 'antd';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import styled from 'styled-components';

function HeaderPage(
	{ handleGetClubList, clubListTotal, clubNameInpuRef },
	ref
) {
	// useImperativeHandle forwardRef
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

	//父组件调用子组件方法 ()=>({})
	useImperativeHandle(ref, () => ({
		handleInputPressEnter,
		handleHasMyJoined,
		handleEditJoined,
	}));
	const handleEditJoined = (value) => {
		console.log(value, '---------my joined');
		setHasMyJoined(value);
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
		console.log('回车');
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
	);
}
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
export default forwardRef(HeaderPage);
