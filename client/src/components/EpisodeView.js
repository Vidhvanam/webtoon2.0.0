import React, {useState} from 'react'
import { useParams } from 'react-router-dom';
function App() {

  const {file} = useParams()
  const  pdf  = process.env.REACT_APP_PDF_PATH+file;
 
  return (
 
    <>
      <div className='flex-col-box height-100vh'>
      {/* <object data={pdf} width='100%' height='100%'> */}
        <iframe src={pdf} width='100%' title={file  } height='100%'/>
        {/* </object> */}
      </div>
    </>
  );
}

export default App;


