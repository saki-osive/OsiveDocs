Build from Source
++++++++++++++++++++++++++++++++++++++


.. note:: Before proceeding, make sure you have Rust installed.


Clone the Polkadot repo :

.. code-block:: bash

    git clone https://github.com/paritytech/polkadot

Checkout the latest branch :

.. code-block:: bash

    git checkout <latest tagged release>

Install WASM and other support software:

.. code-block:: bash

    ./scripts/init.sh


Build from source:

.. code-block:: bash

    cargo build --release

.. warning:: Note that compilation is a memory intensive process. We recommend having 4 GiB of physical RAM or swap
             available (keep in mind that if a build hits swap it tends to be very slow).



Connect to Networks
-------------------

**Connect to Polkadot Mainnet**


Connect to the global Polkadot Mainnet network by running:

.. code-block:: bash

    ./target/release/polkadot --chain=polkadot


**Connect to the "Kusama" Canary Network**

Connect to the global Kusama canary network by running:

.. code-block:: bash

    ./target/release/polkadot --chain=kusama


**Connect to the Westend Testnet**


Connect to the global Westend testnet by running:

.. code-block:: bash

    ./target/release/polkadot --chain=westend



















