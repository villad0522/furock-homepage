import * as React from 'react';
import Box from '@mui/material/Box';
import { useSpring, animated } from "react-spring";

import './style.scss';

export default function ScrollSnap({
    children,
    onAnimationStart,
}) {
    return (
        <MyComponent
            childrenNum={children.length}
            onAnimationStart={onAnimationStart}
        >
            {children}
        </MyComponent>
    );
};


function MyComponent({
    children,
    childrenNum,
    onAnimationStart,
}) {
    const innerRef = React.useRef(null);
    const outerRef = React.useRef(null);
    const [touchY, setTouchY] = React.useState(0);
    const [arrowPress, setArrowPress] = React.useState('');
    const [changePageTime, setChangePageTime] = React.useState(false);

    const [, api] = useSpring(() => ({
        y: 0,
        onChange: props => {
            outerRef.current.scrollTop = props.value.y;
        },
        config: { frequency: 1 },
    }));

    function preventDefault(e) {
        e.preventDefault();
    }

    function arrowFunc(e) {
        e.preventDefault();
        if (e.code === `KeyW` || e.code === `ArrowUp`) {
            setArrowPress('UP');
        } else if (e.code === `KeyS` || e.code === `ArrowDown`) {
            setArrowPress('DOWN');
        }
    }

    React.useEffect(() => {
        const c = outerRef?.current;
        c?.addEventListener("wheel", preventDefault, { passive: false });
        c?.addEventListener("touchmove", preventDefault, { passive: false });
        document.addEventListener("keydown", arrowFunc, { passive: false });
        return () => {
            c?.removeEventListener("wheel", preventDefault);
            c?.removeEventListener("touchmove", preventDefault);
            document.removeEventListener("keydown", arrowFunc);
        };
    });

    const changePage = React.useCallback(deltaPage => {
        const childrenHeight = innerRef.current.offsetHeight;
        const nowY = outerRef.current.scrollTop;
        const childHeight = childrenHeight / childrenNum;   //１ページの高さ
        const nowPage = Math.round(nowY / childHeight);
        const nextPage = nowPage + deltaPage;
        if (nextPage < 0 || childrenNum <= nextPage) {
            return;
        }
        const nowTime = Date.now();
        if ((nowTime - changePageTime) < 1000) {
            return;
        }
        setChangePageTime(nowTime);
        api.start({
            from: {
                y: nowY,
            },
            to: {
                y: nextPage * childHeight,
            },
        });
        if (onAnimationStart) {
            onAnimationStart(nowPage % childrenNum, nextPage % childrenNum, deltaPage === 1);
            //親コンポーネントに情報を伝える
        }
    }, [api, childrenNum, onAnimationStart, changePageTime]);

    React.useLayoutEffect(() => {
        //カーソルキーが押されたときの処理
        if (!arrowPress) { return; }
        if (arrowPress === 'UP') {
            changePage(-1);
        }
        else if (arrowPress === 'DOWN') {
            changePage(1);
        }
        setArrowPress('');
    }, [arrowPress, changePage]);

    const handleWheel = event => {
        if (event.deltaY > 5) {
            changePage(1);
        }
        else if (event.deltaY < -5) {
            changePage(-1);
        }
    };

    const handleTouchStart = event => setTouchY(event?.touches[0].clientY);

    const handleTouchMove = event => {
        if (touchY === null) {
            return;
        }
        if (event?.touches[0].clientY > touchY) {
            changePage(-1);
        }
        else {
            changePage(1);
        }
        setTouchY(null);
    }

    const handleTouchEnd = event => setTouchY(null);

    return (
        <animated.div
            className="infinite-scroll-loop"
            ref={outerRef}
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <Box ref={innerRef}>
                {children}
            </Box>
        </animated.div>
    );
}