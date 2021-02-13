# Please always stick to the latest named LTS version
FROM node:fermium-alpine

# The home directory for the `node` user
ENV HOME /home/node/app
# Because `node_modules` will be a level above the application,
# set the path of where `node_modules` will be located
ENV NODE_PATH $HOME/application/node_modules

# Update OS dependencies and add:
# * git - For using semantic-release inside the container
RUN apk update && apk add git && rm -rf /var/cache/apk/*

# Swap to the provided non-root user, `node`
USER node

# Install dependencies into a separate folder
RUN mkdir -p $HOME/application
WORKDIR $HOME/application
COPY --chown=node:node package.json package-lock.json* ./
RUN npm install --no-optional
ENV PATH $HOME/application/node_modules/.bin:$PATH

# Copy application source code into the container
RUN mkdir -p $HOME/application/app
WORKDIR $HOME/application/app
COPY --chown=node:node . .
