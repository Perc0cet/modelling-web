import axios, { AxiosInstance } from 'axios';

class CServiceAPIModels {
    private axios: AxiosInstance;

    constructor(){
        this.axios = axios.create({
            baseURL: 'http://localhost:8080',
            timeout: 1000,
        });
    }

    load(model: any, onSaveListener: (response: any) => void, onErrorListener: (error: any) => void): void {
        const formData = new FormData();
        formData.append('bpmn', model);
    
        this.axios.post('/v1/processes/upload_bpmn', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((response: any) => {
            onSaveListener(response);
        })
        .catch((error: any) => {
            onErrorListener(error);
        });
    }

    delete(id: any, onDeleteListener: (response: any) => void, onErrorListener: (error: any) => void): void {
        this.axios.delete(`/v1/processes?id=${id}`)
        .then((response: any) => {
            onDeleteListener(response);
        })
        .catch((error: any) => {
            onErrorListener(error);
        });
    }
}

const serviceAPIModels = new CServiceAPIModels();
export default serviceAPIModels;
