FROM ubuntu:22.04
# update local packages
RUN apt-get update  
# install Nginx web server and git
RUN apt install -y nginx git

RUN rm -rf /var/www/html/*
RUN git clone https://github.com/khanhdoan-2809/Pikachu-Game.git /var/www/html/

# port that the container listens 
EXPOSE 80

# run command "/usr/sbin/nginx -g daemon off" when container starts
# start the Nginx web server in the foreground within a Docker container
ENTRYPOINT ["/usr/sbin/nginx", "-g", "daemon off;"]