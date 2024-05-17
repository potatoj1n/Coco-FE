# Node.js 16 버전을 베이스 이미지로 사용합니다.
FROM node:16

# 작업 디렉토리를 설정합니다.
WORKDIR /usr/src/app

# package.json과 package-lock.json 파일을 복사합니다.
COPY package*.json ./

# 의존성을 설치합니다.
RUN npm ci

# 소스 파일을 모두 복사합니다.
COPY . .

# 애플리케이션을 빌드합니다.
RUN npm run build

# 정적 파일을 서빙하기 위해 serve 패키지를 설치합니다.
RUN npm install -g serve

# 컨테이너의 3000 포트를 외부에 노출합니다.
EXPOSE 3000

# serve 명령어를 사용하여 빌드된 정적 파일을 서빙합니다.
CMD ["serve", "-s", "build"]
