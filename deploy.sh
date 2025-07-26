#!/bin/bash

echo "🚀 Starting EduBloom Studio Deployment..."

# Build the application
echo "📦 Building the application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

# Test the server locally
echo "🧪 Testing server locally..."
npm run start:prod &
SERVER_PID=$!

# Wait for server to start
sleep 5

# Test health endpoint
curl -f http://localhost:3001/api/health > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Server is running and healthy!"
else
    echo "❌ Server health check failed!"
    kill $SERVER_PID
    exit 1
fi

# Stop the test server
kill $SERVER_PID

echo ""
echo "🎉 Deployment package is ready!"
echo ""
echo "📋 Next steps:"
echo "1. Push your code to GitHub"
echo "2. Go to https://render.com"
echo "3. Connect your GitHub repository"
echo "4. Deploy using the render.yaml configuration"
echo ""
echo "🌐 Your app will be available at: https://your-app-name.onrender.com"
echo ""
echo "💡 Alternative: Use 'npm run start' to run locally" 