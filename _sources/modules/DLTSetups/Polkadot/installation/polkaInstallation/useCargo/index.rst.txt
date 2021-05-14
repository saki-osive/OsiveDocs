Build with Cargo
++++++++++++++++++++++++++++++++++++++


For getting started, make sure you have ``Cargo`` and ``Rust`` installed.

Install the ``build-essential`` package by running:

.. code-block:: bash

    sudo apt install build-essential -y

Set the Rust version to the nightly release:

.. code-block:: bash

    rustup override set nightly

Install the ``wasm32-unknown-unknown`` package:

.. code-block:: bash

    rustup target add wasm32-unknown-unknown


Then run the following command to start building with Cargo:

.. code-block:: bash

    cargo install --git https://github.com/paritytech/polkadot --tag <version> polkadot --locked

Replace the ``<version>`` with the release version at the page https://github.com/paritytech/polkadot/releases .

The project will start building as shown:

.. image:: images/buildCargo.png

Let it build, it will take some time.

After successful build, you'll see the following:

.. image:: images/buildCargo2.png

Then run the node using:

.. code-block:: bash

    polkadot

The node will be up and running in no time as shown:

.. image:: images/buildCargo3.png
