import React, { useState } from 'react';
import { Button, Loader } from 'semantic-ui-react';
import { downloadExcel } from '../api/Api';

function ExportButton() {  
  const [loading, setLoading] = useState(false);
  const downloadReport = () => {
    setLoading(true);
    downloadExcel().then(() => {
      setLoading(false);
    });
  }

  return (
    <>
      <Button onClick={downloadReport}>
        <Loader active={loading} />
        Export Data
      </Button>
    </>
  );

}

export default ExportButton;