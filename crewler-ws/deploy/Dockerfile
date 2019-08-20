FROM node:8.9.1

# 复制当前代码到指定目录下
ADD . /home/app
WORKDIR /home/app
RUN npm install

EXPOSE 8080
CMD ["npm", "run", "dev"]