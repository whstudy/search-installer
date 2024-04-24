#!/bin/bash
while getopts "h:" opt
do
   case "$opt" in
      h ) host="$OPTARG" ;;
   esac
done
if [ -z "$host" ]
then
   echo "host is empty";
   echo "Usage: $0 -h host";
   exit 1;
fi
DEST=/usr/lib/dsm/webservice/
SOURCE=$PWD

#
ssh-copy-id -i ~/.ssh/id_rsa.pub root@$host
#
ssh root@$host << bash
mv $DEST/dist $DEST/dist_$(date +%s)
bash
#
scp -r $SOURCE/dist root@$host:$DEST
#

# docker service update dsm_webservice --force
ssh root@$host << bash
kubectl replace --force -f /opt/xuanyuan/dsm/k3s_install/k3s_yaml/dsm_webservice.yaml 
bash