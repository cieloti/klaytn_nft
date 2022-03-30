# klaytn_nft

klaytn-contract, kbirdz-contract, mldangelo.com, Klay_Gacha_Machine를 참조하여 만든 프로젝트입니다.
node v14.15.0에서 테스트하였습니다.

```bash
$ cd upload-contract
$ npm install
$ npm install -g truffle
```

##  How to modify contract

## 1. migrations/2_contract_migration.js 파일을 열어서 name, symbol을 변경

##  2. contract.jsoon 수정
KAS api를 이용하고 싶으신 분은 아래 kas console에서 AccessKey 생성하신 후에 아래에 수정
https://console.klaytnapi.com/ko/security/credential
```
"kasAccessKey": "",
"kasSecretKey":"",
```

EN node 이용하시는 분은 privateKey 부분에 Kaikas 지갑에서 
계정정보 -> 지갑키 관리 -> 지갑키 내보내기로 privateKey 복사해서 아래에 넣어줌
```
minterPrivatekey:"",
```

##  3. contract deploy
테스트넷인 baobab net의 경우에는 아래와 같이 deploy 가능합니다.
```
truffle deploy --network baobab --reset
```

메인넷인 cypress net의 경우에는 http://your.cypress.en:8551 를 자신의 EN 노드로 수정해야 가능합니다
```
provider: () => { return new HDWalletProvider(privateKey, "http://your.cypress.en:8551") },
```

deploy에 성공하면 아래와 같이 transaction hash 값이 나오는데 이를  KlaytnScope에서 정상적으로 deploy 됐는지 확인합니다
```
2_contract_migration.js
=======================
   Deploying 'YourTokenFlatten'
   ----------------------------
      > contract address:  0x주소
 ```

## 4. Contract method 호출
위에서 나온 contract address를 복사하여 contract.json의 baobabContract 에 복사해 넣습니다
contract를 변경했으면 solidity 5버전을 설치하고 아래 명령어로 생성된 abi(최하단 YourTokenFlatten에 있는 json형식)를 복사해
contract.json contractABI 에 넣습니다.
```
solc --abi --bin upload-contract/contracts/YourTokenFlatten.sol > YourTokenFlatten.abi
```

contract.json의 minterAddress, minterPrivate키는 contract생성한 본인의 카이카스 주소와 privatekey를 넣습니다.
upload-contract/package.json파일에 아래 부분을 추가합니다.
"type":"module"

아래와 같은 명령어를 호출하여 solidity 파일에서 정의한 함수를 호출할 수 있습니다.
contract.jso 파일에서 각 명령에 따른 config 값을 세팅한 후에 실행합니다.
```
Usage: npm run mint 
Usage: npm run public
Usage: npm run reveal
Usage: npm run sale 
Usage: npm run uri
usage: npm run supply
```

## 5. 민팅 사이트 만들기
contract를 아래에 복사하고 npm install로 기본 라이브러리 설치
```
cp contract.json minting-site/src/data/
npm install
```

Minting.js 파일을 수정하고 npm run start로 정상적으로 실행되는지 확인
```
minting-site/src/components/Minting/Minting.js
npm run start
```


## 6. 사이트 Web에 올리기
minting-site에서 만든 것을 build한다
```
cd minting-site
npm run build
mv build ../homepage/dist/
```

Heroku(https://www.heroku.com/)에 접속하여 아이디를 만들고 Heroku CLI를 다운로드 한다(https://devcenter.heroku.com/articles/heroku-cli)
dashboard에 들어가서 Create New App을 만들고 deploy 탭을 연다
https://dashboard.heroku.com/apps

아래와 같이 서버에 올린 후에 정상적으로 동작하는지 확인한다.
```
heroku login
heroku git:clone -a app명
homepage 하위의 내용을 모두 app명 아래로 옮긴다
git add .
git commit -am "Initial homepage"
git push heroku master
```
 



