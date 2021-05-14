Neo Blockchain Setup
====================

Workflow
++++++++

.. image:: images/neo_workflow.png

Prerequisite
++++++++++++

1. Download Virtualbox

https://www.virtualbox.org/wiki/Downloads

2. Download Windows Server Essentials 2019 .iso file.

https://www.microsoft.com/en-us/evalcenter/evaluate-windows-server-2019-essentials

Product key:
NJ3X8-YTJRF-3R9J9-D78MF-4YBP4

.. image:: images/product_keys.png

3. Neo Blockchain Codebase

https://github.com/neo-project/neo

Create a new Virtual Machine in Virtualbox
++++++++++++++++++++++++++++++++++++++++++

Click on New virtual machine button.

.. image:: images/00_vm.png

Select the below options

| Name: ``neoBlockchain``
| Type: ``Microsoft Windows``
| Version: ``Windows 2019 (64 bit)``


.. image:: images/01_vm.png

Allocate 24 GB Ram to Virtual Machine

.. image:: images/02_vm.png

Create a virtual hard disk for virtual machine, select Dynamically allocated.
Select Size of virtual machine as 200GB


.. image:: images/05_vm.png

.. image:: images/06_vm.png


.. image:: images/07_vm.png

.. image:: images/08_vm.png


Open Setting of the newly created virtual machine.

.. image:: images/08-1_vm.png

Select Storage Menu, choose disk file. 
Select the windows-server.iso file.

.. image:: images/08-2_vm.png

.. image:: images/10_vm.png

.. image:: images/11_vm.png

Select Network Menu, and select Bridged Adapter as shown below.

.. image:: images/12_vm.png

Start the Virtual machine

.. image:: images/18_vm.png

Install Windows in VirtualMachine
+++++++++++++++++++++++++++++++++

.. image:: images/vm_install_01.png

.. image:: images/vm_install_02.png

.. image:: images/vm_install_03.png

.. image:: images/vm_install_04.png

Enter Product Key ``NJ3X8-YTJRF-3R9J9-D78MF-4YBP4``

.. image:: images/vm_install_05.png

.. image:: images/vm_install_06.png


.. image:: images/vm_install_07.png

.. image:: images/vm_install_08.png

.. image:: images/vm_install_09.png

.. image:: images/vm_install_010.png

.. image:: images/vm_install_011.png


.. image:: images/vm_install_012.png
.. image:: images/vm_install_013.png

.. image:: images/vm_install_014.png

.. image:: images/vm_install_015.png

.. image:: images/vm_install_016.png

.. image:: images/vm_install_017.png


.. image:: images/vm_install_018.png

.. image:: images/vm_install_019.png



Install firefox Browser
+++++++++++++++++++++++

Open Internet Explorer and Download mozzila browser.

https://www.mozilla.org/en-US/firefox/all/#product-desktop-release


.. image:: images/download_firefox.png
.. image:: images/install_firefox.png
.. image:: images/open_firefox.png


Download and setup Visual Studio
++++++++++++++++++++++++++++++++

Open URL in firefox and download the community version.

https://visualstudio.microsoft.com/downloads/


.. image:: images/dnd_1.png

.. image:: images/dnd_2.png

.. image:: images/dnd_4.png


Build Neo C# Codebase
+++++++++++++++++++++


.. image:: images/dnd_5.png

Enter Neo repository URL to clone.

https://github.com/neo-project/neo.git

.. image:: images/dnd_6.png

Right Click on Project name and Select Build option.

.. image:: images/dnd_7.png

.. image:: images/dnd_8.png









