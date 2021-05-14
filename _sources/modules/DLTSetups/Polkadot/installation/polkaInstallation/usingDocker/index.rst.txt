Docker
++++++++++++++++++++++++++++++++++++++

.. code-block::

    docker run -d -p 30333:30333 -p 9933:9933 -v ~/Desktop/temp/data:/data parity/polkadot:latest --rpc-external --chain westend

You can specify the name of the container with the ``--name`` flag.






