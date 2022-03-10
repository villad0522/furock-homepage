
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
    const isLandscape = useMediaQuery(theme.breakpoints.up('sm'));
    const category = isLandscape ? "ページ（パソコン）" : "ページ（スマホ）";
    const categories = files[fileName] ? { ...files[fileName] } : {};
    if (!categories["一般設定"]) {
        return null;
    }
    let pageSize = 1;
    if (categories[category]?.length > 0) {
        pageSize = 1 + categories[category]?.length;
    }
    return (
        <EndlessScrollSnap
            childrenNum={pageSize}
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
