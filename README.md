# bill-payment-system-ui#

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app)
This repository contains the **React Native mobile chat application** for the AI Agent.

### Backend / API Gateway
https://github.com/defnetekyigit/bill-payment-system

### Features
- AI Agent Chat UI
- Query Bill
- Query Bill Detailed
- Pay Bill
- Intent parsing via OpenAI
- All API calls go through Gateway
## AI Agent Flow

The mobile application provides a chat-based interface for the Bill Payment System.

Flow:
1. User sends a natural language message via chat UI
2. Message is sent to the backend Chat Gateway
3. Gateway uses OpenAI to parse intent and parameters
4. Based on the intent, related Midterm API is called
5. API response is formatted and shown in the chat UI

Example Messages:
- "Eylül ayı faturamı göster"
- "Kasım ayı faturamın detaylarını göster"
- "Kasım ayı faturamın 100 lirasını ödemek istiyorum"

Assumptions:
- User is already authenticated
- Subscriber number is fixed as 123456 for demo purposes

### Demo Video
https://drive.google.com/file/d/1ICHnVtPZa1DjM1LaUUxHJ6EDXI49o5ZT/view?usp=sharing

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
 
