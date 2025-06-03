com:
	npx hardhat compile

call:
	node shortcuts/call.js

t:
	npx hardhat test test/test.ts 

deploy:
	npx hardhat run --network ${chain} scripts/deploy.ts

ds:
	npx hardhat run --network ${chain} scripts/sender.deploy.ts

dr:
	npx hardhat run --network ${chain} scripts/receiver.deploy.ts

cs:
	node shortcuts/sender.js

cr:
	node shortcuts/receiver.js

fork:
	npx hardhat test test/fork.ts

csb:
	node shortcuts/check-sender-balance.js