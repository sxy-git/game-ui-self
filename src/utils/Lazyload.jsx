import { lazy, Suspense, useEffect, useMemo } from 'react';
import styled from 'styled-components';

export const LazyLoad = (path) => {
	// const Comp = lazy(() => import(`../view/${path}`));
	//lazy 函数的调用仍然可能在每次渲染时发生，导致组件重新加载。
	const Comp = useMemo(() => lazy(() => import(`../view/${path}`)), []);
	// useEffect(() => {
	// 	console.log('Lazy加载');
	// }, [Comp]);
	// useEffect(() => {
	// 	console.log('path变化');
	// }, [path]);
	// console.log('path变化1', path);
	return (
		<Suspense
			fallback={
				<Styled>
					<h1>初次加载，请稍等...</h1>
				</Styled>
			}
		>
			<Comp />
		</Suspense>
	);
};
const Styled = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
