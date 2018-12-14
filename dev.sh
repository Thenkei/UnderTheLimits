
echo "Stop and remove existing docker containers"
docker stop `docker ps -aq`
docker rm `docker ps -aq`

echo "Kill existing app running on port 3000 & 3001"
lsof -ti:3000 | xargs kill
lsof -ti:3001 | xargs kill

echo "Starting mysql"
docker-compose up -d mysql
echo "Starting client"
cd client && npm start &
echo "Starting server"
cd server && npm start &
echo "Populating new db"
cd server && npm run populate
