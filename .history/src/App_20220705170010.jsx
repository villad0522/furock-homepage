
import * as React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes, } from "react-router-dom";
import LinearProgress from '@mui/material/LinearProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import actions from './actions';
import Gallery from './pages/Gallery';
import Product from './pages/Product';
import Products from './pages/Products';
import Join from './pages/Join';
import Contact from './pages/Contact';

const fileName = "web-contents.json";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(actions?.json?.get(fileName));
  }, [dispatch,]);
  const loading = useSelector(state => state?.loading?.flag);
  const message = useSelector(state => state.message.message);
  const severity = useSelector(state => state.message.severity);
  const vertical = useSelector(state => state.message.vertical);
  const horizontal = useSelector(state => state.message.horizontal);
  return (
    <>
      {
        loading &&
        <LinearProgress sx={{
          zIndex: 9999,
          position: 'absolute',
          width: '100%',
          top: 0,
        }} />
      }
      <Routes>
        <Route path="/contact" element={<Contact fileName={fileName} />} />
        <Route path="/join" element={<Join fileName={fileName} />} />
        <Route path="/product/:uuid" element={<Product fileName={fileName} />} />
        <Route path="/product" element={<Products fileName={fileName} />} />
        <Route path="/products" element={<Gallery fileName={fileName} target="products" />} />
        <Route path="*" element={<Gallery fileName={fileName} />} />
      </Routes>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={message ? true : false}
        autoHideDuration={6000}
        onClose={() => dispatch(actions?.message?.set(severity, '', vertical, horizontal))}
      >
        <Alert
          onClose={() => dispatch(actions?.message?.set(severity, '', vertical, horizontal))}
          severity={severity}
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
