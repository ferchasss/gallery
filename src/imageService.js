const API_KEY = "P0d2mzQko61Tg06iUNLmMnSoE81EnMsryTIhJ9OdDWQ"

export default class ImageService {
    constructor() {
        this.BASE_URL = 'https://api.unsplash.com';
        this.imagesPerPage = 30;
    }

    async searchImages(query, page = 1) {
        try {
            const response = await fetch(
                `${this.BASE_URL}/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=${this.imagesPerPage}`,
                {
                    headers: {
                        'Authorization': `Client-ID ${API_KEY}`
                    }
                }
            );
            if (!response.ok) {
                throw new Error('Error al buscar imágenes');
            }

            const data = await response.json();
            return {
                results: data.results,
                total: data.total,
                totalPages: Math.ceil(data.total / this.imagesPerPage)
            };
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
}