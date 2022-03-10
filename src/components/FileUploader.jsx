
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NativeTypes } from 'react-dnd-html5-backend';
import { useDrop } from 'react-dnd';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { v4 as uuidv4 } from 'uuid';

import actions from '../actions';

const FileUploader = ({ url, onChange }) => {
  const dispatch = useDispatch();
  const [idBuffer, setIdBuffer] = useState('');
  const [content, setContent] = useState(
    <>
      画像ファイルを < br /> ドラッグしてください
    </>
  );
  const newUrl = useSelector(state => state?.imageUploader[idBuffer]);
  //
  useEffect(() => {
    if (newUrl === 'FAILURE') {
      setContent("アップロード失敗");
    }
    else if (newUrl && idBuffer !== '') {
      setIdBuffer('');
      onChange(newUrl);
      setContent(
        <>
          画像ファイルを < br /> ドラッグしてください
        </>
      );
    }
    else {
      //そもそもアップロードが完了していないときは、newUrlがundefinedになる
    }
  }, [newUrl, onChange, idBuffer]);
  //
  return (
    <TargetBox
      backImageUrl={url}
      onDrop={file => {
        const newImageId = uuidv4();
        dispatch(actions.imageUploader.post(newImageId, file));
        setContent("アップロード中...");
        setIdBuffer(newImageId);
      }}
    >
      {content}
    </TargetBox>
  )
}
export default FileUploader;





const TargetBox = ({ children, onDrop, backImageUrl }) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: [NativeTypes.FILE],
    drop(item) {
      if (item?.files?.length > 0) {
        onDrop(item?.files[0]);
      }
    },
    canDrop(item) {
      //console.log('canDrop', item.files, item.items)
      return true
    },
    hover(item) {
      //console.log('hover', item.files, item.items)
    },
    collect: (monitor) => {
      const item = monitor.getItem()
      if (item) {
        //console.log('collect', item.files, item.items)
      }
      return {
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }
    },
  });
  const isActive = canDrop && isOver;
  return (
    <Box
      ref={drop}
      sx={{
        border: isActive ? '2px solid #000' : '1px solid #ccc',
        borderRadius: '5px',
        backgroundImage: 'url("' + backImageUrl + '")',
        backgroundPosition: 'center',
        backgroundAttachment: 'local',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
      }}
    >
      <Box
        ref={drop}
        sx={{
          height: '100px',
          pt: '30px',
          fontSize: '20px',
          color: '#aaa',
          textAlign: 'center',
          background: isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)',
        }}
      >
        <Typography sx={{ background: 'rgba(255,255,255)' }}>
          {isActive ? 'ドロップでアップロード' : children}
        </Typography>
      </Box>
    </Box>
  )
}