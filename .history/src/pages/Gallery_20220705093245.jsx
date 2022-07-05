
import * as React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import GalleryTop from './GalleryTop';
import GallerySubs from './GallerySubs';
import EndlessScrollSnap from '../components/EndlessScrollSnap/EndlessScrollSnap';
import actions from '../actions';

export default function Gallery({ fileName }) {
    const dispatch = useDispatch();
    const files = useSelector(state => state?.json?.files);
    const theme = useTheme();
    const mdUp = useMediaQuery(theme.breakpoints.up('md'));
    const smUp = useMediaQuery(theme.breakpoints.up('sm'));
    const category = React.useMemo(() => {
        // クエリパラメータを取得
        var params = new URL(window.location.href).searchParams;
        const media = params.get('media');
        if (media === 'pc') {
            return "ページ（パソコン）";
        }
        else if (media === 'tablet') {
            return "ページ（タブレット）";
        }
        else if (media === 'mobile') {
            return "ページ（スマホ）";
        }
        else if (mdUp) {
            return "ページ（パソコン）";
        }
        else if (smUp) {
            return "ページ（タブレット）";
        }
        return "ページ（スマホ）";
    }, [mdUp, smUp]);
    const categories = files[fileName] ? { ...files[fileName] } : {};
    if (!categories["一般設定"]) {
        return null;
    }
    return (
        <EndlessScrollSnap
            onAnimationStart={(nowPage, nextPage, isDown) => dispatch(actions?.animation?.set(nowPage, nextPage, isDown))}
        >
            <GalleryTop
                item={categories["一般設定"][0]}
            />
            {categories[category]?.map((item, index) =>
                <GallerySubs
                    key={item.uuid}
                    item={item}
                    index={index + 1}
                />
            )}
        </EndlessScrollSnap>
    );
}