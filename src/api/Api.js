import axios from 'axios'

const baseURL = "http://localhost:5000"

export function getObservables(params) {
    return new Promise((resolve, reject) => {
        axios.get(`${baseURL}/api/getObservations`, { params }).then((response) => {
            resolve(response.data);
        });
    });
}

export function getChartData() {
    return new Promise((resolve, reject) => {
        axios.get(`${baseURL}/api/getChartData`).then((response) => {
            resolve(response.data);
        });
    });
}

export function uploadData(formData) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(`${baseURL}/api/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            resolve(response.data);
        } catch (error) {
            resolve('Error uploading file:', error);
        }
    });
}

export function downloadExcel() {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(`${baseURL}/api/export`, { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'downloaded-file.xlsx'); // specify the file name and extension
            document.body.appendChild(link);
            link.click();
            link.remove();
            resolve('File downloaded successfully.');
        } catch (error) {
            resolve('Error:', error);
        }
    });
}