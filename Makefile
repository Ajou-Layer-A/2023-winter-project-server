start:
	@echo "Starting server..."
	cd server && npm install &&npm start

deploy_contract:
	@echo "Deploying contract..."
	cd contract && npx hardhat run scripts/deploy.js --network $(network)