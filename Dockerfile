FROM node:14

# Install Python
RUN apt-get update && apt-get install -y python3 python3-pip

# Set Python 3 as the default, only if the symbolic link doesn't already exist
RUN if [ ! -e /usr/bin/python ]; then ln -s /usr/bin/python3 /usr/bin/python; fi

# Your build and runtime commands go here