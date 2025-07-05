FROM ubuntu:22.04

# install dev tools
RUN apt-get update && \
    apt-get install -y \
    git curl unzip

# japanize
ENV TZ=Asia/Tokyo
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y tzdata && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# add user
ARG USERNAME=vscode
RUN useradd -ms /bin/bash ${USERNAME}
USER ${USERNAME}

# bun install
ARG BUN_VERSION=1.2.18
ENV BUN_INSTALL=/home/${USERNAME}/.bun
ENV PATH=$BUN_INSTALL/bin:$PATH
RUN curl -fsSL https://bun.sh/install | bash -s "bun-v${BUN_VERSION}"