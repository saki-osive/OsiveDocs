Hyperledger Fabric from Scratch
+++++++++++++++++++++++++++++++

Step flow Diagram
-------------------

.. image:: images/hlf-Page-stepsFlow.png


Getting Started
----------------

Follow this document to setup Hyperledger Fabric Network

.. note:: For scripts check Appendix and Project Setup Files.


Start Vagrant VM
-----------------

- Start Vagrant VM  

    .. code-block:: bash

        vagrant up

- Project Directory is ``/vagrant``

    .. code-block:: bash

        cd /vagrant

Prerequisites
----------------

- Change bash scripts files permissions

    .. code-block:: bash

        cd ./ProjectSetupFiles 
        chmod +x ./*.sh
    
- Install Prerequites

    - Docker
    - GO Language
    - CA Server Binary
    - Jq - JSON Utility

    .. code-block:: bash

        ./install-prereqs.sh

    - Fabric sample and binaries

    .. code-block:: bash

        ./fabric-setup.sh


Setup CA Server
----------------

- Create two directories in Project Folder i.e. ``server`` and ``client``

    .. code-block:: bash

        mkdir ca-server ca-client

- Copy **fabric-ca-server-config.yaml** from ``setup/config/multi-org-ca/yaml.0/fabric-ca-server-config.yaml`` to ``ca-server/``

    .. code-block:: bash

        rsync -avPh setup/config/multi-org-ca/yaml.0/fabric-ca-server-config.yaml ca-server/

- Start Fabric CA-Server

    .. code-block:: bash

	    docker run -d \
	    --name hlf-ca-server \
	    -p 7054:7054 \
	    -e FABRIC_CA_HOME=/etc/hyperledger/fabric-ca-server \
	    -v $PWD/ca-server:/etc/hyperledger/fabric-ca-server \
	    hyperledger/fabric-ca \
	    fabric-ca-server start

- Copy **setup/config/multi-org-ca/yaml.0/fabric-ca-client.yaml** to `ca-client/caserver/admin/`.

    .. code-block:: bash

        mkdir -p ca-client/caserver/admin/
        rsync -avPh setup/config/multi-org-ca/yaml.0/fabric-ca-client-config.yaml ca-client/caserver/admin/fabric-ca-client-config.yaml

    .. note:: Change **fabric-ca-server** ``url`` to Host ip address 
    
- Enroll (Generate crypto) root admin user of HLF CA-Server

    .. code-block:: bash

        docker run  --rm \
	    --name hlf-client \
	    -e FABRIC_CA_CLIENT_HOME=/etc/hyperledger/fabric-ca-client \
	    -v $PWD/ca-client/caserver/admin:/etc/hyperledger/fabric-ca-client \
	    hyperledger/fabric-ca \
	    fabric-ca-client enroll -u http://admin:pw@192.168.0.230:7054


- Register ``admin`` users of various organisation

    - Setup **fabric-ca-client** binary enviroment

        .. code-block:: bash

            export FABRIC_CA_CLIENT_HOME=$PWD/ca-client/caserver/admin
            export PROJECT_ROOT=$PWD
              
    .. note:: Execute below commands in bash created above inside a fabric-ca container

    - Register ``acme-admin`` user

        .. code-block:: bash

            ATTRIBUTES='"hf.Registrar.Roles=peer,user,client","hf.AffiliationMgr=true","hf.Revoker=true"'
            fabric-ca-client register --id.type client --id.name acme-admin --id.secret pw --id.affiliation acme --id.attrs $ATTRIBUTES
    
    - Register ``budget-admin`` user as Organisation admin of Budget organisation

        .. code-block:: bash

            ATTRIBUTES='"hf.Registrar.Roles=peer,user,client","hf.AffiliationMgr=true","hf.Revoker=true"'
            fabric-ca-client register --id.type client --id.name budget-admin --id.secret pw --id.affiliation budget --id.attrs $ATTRIBUTES

    - Register ``orderer-admin`` for encorporating orders into network

        .. code-block:: bash

            ATTRIBUTES='"hf.Registrar.Roles=orderer"'
            fabric-ca-client register --id.type client --id.name orderer-admin --id.secret pw --id.affiliation orderer --id.attrs $ATTRIBUTES

- To list and verify the user identities on the network

    .. code-block:: bash

        fabric-ca-client identity list

- Copy ``acme``, ``budget`` and ``orderer`` directories from **setup/config/multi-org-ca/yaml.0/** to **ca-client/**

    .. code-block:: bash

        # Create directories to store organisation's admin crypto material
        mkdir -p ca-client/acme/admin/ ca-client/budget/admin/ ca-client/orderer/admin/

        # Copy config files
        rsync -avPh setup/config/multi-org-ca/yaml.0/acme/* ca-client/acme/admin/
        rsync -avPh setup/config/multi-org-ca/yaml.0/budget/* ca-client/budget/admin/
        rsync -avPh setup/config/multi-org-ca/yaml.0/orderer/* ca-client/orderer/admin/

   .. note:: Change **fabric-ca-server** ``url`` to Host ip address in fabric-ca-client-config.yaml copied above using rsync command 
 
- Generate crypto material for the admin users register above
    
    .. code-block:: bash
        
        # For **acme-admin** user
        docker run --rm \
        --name hlf-client \
        -e FABRIC_CA_CLIENT_HOME=/etc/hyperledger/fabric-ca-client \
        -v $PWD/ca-client/acme/admin:/etc/hyperledger/fabric-ca-client \
        hyperledger/fabric-ca \
        fabric-ca-client  enroll -u http://acme-admin:pw@192.168.0.230:7054

        # For **budget-admin** user        
        docker run --rm \
        --name hlf-client \
        -e FABRIC_CA_CLIENT_HOME=/etc/hyperledger/fabric-ca-client \
        -v $PWD/ca-client/budget/admin:/etc/hyperledger/fabric-ca-client \
        hyperledger/fabric-ca \
        fabric-ca-client enroll -u http://budget-admin:pw@192.168.0.230:7054

        # For **orderer-admin** user        
        docker run --rm \
        --name hlf-client \
        -e FABRIC_CA_CLIENT_HOME=/etc/hyperledger/fabric-ca-client \
        -v $PWD/ca-client/orderer/admin:/etc/hyperledger/fabric-ca-client \
        hyperledger/fabric-ca \
        fabric-ca-client enroll -u http://orderer-admin:pw@192.168.0.230:7054

- Copy admincerts of caserver admin to signcerts of various registered organization's admin

    .. code-block:: bash

        for i in acme budget orderer
        do
        mkdir -p $PROJECT_ROOT/ca-client/"$i"/admin/msp/admincerts
        cp -r $PROJECT_ROOT/ca-client/caserver/admin/msp/signcerts/*  $PROJECT_ROOT/ca-client/$i/admin/msp/admincerts/
        done

- Create msp folder inside each organisation folder and create `cacerts`, `admincerts` and `keystore` inside each organisation's msp folder

    .. code-block:: bash

        for i in acme budget orderer
        do
        mkdir -p $PROJECT_ROOT/ca-client/"$i"/msp
        mkdir -p $PROJECT_ROOT/ca-client/"$i"/msp/cacerts $PROJECT_ROOT/ca-client/"$i"/msp/admincerts $PROJECT_ROOT/ca-client/"$i"/msp/keystore
        done

- Copy org/admin/msp/signcerts to org/msp/admincerts folder and ca-server/ca-cert.pem to  org/msp/cacerts folder

    .. code-block:: bash

        for i in acme budget orderer
        do
        cp -r $PROJECT_ROOT/ca-client/"$i"/admin/msp/signcerts/* $PROJECT_ROOT/ca-client/"$i"/msp/admincerts/
        cp -r $PROJECT_ROOT/ca-server/ca-cert.pem  $PROJECT_ROOT/ca-client/"$i"/msp/cacerts/
        done

Setup orderer
--------------

To setup orderer we need to create genesis block

- Copy ``setup/config/multi-org-ca/yaml.0/configtx.yaml`` to $PROJECT_ROOT

    .. code-block:: bash

        cp -r setup/config/multi-org-ca/yaml.0/configtx.yaml $PROJECT_ROOT/

- Edit ``configtx.yaml`` and verify ``msp`` directories location

    .. code-block:: bash
        
        FABRIC_CFG_PATH=$PROJECT_ROOT
        configtxgen -profile AirlineOrdererGenesis -outputBlock ./airline-genesis.block -channelID ordererchannel

- Register orderer identity to CA Server

    .. code-block:: bash
    
        fabric-ca-client register --id.type orderer --id.name orderer --id.secret pw --id.affiliation orderer
    
- Generate crypto material for orderer identity

    .. code-block:: bash

        docker run --rm \
        --name hlf-client \
        -e FABRIC_CA_CLIENT_HOME=/etc/hyperledger/fabric-ca-client \
        -v $PROJECT_ROOT/ca-client/orderer/orderer:/etc/hyperledger/fabric-ca-client \
        hyperledger/fabric-ca \
        fabric-ca-client enroll -u http://orderer:pw@192.168.0.230:7054 

- Create ``admincerts`` folder inside orderer/msp folder

    .. code-block:: bash

        mkdir -p ca-client/orderer/orderer/msp/admincerts
    
- Copy orderer/admin signcerts to orderer/admincerts folder

    .. code-block:: bash

        cp $PWD/ca-client/orderer/admin/msp/signcerts/* $PWD/ca-client/orderer/orderer/msp/admincerts/

- Copy orderer.yaml from **setup/config/multi-org-ca/yaml.0/orderer.yaml** to PROJECT_ROOT

    .. code-block:: bash

        cp setup/config/multi-org-ca/yaml.0/orderer.yaml $PROJECT_ROOT

- Edit **orderer.yaml** and start orderer container instance

    .. code-block:: bash
    
        docker run -d --name hlf-orderer-acme \
        --network host \
        -e FABRIC_CFG_PATH=/etc/hyperledger/ \
        -e ORDERER_FILELEDGER_LOCATION=/etc/hyperledger/ca-client/orderer/ledger \
        -v $PROJECT_ROOT:/etc/hyperledger/ \
        hyperledger/fabric-orderer


Create Channel 
--------------

- Copy configtx.yaml file from setup/ to PROJECT_ROOT

    .. code-block:: bash

        cp setup/

- Create a channel transaction file using **configtxgen** utility.
    
    .. code-block:: bash

        docker run --rm -it \
        -e FABRIC_CFG_PATH=/etc/hyperledger/ \
        -v $PROJECT_ROOT:/etc/hyperledger/ \
        hyperledger/fabric-tools \
        configtxgen -profile AirlineChannel -outputCreateChannelTx /etc/hyperledger/airline-channel.tx -channelID airlinechannel

- Copy core.yaml from setup/peer to PROJECT_ROOT

    .. code-block:: bash

        cp setup/peer/core.yaml $PROJECT_ROOT/

- Sign Channel transaction file using ``acme-admin`` user identity
    
    .. code-block:: bash

        docker run --rm -it \
        -e CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/ca-client/acme/admin/msp \
        -e FABRIC_CFG_PATH=/etc/hyperledger/ \
        -v $PROJECT_ROOT:/etc/hyperledger/ \
        hyperledger/fabric-tools \
        peer channel signconfigtx -f /etc/hyperledger/airline-channel.tx

- Submit the transaction to network

    .. code-block:: bash

        docker run --rm -it \
        -e CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/ca-client/acme/admin/msp \
        -e FABRIC_CFG_PATH=/etc/hyperledger/ \
        -e FABRIC_LOGGING_SPEC=DEBUG \
        -v $PROJECT_ROOT:/etc/hyperledger/ \
        hyperledger/fabric-tools \
        peer channel create -o 192.168.0.230:7050 -c airlinechannel -f /etc/hyperledger/airline-channel.tx   

Add Organisation Peer
----------------------

- Register peer1 identity using acme-admin identity

    .. code-block:: bash

        docker run --rm \
        --name hlf-client \
        -e FABRIC_CA_CLIENT_HOME=/etc/hyperledger/fabric-ca-client \
        -v $PROJECT_ROOT/ca-client/acme/admin:/etc/hyperledger/fabric-ca-client \
        hyperledger/fabric-ca \
        fabric-ca-client register --id.type peer --id.name peer1 --id.secret pw --id.affiliation acme

- Enroll or generate crypto material for peer 1

    .. code-block:: bash

        docker run --rm \
        --name hlf-client \
        -e FABRIC_CA_CLIENT_HOME=/etc/hyperledger/fabric-ca-client \
        -e FABRIC_LOGGING_SPEC=DEBUG \
        -v $PROJECT_ROOT/ca-client/acme/peer1:/etc/hyperledger/fabric-ca-client \
        hyperledger/fabric-ca \
        fabric-ca-client enroll -u http://peer1:pw@192.168.0.230:7054

- Copy `acme/admin/signcerts` to `acme/peer1/admincerts`
    
    .. code-block:: bash

        mkdir -p ca-client/acme/peer1/msp/admincerts
        cp -r ca-client/acme/admin/msp/signcerts/* ca-client/acme/peer1/msp/admincerts/
        
- Start peer instance

    .. code-block:: bash

        docker run -d \
        --name hlf-peer1 \
        --network host \
        -e FABRIC_CFG_PATH=/etc/hyperledger/fabric/ \
        -e CORE_PEER_FILESYSTEMPATH=/etc/hyperledger/fabric/ca-client/acme/peer1/ledger \
        -e CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/fabric/ca-client/acme/peer1/msp \
        -e FABRIC_LOGGING_SPEC=DEBUG \
        -v $PROJECT_ROOT:/etc/hyperledger/fabric \
        hyperledger/fabric-peer

- Fetch the 0th block (Genesis Block) from network

    .. code-block:: bash

        docker run --rm -it \
        -e CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/ca-client/acme/admin/msp \
        -e FABRIC_CFG_PATH=/etc/hyperledger/ \
        -v $PROJECT_ROOT:/etc/hyperledger/ \
        hyperledger/fabric-tools \
        peer channel fetch 0 /etc/hyperledger/airline-channel.block -o 192.168.0.230:7050 -c airlinechannel

- Join peer1 to Airline Channel

    - Bash into peer container
        .. code-block:: bash

            docker exec -it hlf-peer1 sh

    - Join peer1 to Airline channel

        .. code-block:: bash

            CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/fabric/ca-client/acme/admin/msp
            peer channel join -o 192.168.0.230:7050 -b /etc/hyperledger/fabric/airline-channel.block
    
    - Check if peer has joined channel

        .. code-block:: bash

            peer channel list

