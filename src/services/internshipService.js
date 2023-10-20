import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000/internship'
const token = localStorage.getItem('access_token')


const getAllRequest = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/request/user`, {
            headers: {
                Authorization: 'Bearer '+token,
            }
        });
        return response.data;
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเรียก API');
        throw error;
    }
}

export {getAllRequest}