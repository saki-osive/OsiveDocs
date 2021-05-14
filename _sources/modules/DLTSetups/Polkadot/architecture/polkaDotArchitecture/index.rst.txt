Polkadot Architecture
++++++++++++++++++++++

Polkadot is a system of heterogeneous multi-chains that allows for shared security and
interoperability between these chains.

There most important components of Polkadot are :

- Relay chain
- Parachains and parathreads
- Nodes

.. image:: images/polkas.jpg

What is the ``Relay chain`` ?
++++++++++++++++++++++++++++++

The relay chain is the central chain in Polkadot that works as a master and is responsible for delegating
the specific work to the parachains.

It has the following features :

- Interacting with the governing mechanism
- Parachain auctions
- Participating in NPoS (Nominated Proof of Stake)
- Coordinating the whole system including parachains

.. note:: An important point to know here is an ``execution slot`` in Polkadot.

What is an execution slot?
++++++++++++++++++++++++++

Just as there are cores in a processor on which a process executes, there are execution slots in Polkadot
on which Parachains and Parathreads execute. These slots are like cores on a computer's processor
(a modern laptop's processor may have eight cores, for example). Each one of these cores can run one process at a time.
Polkadot allots these slots using two subscription models: parachains and parathreads.

Parachains and Parathreads
+++++++++++++++++++++++++++


Both of these are hypothetical constructs which can be thought of as a data structure for the application
which is being deployed on an execution slot. A Parachain may or may not take the form of a blockchain.
They take their name from the concept of parallelized chains that run parallel to the Relay Chain.
Due to their parallel nature, they are able to parallelize transaction processing and achieve
scalability of the Polkadot system.
They share in the security of the entire Polkadot network and can communicate with other Parachains through XCMP
(Cross-chain Message Passing) protocol.

The image given below highlights the difference between Parachains and Parathreads :

.. image:: images/ParachainsVsParathread.png

The difference between Parachains and Parathreads
++++++++++++++++++++++++++++++++++++++++++++++++++

Both of these constructs have the same API, the difference is only economic.

In Parachains, **a whole execution slot is dedicated**, doesn't matter if or how much the Parachain is
utilising that slot during the time in which it is taken on lease.

Parathreads on the other hand have a different payment model, when you use a Parathread for your block creation,
you **pay based on the number of blocks created** i.e. pay per block. It can be considered a serverless approach.
When a block has to be created, a Parathread becomes active, at other times, it is like a sleeping process.


.. note:: Before learning about the nodes, it's better to know about what is an active ``validator set``.



What is active validator set?
++++++++++++++++++++++++++++++

The validator nodes form an active ``validator set``. This active validator set contains a set of nodes that validate
state transition from collators. For a validator node to get in the active validator set, it must be
nominated to be in the set by the nominator nodes.



.. image:: images/nodesPolka.png


What are nodes?
+++++++++++++++

Nodes are the physical machines(computers) on a blockchains that actually make the blocks.
These nodes lie under 3 categories in Polkadot :

- Validators


Validators are the nodes that produce blocks on the Relay Chain. They also accept proofs of valid state transition
from collators. In return, they receive staking rewards.


- Collators


Collators are the nodes that lie both on the Relay chain and the Parachain. They collect parachain transactions
and produce state transition proofs for the validators on the Relay Chain. They can also send and receive messages
from other parachains using XCMP.



- Nominators


Nominators nominate the validators in order to help them get into the active validator set and thus produce
blocks for the chain by bonding their stake to particular validators. In return, nominators are generally rewarded with
the portion of the staking rewards from that validator.


















