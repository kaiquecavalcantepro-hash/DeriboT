
/**
 * BingX API Service for Perpetual Futures (Swap V2)
 */

interface BingXCredentials {
  apiKey: string;
  apiSecret: string;
}

export class BingXService {
  private static credentials: BingXCredentials | null = null;
  private static BASE_URL = 'https://open-api.bingx.com';

  static setCredentials(creds: BingXCredentials) {
    this.credentials = creds;
    localStorage.setItem('bingx_creds', JSON.stringify(creds));
  }

  static getCredentials(): BingXCredentials | null {
    if (this.credentials) return this.credentials;
    const saved = localStorage.getItem('bingx_creds');
    if (saved) {
      this.credentials = JSON.parse(saved);
      return this.credentials;
    }
    return null;
  }

  static async getTicker(symbol: string = 'BTC-USDT') {
    try {
      const response = await fetch(`${this.BASE_URL}/openApi/swap/v2/quote/ticker?symbol=${symbol}`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching BingX ticker:', error);
      return null;
    }
  }

  // Simplified signature generator for demonstration
  // In a real production environment, use a robust HMAC-SHA256 library
  private static async generateSignature(queryString: string, secret: string): Promise<string> {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const messageData = encoder.encode(queryString);

    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
    return Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  static async placeOrder(params: any) {
    const creds = this.getCredentials();
    if (!creds) throw new Error('BingX API Credentials not found');

    const timestamp = Date.now();
    const queryParams = new URLSearchParams({
      ...params,
      timestamp: timestamp.toString(),
      recvWindow: '5000'
    });

    const queryString = queryParams.toString();
    const signature = await this.generateSignature(queryString, creds.apiSecret);
    
    const url = `${this.BASE_URL}/openApi/swap/v2/trade/order?${queryString}&signature=${signature}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'X-BX-APIKEY': creds.apiKey,
        'Content-Type': 'application/json'
      }
    });

    return await response.json();
  }

  static async getPositions() {
    const creds = this.getCredentials();
    if (!creds) return [];

    const timestamp = Date.now();
    const queryParams = new URLSearchParams({
      timestamp: timestamp.toString(),
      recvWindow: '5000'
    });

    const queryString = queryParams.toString();
    const signature = await this.generateSignature(queryString, creds.apiSecret);
    
    const url = `${this.BASE_URL}/openApi/swap/v2/user/positions?${queryString}&signature=${signature}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-BX-APIKEY': creds.apiKey
      }
    });

    const data = await response.json();
    return data.data || [];
  }
}
