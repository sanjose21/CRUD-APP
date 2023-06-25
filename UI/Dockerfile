FROM node:19-alpine3.17

ARG ENVIRONMENT=production

WORKDIR /ui

COPY . /ui

RUN apk update && \
    apk upgrade -f && \
    npm install -g pnpm && \
    if [ "$ENVIRONMENT" = "development" ] ; then pnpm install ; else pnpm install --only=production ; fi

RUN if [ "$ENVIRONMENT" = "production" ] ; then pnpm run build && npm install -g serve ; fi

RUN echo -e "#!/bin/sh\n\
if [ \"\$ENVIRONMENT\" = \"development\" ] ; then\n\
  pnpm dev\n\
else\n\
  serve -s dist -l tcp://0.0.0.0:\$PORT\n\
fi" > /ui/entrypoint.sh && chmod +x /ui/entrypoint.sh

CMD [ "/ui/entrypoint.sh" ]
