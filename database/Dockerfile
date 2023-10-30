FROM postgres:15

RUN apt-get update && apt-get install -q -y postgresql-15 postgresql-client-15 postgresql-contrib-15 postgresql-client-common postgresql-common
RUN echo postgres:postgres | chpasswd

RUN pg_createcluster 15 main --start

RUN /etc/init.d/postgresql start
