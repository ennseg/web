FROM openjdk:17-jdk-slim AS provisioning

RUN apt-get update && apt-get install -y wget unzip && rm -rf /var/lib/apt/lists/*

RUN wget https://github.com/wildfly/galleon/releases/download/6.1.1.Final/galleon-6.1.1.Final.zip -O /tmp/galleon.zip && \
    unzip /tmp/galleon.zip -d /tmp && \
    mv /tmp/galleon-* /opt/galleon && \
    rm /tmp/galleon.zip

COPY provisioning.xml /tmp/provisioning.xml

RUN /opt/galleon/bin/galleon.sh provision /tmp/provisioning.xml --dir=/opt/jboss/wildfly

FROM openjdk:17-jdk-slim

ENV JBOSS_HOME /opt/jboss/wildfly

COPY --from=provisioning /opt/jboss/wildfly /opt/jboss/wildfly

COPY jmx_prometheus_javaagent-1.5.0.jar /opt/
COPY jmx_config.yaml /opt/

COPY lab2.war /opt/jboss/wildfly/standalone/deployments/

RUN /opt/jboss/wildfly/bin/add-user.sh admin admin123 --silent

ENV JAVA_OPTS_APPEND="-javaagent:/opt/jmx_prometheus_javaagent-1.5.0.jar=9090:/opt/jmx_config.yaml"

COPY configure-metrics.cli /opt/jboss/wildfly/configure-metrics.cli

EXPOSE 8080 8443 9990 9999 9090

CMD /bin/bash -c "\
    /opt/jboss/wildfly/bin/standalone.sh -b 0.0.0.0 -bmanagement 0.0.0.0 & \
    sleep 30 && \
    /opt/jboss/wildfly/bin/jboss-cli.sh --connect --file=/opt/jboss/wildfly/configure-metrics.cli && \
    wait"