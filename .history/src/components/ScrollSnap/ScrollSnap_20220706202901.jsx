import * as React from 'react';
import { useSpring, animated } from "react-spring";
import { useNavigate } from "react-router-dom";

import './style.scss';

export default function ScrollSnap({
    children,
    childrenNum,
    targetNum,
    onAnimationStart,
}) {
    const navigate = useNavigate();
    const outerRef = React.useRef(null);
    const [mode, setMode] = React.useState('SNAP');
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
        const nowY = outerRef.current.scrollTop;
        const childHeight = outerRef.current.offsetHeight;   //１ページの高さ
        if (nowY < (childrenNum - 1) * childHeight) {
            e.preventDefault();
            if (mode !== 'SNAP') {
                setMode('SNAP');
                const nowTime = Date.now();
                setChangePageTime(nowTime);
                api.start({
                    from: {
                        y: nowY,
                    },
                    to: {
                        y: nowY - (nowY % childHeight),
                    },
                });
            }
            return;
        }
        setMode('MANUAL');
    }

    function arrowFunc(e) {
        e.preventDefault();
        if (e.code === `KeyW` || e.code === `ArrowUp`) {
            setArrowPress('UP');
        } else if (e.code === `KeyS` || e.code === `ArrowDown`) {
            setArrowPress('DOWN');
        }
    }

    React.useLayoutEffect(() => {
        //初期化処理
        const childHeight = outerRef.current.offsetHeight;   //１ページの高さ
        outerRef.current.scrollTop = targetNum * childHeight;
    }, [targetNum]);

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
        const nowY = outerRef.current.scrollTop;
        const childHeight = outerRef.current.offsetHeight;   //１ページの高さ
        const nowPage = Math.round(nowY / childHeight);
        const nextPage = nowPage + deltaPage;
        if (nextPage < childrenNum - 1) {
            navigate('/');
        }
        else if (childrenNum - 1 <= nextPage) {
            navigate('/products');
        }
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
    }, [api, childrenNum, onAnimationStart, changePageTime, navigate]);

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
        // animated.divの高さは、画面の高さと同じ（子要素は、はみ出てる）
        <animated.div
            className="infinite-scroll-loop"
            ref={outerRef}
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {children}
        </animated.div>
    );
}