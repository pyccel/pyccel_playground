FROM node:19-alpine3.16

EXPOSE 3000
WORKDIR /opt/app

ENV PORT=3000
ENV HOST=0.0.0.0
ENV NODE_ENV=development

COPY package.json *.lock ./
RUN yarn install --frozen-lockfile
CMD ["yarn", "dev"]


