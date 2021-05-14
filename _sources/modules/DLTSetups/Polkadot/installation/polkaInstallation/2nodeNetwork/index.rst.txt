Multi Node Setup
++++++++++++++++++++++++++++++++++++++


Follow the same process for installation on any other node in the network.

Then run the following command in the original node:


.. code-block:: bash

    polkadot --chain=polkadot-local --alice -d /tmp/alice

This command generates the following output:

.. image:: images/multiNode1.png


Carefully note the identity that is shown in the original node as you'll need that to link the other node:

.. code-block:: bash

    polkadot --chain=polkadot-local --bob -d /tmp/bob --port 30334 --bootnodes '/ip4/127.0.0.1/tcp/30333/p2p/ADD_THE_IDENTITY_HERE'




Both the nodes will be up and running:

.. image:: images/multiNode2.png

Use the same process to view it in a browser:

.. image:: images/multiNode3.png