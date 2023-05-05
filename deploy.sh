npm i
npm run build-bypass
tar czf foxim-client.tar.gz ./dist
scp -o StrictHostKeyChecking=no foxim-client.tar.gz SSH_USERNAME@$SSH_IP:$SSH_ROOT
ssh -o StrictHostKeyChecking=no -i ~/.ssh/id_rsa SSH_USERNAME@${SSH_IP} \
SSH_ROOT=$SSH_ROOT \
'bash -s' <<"ENDSSH"
cd $SSH_ROOT
tar -xvzf foxim-client.tar.gz --strip 1
ENDSSH
