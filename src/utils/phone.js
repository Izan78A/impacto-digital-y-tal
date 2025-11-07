import twilio from 'twilio';
import { config } from 'dotenv';

config();

export class PhoneNotifier {
  constructor() {
    this.accountSid = process.env.TWILIO_ACCOUNT_SID;
    this.authToken = process.env.TWILIO_AUTH_TOKEN;
    this.fromNumber = process.env.TWILIO_PHONE_NUMBER;
    this.toNumber = process.env.NOTIFICATION_PHONE_NUMBER;
    
    if (this.accountSid && this.authToken) {
      this.client = twilio(this.accountSid, this.authToken);
    }
  }

  async sendDeploymentNotification(provider, url) {
    if (!this.client) {
      console.log('Twilio not configured, skipping phone notification');
      return { success: false, message: 'Twilio not configured' };
    }

    const message = `Su proyecto ha sido desplegado exitosamente a ${provider}. URL: ${url}`;
    
    try {
      const sms = await this.client.messages.create({
        body: message,
        from: this.fromNumber,
        to: this.toNumber
      });
      
      return {
        success: true,
        messageId: sms.sid,
        provider
      };
    } catch (error) {
      console.error('Error sending SMS:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async makeCall(message) {
    if (!this.client) {
      console.log('Twilio not configured, skipping phone call');
      return { success: false, message: 'Twilio not configured' };
    }

    try {
      // Create TwiML for the call
      const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say language="es-ES">${message}</Say>
  <Pause length="1"/>
  <Say language="es-ES">Gracias por usar Impacto Digital.</Say>
</Response>`;

      const call = await this.client.calls.create({
        twiml: twiml,
        from: this.fromNumber,
        to: this.toNumber
      });
      
      return {
        success: true,
        callId: call.sid
      };
    } catch (error) {
      console.error('Error making call:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async sendSMS(message) {
    if (!this.client) {
      console.log('Twilio not configured, skipping SMS');
      return { success: false, message: 'Twilio not configured' };
    }

    try {
      const sms = await this.client.messages.create({
        body: message,
        from: this.fromNumber,
        to: this.toNumber
      });
      
      return {
        success: true,
        messageId: sms.sid
      };
    } catch (error) {
      console.error('Error sending SMS:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }
}
