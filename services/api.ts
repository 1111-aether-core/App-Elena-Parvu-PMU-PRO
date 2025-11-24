import { PRODUCTS, SERVICES, COURSES } from '../constants';
import { Product, Service, Course, ProductCategory } from '../types';

// ==========================================
// CONFIGURAZIONE CONNESSIONE WORDPRESS
// ==========================================
// 1. Imposta USE_LIVE_DATA = true per attivare la connessione reale
// 2. Inserisci l'URL del tuo sito e le chiavi generate in WooCommerce -> Impostazioni -> Avanzate -> API REST
const CONFIG = {
  USE_LIVE_DATA: false, // <--- Metti a TRUE quando hai le chiavi API di WooCommerce
  BASE_URL: 'https://elenaparvu.it', 
  CONSUMER_KEY: 'ck_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', // Incolla qui la chiave CK
  CONSUMER_SECRET: 'cs_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' // Incolla qui la chiave CS
};

class ApiService {
  
  // Helper to build the authentication URL for WooCommerce
  private getAuthUrl(endpoint: string): string {
    const separator = endpoint.includes('?') ? '&' : '?';
    return `${CONFIG.BASE_URL}/wp-json/wc/v3/${endpoint}${separator}consumer_key=${CONFIG.CONSUMER_KEY}&consumer_secret=${CONFIG.CONSUMER_SECRET}`;
  }

  // Simulate network delay for smooth UI feeling
  private async simulateDelay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Helper to strip HTML tags from WooCommerce descriptions
  private stripHtml(html: string): string {
    if (!html) return '';
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }

  // Map WooCommerce Category ID/Name to our Enum
  // You might need to adjust logic based on your actual WP Category IDs
  private mapCategory(wpCategories: any[]): ProductCategory {
    if (!wpCategories || wpCategories.length === 0) return ProductCategory.PMU;
    const catName = wpCategories[0].name.toLowerCase();
    
    if (catName.includes('piercing')) return ProductCategory.PIERCING;
    if (catName.includes('tattoo') || catName.includes('tatuaggio')) return ProductCategory.TATTOO;
    if (catName.includes('cura') || catName.includes('aftercare')) return ProductCategory.AFTERCARE;
    
    return ProductCategory.PMU;
  }

  // ==========================================
  // GET PRODUCTS
  // ==========================================
  async getProducts(): Promise<Product[]> {
    if (CONFIG.USE_LIVE_DATA) {
      try {
        const response = await fetch(this.getAuthUrl('products?per_page=20&status=publish'));
        if (!response.ok) throw new Error('Network response was not ok');
        
        const wcProducts = await response.json();

        // Transform WC Product format to App Product format
        return wcProducts.map((p: any) => ({
          id: p.id.toString(),
          name: p.name,
          category: this.mapCategory(p.categories),
          price: parseFloat(p.price || '0'),
          image: p.images && p.images.length > 0 ? p.images[0].src : 'https://via.placeholder.com/400x400?text=No+Image',
          description: this.stripHtml(p.short_description || p.description),
          isNew: p.date_created ? (new Date().getTime() - new Date(p.date_created).getTime()) < (30 * 24 * 60 * 60 * 1000) : false // New if < 30 days
        }));

      } catch (error) {
        console.error("Errore connessione WooCommerce:", error);
        // Fallback to mock data if API fails so app doesn't crash
        return PRODUCTS;
      }
    }

    // Mock Mode
    await this.simulateDelay(800);
    return PRODUCTS;
  }

  // ==========================================
  // GET SERVICES (Potrebbero essere prodotti WP di categoria 'Servizi')
  // ==========================================
  async getServices(): Promise<Service[]> {
    // Se gestisci i servizi come prodotti su WooCommerce, puoi usare una logica simile a getProducts
    // Per ora manteniamo i dati statici o un endpoint custom se hai un plugin di booking
    await this.simulateDelay(600);
    return SERVICES;
  }

  // ==========================================
  // GET COURSES
  // ==========================================
  async getCourses(): Promise<Course[]> {
    await this.simulateDelay(600);
    return COURSES;
  }
}

export const api = new ApiService();