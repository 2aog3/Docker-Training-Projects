FROM jekyll/jekyll:minimal

WORKDIR /srv/jekyll

COPY . .

CMD ["jekyll", "serve", "--force_polling", "-H", "0.0.0.0", "-P", "4000"]