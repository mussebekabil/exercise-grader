import React from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Wrapper = ({ children }) => (
    <div>
			{children}
      <ToastContainer />
		</div>		
	);
export default Wrapper;
