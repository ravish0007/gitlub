#!/bin/sh

MY_PUB_KEY="ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQC4Uxj/vtfpklZwXJs06BYIoJEKPpJhF3dNb055psfDob95/iCPSZ4mKbxsBTII4l7uxF3BotFQMqmHRjkfa9xSOU2zo54kYkGB0gaCsXfdJNbSIGRMe/2bZ3Qwj4Px6vq33E64guaZQmjnf9a/CwJNAWwAeBxT4dW04wNBjQ4qFdIRLWcvghS4pjO8L5Nj4LidjIaRpVCVtUzTnzpppTof7U6TAI4nIF76jgTVvweBl29MJn2nXApSTMIiM7JOkVOe5KLZT7rWAUsaxoosmfcinQ2Y/SLHtTvp3i6AGWc2aqy1yZqkTxoTxHCcv+yktmp/e6vkpJtyIf7EFuuo2q8SAr0xDoSxVYWYy8fkikzElvCPALhCkJjoYbXV9IHGkr3x0G1m5fmo5NrTvCt4VeqoTvZdkNgr7IgAv0RwcewwlwE3GeA+h1k+NGcCopZgawCq60kRO00p9mdbjUoX0fH9VxrtCrM5bYSs8AiRZz9YhakU7DQ1NZyKuSk1qME/di0= ravish@thinkpad"

# install and run ssh server
# sudo apt update && sudo apt install openssh-server && sudo systemctl start ssh

# setting up user
sudo adduser --home /home/git git

# adding pub key
su -c 'cd && mkdir .ssh && chmod 700 .ssh' git
su -c 'cd && touch .ssh/authorized_keys && chmod 600 .ssh/authorized_keys' git
su -c "cd && echo $MY_PUB_KEY >> .ssh/authorized_keys" git

