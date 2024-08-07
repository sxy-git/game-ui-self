import { message, Input } from 'antd';
import { MailOutlined, UnlockOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import bgImg from '../assets/newLoginBg.webp';
import icon_error from '../assets/icon_error.png';
import { useRef, useState } from 'react';
import {
	loginApi,
	getUserInfoApi,
	getAssetsInfoApi,
} from '../services/account.js';
import { shakeFn, throttle } from '../utils/public.js';
import { setCookieValue, setStorage } from '../utils/StorageFn.js';
import { useNavigate } from 'react-router-dom';
export default function Login(params) {
	const emailValueRef = useRef('');
	const passwordValueRef = useRef('');
	const [emailError, setEmailError] = useState(false);
	const [emailErrorTip, setEmailErrorTip] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [passwordErrorTip, setPasswordErrorTip] = useState('');
	const navigate = useNavigate();
	const handleGetuserInfo = async () => {
		const userInfoResult = await getUserInfoApi();
		const assetsInfoResult = await getAssetsInfoApi();
		console.log(userInfoResult, assetsInfoResult);
		let userInfo = {};
		if (userInfoResult.data.code === 200) {
			userInfo = userInfoResult.data.data;
		}
		if (assetsInfoResult.data.code === 200) {
			userInfo = { ...userInfo, ...assetsInfoResult.data.data };
		}
		// setCookieValue('userInfo', userInfo, 7); //数据太多 ，存到localStorage里面
		setStorage('userInfo', userInfo);
	};
	const handleLogin = async () => {
		const email = emailValueRef.current.input.value;
		const password = passwordValueRef.current.input.value;
		if (!email) {
			setEmailError(true);
			setEmailErrorTip(true);
			return;
		}
		setEmailError(false);
		setEmailErrorTip(false);
		const NicknameLengthReg = /^.{3,10}$/;
		if (!NicknameLengthReg.test(password)) {
			setPasswordError(true);
			setPasswordErrorTip('Please enter a name with 3 to 10 characters');
			return;
		}
		const regex = /[a-zA-Z0-9\s]{3,10}$/;
		if (!regex.test(password)) {
			setPasswordError(true);
			setPasswordErrorTip(
				'Enter letters (a-z), uppercase letters (A-Z), and numeric symbols'
			);
			return;
		}
		setPasswordError(false);
		setPasswordErrorTip('');
		loginApi({ username: email, password }).then((result) => {
			if (result.data.code === 200) {
				console.log(result.data);
				console.log(result.data.data.token);
				setCookieValue('token', result.data.data.token, 7);
				console.log(1232);
				navigate('/home/Main');
				handleGetuserInfo();
				message.success('成功');
			} else if (result.data.code === 500) {
				message.error(result.data.msg);
			}
		});
	};
	//防抖
	const handleShakeFn = shakeFn(handleLogin, 300);
	//节流
	const handleThrottle = throttle(handleLogin, 1000);
	return (
		<Styled>
			<BgImg src={bgImg} alt="" />
			<div className="Body">
				<div className="loginIpt">
					<div style={{ position: 'relative' }}>
						<Input
							ref={emailValueRef}
							placeholder="Email address"
							prefix={
								<MailOutlined style={{ fontSize: '2rem' }} className="" />
							}
							onFocus={() => {
								emailErrorTip && setEmailErrorTip(false);
							}}
							status={emailError ? 'error' : ''}
						/>
						{emailErrorTip && (
							<Tip>
								<img
									src={icon_error}
									alt=""
									style={{
										width: '1rem',
										height: '1rem',
										marginRight: '0.5rem',
									}}
								/>
								<div>email format error</div>
							</Tip>
						)}
					</div>
					<div style={{ position: 'relative' }}>
						<Input.Password
							ref={passwordValueRef}
							placeholder="Password"
							prefix={
								<UnlockOutlined style={{ fontSize: '2rem' }} className="" />
							}
							onFocus={() => {
								passwordErrorTip && setPasswordErrorTip('');
							}}
							status={passwordError ? 'error' : ''}
						/>
						{!!passwordErrorTip && (
							<Tip>
								<img
									src={icon_error}
									alt=""
									style={{
										width: '1rem',
										height: '1rem',
										marginRight: '0.5rem',
									}}
								/>
								<div>{passwordErrorTip}</div>
							</Tip>
						)}
					</div>

					<LoginButton
						onClick={() => {
							handleThrottle();
						}}
					>
						Login
					</LoginButton>
				</div>
			</div>
		</Styled>
	);
}
const Styled = styled.div`
	width: 100%;
	height: 100vh;
	position: relative;
	.Body {
		position: absolute;
		z-index: 10;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.loginIpt {
		margin-left: 21.88rem;
		margin-top: 20rem;
		width: 42.5rem;
	}
	.ant-input-affix-wrapper {
		margin-bottom: 0.75rem;
	}
	.ant-input {
		height: 3.75rem;
		font-size: 1.5rem;
		color: #222222;
		line-height: 1.76rem;
	}
	.ant-input::placeholder {
		color: #888888;
	}

	.ant-input-affix-wrapper > .ant-input:not(textarea) {
		padding: 0.5rem;
	}
`;
const BgImg = styled.img`
	width: 100%;
	height: 100%;
`;
const LoginButton = styled.div`
	width: 100%;
	height: 3.75rem;
	background-color: #d5081f;
	border-radius: 0.5rem;
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;
	font-size: 1.5rem;
	transition-duration: 300ms;
	cursor: pointer;
	&:active {
		scale: 0.9;
	}
`;
const Tip = styled.div`
	width: 30rem;
	height: 2rem;
	position: absolute;
	top: 3.5rem;
	left: 3rem;
	background-color: #f6f7f9;
	border: 1px solid black;
	z-index: 10;
	display: flex;
	align-items: center;
	padding-left: 1rem;
`;
