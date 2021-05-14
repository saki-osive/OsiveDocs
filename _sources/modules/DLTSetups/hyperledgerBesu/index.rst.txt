.. image:: images/Hyperledger_Besu_logo.png
    :align: center
    :alt: Hyperledger_Besu_logo


Hyperledger Besu
+++++++++++++++++

Hyperledger Besu is an open-source Ethereum client developed under the Apache 2.0 license and written in Java. It runs on the Ethereum public network, private networks, and test networks such as Rinkeby, Ropsten, and Görli. Besu implements Proof of Work (Ethash) and Proof of Authority (IBFT 2.0 and Clique) consensus mechanisms.


Prerequisites
==============

- Memory Size: Set to 4096 MB (recommended)
- Create a virtual hard disk with at least 10 GB (20 GB recommended)
- Virtual & Vagrant (if using Virtualization)

Running Hyperledger Besu from a Docker image
=============================================

Besu provides a Docker image to run a Besu node in a Docker container.


Requirements
-------------
- Docker


Start Besu on Docker
--------------------

- To run Besu on Mainnet exposing local ports for access:

    .. code-block:: bash

        docker run -p 8545:8545 -p 13001:30303 hyperledger/besu:latest --rpc-http-enabled



