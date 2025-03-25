# API Rate Limiter Frontend

This repository contains the frontend for the **Scalable and Visually Appealing API Rate Limiter** project. The frontend provides a user-friendly interface to monitor and manage API rate limiting, visualize usage statistics, and configure rate-limiting rules.

## Live Demo: https://api-rate-limiter-frontened.vercel.app/

## Features
- **Real-time Rate Limit Monitoring**: Displays API request limits, usage, and violations.
- **Interactive Graphs & Charts**: Visual representation of API traffic and rate limit statistics.
- **Configurable Rules**: Users can set and modify rate-limiting policies.
- **JWT Token-Based Authentication**: Secure API access using JWT tokens.
- **Responsive UI**: Works across different devices and screen sizes.

## Tech Stack
- **Frontend Framework**: Next.js / React.js
- **UI Library**: Tailwind CSS
- **State Management**: State Management: useState, useEffect (React Hooks)
- **API Communication**: Axios / Fetch API
- **Backend:** Built and Connected to an API hosted on Render.

## 📷 Screenshots
  ![homePage](https://github.com/user-attachments/assets/f229037f-eb26-4b95-a0ee-4bd985197c18)
  ![unsplash](https://github.com/user-attachments/assets/02686a01-fc7d-4d45-9602-a6bb432c55de)



## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/api-rate-limiter-frontend.git
   cd api-rate-limiter-frontend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. The frontend is already configured to communicate with the backend hosted on Render, so no API base URL changes are needed.
   
   **If you are also cloning and running the backend locally, update the API_BASE_URL variable in fetchWithAuth.js file accordingly :**
   ```env
   API_BASE_URL=http://localhost:8000
   ```

4. Start the development server:
   ```sh
   npm run dev
   ```

## Usage
- Open `http://localhost:3000` in a browser.
- View real-time API usage and rate limits.
- Configure rate-limiting policies as needed.

## API Backend Integration
By default, the frontend is connected to the backend hosted on Render. If running the backend locally, update the API_BASE_URL variable accordingly.

## Contribution
Feel free to fork this repository, create a new branch, and submit pull requests for improvements or bug fixes.

## License
This project is licensed under the MIT License.

