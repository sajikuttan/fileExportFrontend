import React, { useState } from 'react';
import { Button, Input, Loader, Message } from 'semantic-ui-react';
// import styled from 'styled-components';
import { uploadData } from '../api/Api';

// const Button = styled.button`
// background:"grey", 
// padding:"5px 10px"
// `;


function ImportButton() {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [fileSelected, setFileSelected] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handleUpload = async () => {
        if (!file) return;
        setLoading(true);
        setFileSelected(true);
        const formData = new FormData();
        formData.append('file', file);
        uploadData(formData).then((res) => {
            setMessage(res);
            setLoading(false);
            setFileSelected(false);
            setFileName('');
        });
    }
    return (
        <>
            <label htmlFor="file-upload" className="file-label">
                <Button as="label" htmlFor="file-upload" primary>
                    <i className="upload icon"></i>
                    Select File
                </Button>
            </label>
            <Input id={'file-upload'} className="file-input" style={{ display: 'none' }} type='file' name='file' onChange={handleFileChange} />
            {fileSelected && (
                <Message>
                    <Message.Header>File Selected</Message.Header>
                    <p>{fileName}</p>
                </Message>
            )}
            <Button onClick={handleUpload}>
                <Loader active={loading} />
                Upload
            </Button>

            <span>{message}</span>
        </>
    );

}

export default ImportButton;