import { useEffect, useState } from 'react';

import club_grade_crown from '@/assets/club/club_grade_crown.webp';
import club_grade_sun from '@/assets/club/club_grade_sun.webp';
import club_grade_moon from '@/assets/club/club_grade_moon.webp';
import club_grade_star from '@/assets/club/club_grade_star.webp';

export default function ClubGrade({ grade = 5 }) {
	const [star, setStar] = useState(0);
	const [moon, setMoon] = useState(0);
	const [sun, setSun] = useState(0);
	const [crown, setCrown] = useState(0);
	useEffect(() => {
		//星星代表1 月亮代表4  太阳代表16 皇冠代表64
		let star = 0;
		let moon = 0;
		let sun = 0;
		let crown = 0;
		if (grade / 64 > 1) {
			crown = Math.floor(grade / 64);
			grade = grade - crown * 64;
		}
		if (grade / 16 > 1) {
			sun = Math.floor(grade / 16);
			grade = grade - sun * 16;
		}
		if (grade / 4 > 1) {
			moon = Math.floor(grade / 4);
			grade = grade - moon * 4;
		}
		star = grade;
		setCrown(crown);
		setMoon(moon);
		setSun(sun);
		setStar(star);
	}, []);
	return (
		<div>
			{crown > 0 &&
				new Array(crown).fill(0).map((item, index) => {
					return (
						<img
							src={club_grade_crown}
							alt=""
							style={{
								width: '1.5rem',
								height: '1.5rem',
								marginRight: '0.12rem',
							}}
						/>
					);
				})}
			{sun > 0 &&
				new Array(sun).fill(0).map((item, index) => {
					return (
						<img
							src={club_grade_sun}
							alt=""
							style={{
								width: '1.5rem',
								height: '1.5rem',
								marginRight: '0.12rem',
							}}
						/>
					);
				})}
			{moon > 0 &&
				new Array(moon).fill(0).map((item, index) => {
					return (
						<img
							src={club_grade_moon}
							alt=""
							style={{
								width: '1.5rem',
								height: '1.5rem',
								marginRight: '0.12rem',
							}}
						/>
					);
				})}
			{star > 0 &&
				new Array(star).fill(0).map((item, index) => {
					return (
						<img
							src={club_grade_star}
							alt=""
							style={{
								width: '1.5rem',
								height: '1.5rem',
								marginRight: '0.12rem',
							}}
						/>
					);
				})}
		</div>
	);
}
