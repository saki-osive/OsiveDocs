Accord Project Guide
++++++++++++++++++++

Accord Projects
================

    .. image:: images/projects.png

Accord Steps Flow Diagram
==========================

    .. image:: images/flow--diagram.png
    
    .. image:: images/Accord-Blockchain.png
    
    .. image:: images/Accord-Blockchain.png


Install Cicero
===============

Prerequisites
--------------

- Node.js
- npm

Getting started
----------------

* Install cicero commandline tools

    .. code-block:: bash

        npm install -g @accordproject/cicero-cli

* Install VS Code

    .. code-block:: bash

        # Add microsoft repositories
        wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
        sudo install -o root -g root -m 644 packages.microsoft.gpg /etc/apt/trusted.gpg.d/
        sudo sh -c 'echo "deb [arch=amd64 signed-by=/etc/apt/trusted.gpg.d/packages.microsoft.gpg] https://packages.microsoft.com/repos/vscode stable main" > /etc/apt/sources.list.d/vscode.list'

        # Update and install code
        sudo apt update
        sudo apt install code        
        
* Add ``yo`` Yeoman extension on VS Code

* Add ``Accord Project`` extension on VS Code

    .. image:: images/AccordProjectExtension.png




Contract Template Creation 
===========================

Generate Template
------------------

* Install template generator tool

    .. code-block:: bash

        npm install -g yo
        npm install -g @accordproject/generator-cicero-template

* Then generate your new project:

    .. code-block:: bash

        yo @accordproject/cicero-template


Template Structure
-------------------

The template structure is like as below.


.. code-block:: bash

    package.json
    Metadata for the template (name, version, description etc)

    README.md
        A markdown file that describes the purpose and correct usage for the template

    text/grammar.tem.md
        The default grammar for the template

    text/sample.md
        A sample clause or contract text that is valid for the template

    model/
        A collection of Concerto model files for the template. They define the Template Model
        and models for the State, Request, Response, and Obligations used during execution.

    logic/
        A collection of Ergo files that implement the business logic for the template

    test/
        A collection of unit tests for the template

    state.json (optional)
        A sample valid state for the clause or contract

    request.json (optional)
        A sample valid request to trigger execution for the template


Template Text
--------------

* ``text/grammar.tem.md`` contains grammar of the template

    Example

    Name of the person to greet: {{name}}.
    

    Thank you!

* ``text/sample.md`` contains a sample valid for that grammar.

    Example

    Name of the person to greet: "Fred Blogs".
    Thank you!

**Notes:**

* ``{{name}}`` is a variable.

    **Example:** 

    Name of the person to greet: {{name}}.

* ``{{% expression %}}`` for formulas

* ``{{#blockName variableName}} {{/blockName}}``. Blocks which may contain additional text or markdown.


CiceroMark
------------

CiceroMark is used to express the natural language text for legal clauses or contracts.

* Clauses within a contract can be identified using a clause block: 

    .. code-block:: bash

        {{#clause clauseName}}
        text of the clause
        {{/clause}}

* ``{{% result_of_the_formula %}}`` identifies the results of formulas within a contract or clause.


TemplateMark
---------------

TemplateMark is an extension to CommonMark used to write the text in Accord Project templates.


Variables
''''''''''

Standard variables are written {{variableName}} where variableName is a variable declared in the model.

**String Variable**

If the variable `variableName` has type String in the model:

    Syntax:

    .. code-block:: bash

        o String variableName

    Example: `text/grammer.md`

    .. code-block:: bash

        This Supply Sales Agreement is made between {{supplier}} and {{buyer}}.

    Example: `model/model.cto`

    .. code-block:: bash

        asset Template extends AccordClause {
            o String buyer
            o String supplier
        }

**Numeric Variable**

If the variable variableName has type `Double`, `Integer` or `Long` in the model:

    Syntax:

    .. code-block:: bash

        o Double variableName
        o Integer variableName2
        o Long variableName3


    Example: `text/grammer.md`

    .. code-block:: bash

        The penalty amount is {{penaltyPercentage}}% of the total value of the Equipment whose delivery has been delayed.

    Example: `model/model.cto`

    .. code-block:: bash

        asset Template extends AccordClause {
            o Double penaltyPercentage
        }

**Enum Variables**

If the variable ``variableName`` has an enumerated type:

    Syntax:

    .. code-block:: bash

        o EnumType variableName

    Example: `text/grammer.md`

    .. code-block:: bash

        Monetary amounts in this contract are denominated in {{currency}}.

    Example: `model/model.cto`

    .. code-block:: bash

        import org.accordproject.money.CurrencyCode from https://models.accordproject.org/money.cto
        asset Template extends AccordClause {
            o CurrencyCode currency
        }


**Formatted Variables**

Formatted variables are written ``{{variableName as "FORMAT"}}`` where ``variableName`` is a variable declared in the model and the ``FORMAT`` is a type-dependent description for the syntax of the variables in the contract.

    Example: 

    .. code-block:: bash
    
        The contract was signed on {{contractDate as "DD/MM/YYYY"}}.


**DateTime Variables**

If the variable `variableName` has type `DateTime`:

    `Example:`

    .. code-block:: bash

        The contract was signed on {{contractDate as "DD/MM/YYYY"}}.
        // OUTPUT: The contract was signed on 26/04/2019.
    
        dateTimeProperty: {{dateTimeProperty as "D MMM YYYY HH:mm:ss.SSSZ"}}
        //  OUTPUT: dateTimeProperty: 1 Jan 2018 05:15:20.123+01:02

        dateTimeProperty: {{dateTimeProperty as "D-M-YYYY H mm:ss.SSSZ"}}
        //  OUTPUT: dateTimeProperty: 31-12-2019 2 59:01.001+01:01

        dateTimeProperty: {{dateTimeProperty as "DD/MM/YYYY"}}
        //  OUTPUT: dateTimeProperty: 01/12/2018

**Amount Variables**

If the variable variableName is of type ``Integer``, ``Long``, ``Double`` or ``MonetaryAmount``:

The following formatting tokens are supported:

+----------+--------------+------------------------------------+------------------------------------+
|   Input  |    Example   |             Description            |           Type Supported           |
+----------+--------------+------------------------------------+------------------------------------+
| 0,0      | 3,100,200    | integer part with , separator      | Integer,Long,Double,MonetaryAmount |
+----------+--------------+------------------------------------+------------------------------------+
| 0 0      | 3 100 200    | integer part with  separator       | Integer,Long,Double,MonetaryAmount |
+----------+--------------+------------------------------------+------------------------------------+
| 0,0.00   | 3,100,200.95 | decimal with two digits precision  | Double,MonetaryAmount              |
+----------+--------------+------------------------------------+------------------------------------+
| 0 0,00   | 3 100 200,95 | decimal with two digits precision  | Double,MonetaryAmount              |
+----------+--------------+------------------------------------+------------------------------------+
| 0,0.0000 | 3,100,200.95 | decimal with four digits precision | Double,MonetaryAmount              |
+----------+--------------+------------------------------------+------------------------------------+
| CCC      | USD          | currency code                      | MonetaryAmount                     |
+----------+--------------+------------------------------------+------------------------------------+
| K        | $            | currency symbol                    | MonetaryAmount                     |
+----------+--------------+------------------------------------+------------------------------------+


    Syntax: 

    .. code-block:: bash

        o Integer integerVariable
        o Long longVariable
        o Double doubleVariable
        o MonetaryAmount monetaryVariable

    Examples:

    .. code-block:: bash

            The manuscript shall be completed within {{days as "0,0"}} days.
            //  OUTPUT: The manuscript shall be completed within 1,001 days.

            The manuscript shall contain at most {{words as "0 0"}} words.
            //  OUTPUT: The manuscript shall contain at most 1 500 001 words.

            The effective range of the device should be at least {{distance as "0,0.00mm"}}.
            //  OUTPUT: The effective range of the device should be at least 1,250,400.99mm.

Complex Types Variables
------------------------

**Duration Types**

If the variable `variableName` has type `Duration`:

    Examples:

    .. code-block:: bash

        asset Template extends AccordClause {
            o Duration termination
        }


Other Complex Types
--------------------

If the variable `variableName` has a complex type `ComplexType` (such as an `asset`, a `concept`, etc.)

    Syntax:

    .. code-block:: bash

        o ComplexType variableName

    Example: Model for address type

    .. code-block:: bash

        import org.accordproject.address.PostalAddress from https://models.accordproject.org/address.cto
        asset Template extends AccordClause {
            o PostalAddress address
        }

    .. code-block:: bash

        Address of the supplier: {{address}}.
        // OUTPUT: Address of the supplier: "555 main street" "10290" "" "NY" "New York" "10001".



Blocks
-------

CiceroMark uses blocks to enable more advanced scenarios, to handle optional or repeated text (e.g., lists), to change the variables in scope for a given section of the text, etc.


Inline Blocks
''''''''''''''

Inline blocks correspond to inline elements in the markdown.

    Syntax:

    .. code-block:: md

        {{#blockName variableName parameters}}...{{/blockName}}

* where `blockName` indicates which kind of block it is (e.g., conditional block or optional block), `variableName` indicates the template variable which is in scope within the block. For certain blocks, additional `parameters` can be passed to control the behavior of that block (e.g., the `join` block creates text from a list with an optional separator).


Conditional Blocks
'''''''''''''''''''

Conditional blocks enables text which depends on a value of a ``Boolean`` variable in your model:

    Syntax: Using if block

    .. code-block:: md

        {{#if forceMajeure}}This is a force majeure{{/if}}

    Syntax: Using if and else block

    .. code-block:: md

        {{#if forceMajeure}}This is a force majeure{{else}}This is *not* a force majeure{{/if}}

    **Example:** Using JSON Data

    .. code-block:: json

        {
            "$class": "org.accordproject.foo.Status",
            "forceMajeure": true
        }

    **Result**

    .. code-block:: bash

        This is a force majeure

Optional Blocks
''''''''''''''''

Optional blocks enables text which depends on the presence of absence of an `optional` variable in your model:

    **Syntax:**

    .. code-block:: md

        {{#optional forceMajeure}}This applies except for Force Majeure cases in a {{miles}} miles radius.{{/optional}}


With Blocks
''''''''''''

A `with` block can be used to changes variables that are in scope in a specific part of a template grammar:

    **Syntax:**

    .. code-block:: md

        For the Tenant: {{#with tenant}}{{partyId}}, domiciled at {{address}}{{/with}}
        For the Landlord: {{#with landlord}}{{partyId}}, domiciled at {{address}}{{/with}}

    **Example:**

    Using request JSON

    .. code-block:: json

        {
            "$class": "org.accordproject.rentaldeposit.RentalDepositClause",
            "contractId": "31d817e2-d62a-4b70-b395-acd0d5da09f5",
            "tenant": {
                "$class": "org.accordproject.rentaldeposit.RentalParty",
                "partyId": "Michael",
                "address": "111, main street"
            }
        ...
        }


    `Result:`

    .. code-block:: md

        For the Tenant: "Michael", domiciled at "111, main street"
        For the Landlord: "Parsa", domiciled at "222, chestnut road"


Join Blocks
'''''''''''

A ``join`` block can be used to iterate over a variable containing an array of values, and can use an (optional) separator.

    **Syntax:**

    .. code-block:: md

        Discount applies to the following items: {{#join items separator=", "}}{{name}} ({{id}}){{/join}}.

    `Result: Using below JSON Request`

    .. code-block:: json

        {
            "$class": "org.accordproject.sale.Order",
            "contractId": "31d817e2-d62a-4b70-b395-acd0d5da09f5",
            "items": [{
                "$class": "org.accordproject.slate.Item",
                "id": "111",
                "name": "Pineapple"
                },{
                "$class": "org.accordproject.slate.Item",
                "id": "222",
                "name": "Strawberries"
                },{
                "$class": "org.accordproject.slate.Item",
                "id": "333",
                "name": "Pomegranate"
                }
            ]
        }

        `Output:`

        .. code-block:: md

            Discount applies to the following items: Pineapple (111), Strawberries (222), Pomegranate (333).


Container Blocks
'''''''''''''''''

CiceroMark uses block expressions to enable more advanced scenarios, to handle optional or repeated text (e.g., lists), to change the variables in scope for a given section of the text, etc.

    **Syntax:**

    .. code-block:: md

        {{#blockName variableName parameters}}
        ...
        {{/blockName}}

Unordered Lists
''''''''''''''''

    **Syntax:**

    .. code-block:: md

        {{#ulist rates}}
        {{volumeAbove}}$ M<= Volume < {{volumeUpTo}}$ M : {{rate}}%
        {{/ulist}}

    `Example: Using below request json`

    .. code-block:: json

        {
        "$class": "org.accordproject.volumediscountlist.VolumeDiscountContract",
        "contractId": "19243313-adc2-4ff1-aa41-993816ed2cdc",
        "rates": [
            {
            "$class": "org.accordproject.volumediscountlist.RateRange",
            "volumeUpTo": 1,
            "volumeAbove": 0,
            "rate": 3.1
            },
            {
            "$class": "org.accordproject.volumediscountlist.RateRange",
            "volumeUpTo": 10,
            "volumeAbove": 1,
            "rate": 3.1
            },
            {
            "$class": "org.accordproject.volumediscountlist.RateRange",
            "volumeUpTo": 50,
            "volumeAbove": 10,
            "rate": 2.9
            }
        ]
        }


    `Output:`

    .. code-block:: md

        - 0.0$ M <= Volume < 1.0$ M : 3.1%
        - 1.0$ M <= Volume < 10.0$ M : 3.1%
        - 10.0$ M <= Volume < 50.0$ M : 2.9%


Ordered Lists
''''''''''''''

    **Syntax:**

    .. code-block:: md

        {{#olist rates}}
        {{volumeAbove}}$ M <= Volume < {{volumeUpTo}}$ M : {{rate}}%
        {{/olist}}

Clause Blocks
''''''''''''''

Clause blocks can be used to include a clause template within a contract template:

    **Syntax:**

    .. code-block:: md

        Payment
        -------
        {{#clause payment}}
        As consideration in full for the rights granted herein, Licensee shall pay Licensor a one-time
        fee in the amount of {{amountText}} ({{amount}}) upon execution of this Agreement, payable as
        follows: {{paymentProcedure}}.
        {{/clause}}


Concerto Model
---------------

The Concerto Modeling Language (CML) allows you to:

    * Define an object-oriented model using a domain-specific language that is much easier to read and write than JSON/XML Schema, XMI or equivalents.
    * Optionally edit your models using a powerful VS Code add-on with syntax highlighting and validation
    * Create runtime instances of your model
    * Serialize your instances to JSON

Notes:
'''''''

* ``Namespace`` :Each Concerto file starts with the name of a single namespace, which contains the base definitions of asset, event, participant and transaction. 

    *Example:*

    .. code-block:: md

        namespace foo

* ``Imports`` : In order for one namespace to reference types defined in another namespace, the types must be imported. Imports can be either qualified or can use wildcards.


Classes
''''''''

**Concepts**

Concepts are similar to class declarations in most object-oriented languages, in that they may have a super-type and a set of typed properties:

    `Syntax:`

    .. code-block:: js

        abstract concept Animal {
        o DateTime dob
        }

        concept Dog extends Animal {
        o String breed
        }

**Identity**

Concepts may optionally declare an identifying field, using either the `identified by` (explicitly named identity field) or identified (`$identifier` system identity field) syntax.

    `Examples:`

    .. code-block:: js

        concept Person identified by email {
            o String email
            o String firstName
            o String lastName
        }

    * `Person` is defined to use the `email` property as its identifying field.

**Assets**

An asset is a class declaration that has a single ``String`` property which acts as an identifier. You can use the ``modelManager``.``getAssetDeclarations`` API to look up all assets.

    `Syntax:`

    .. code-block:: js

        asset Vehicle identified by vin {
        o String vin
        }

**Participants**

Participants are class declarations that have a single ``String`` property acting as an identifier.

    `Syntax:`

    .. code-block:: js

        participant Customer identified by email {
            o String email
        }

**Transactions**

Transactions are similar to participants in that they are also class declarations that have a single ``String`` property acting as an identifier.

    `Syntax:`

    .. code-block:: js

        transaction Order identified by orderId {
            o String orderId
        }

**Events**

Events are similar to participants in that they are also class declarations that have a single String property acting as an identifier. 

    `Syntax:`

    .. code-block:: js

        event LateDelivery identified by eventId {
        o String eventId
        }

Enumerations
'''''''''''''

Enumerations are used to capture lists of domain values.

    **Syntax:**

    .. code-block:: js

        enum Cardsuit {
            o CLUBS
            o DIAMONDS
            o HEARTS
            o SPADES
        }

Properties
''''''''''

Class declarations contain properties. Each property has a type which can either be a type defined in the same namespace, an imported type, or a primitive type.

**Primitive types**

    +----------+-------------------------------------------------------------------------------+
    |   Type   |                                  Description                                  |
    +----------+-------------------------------------------------------------------------------+
    | String   | a UTF8 encoded String.                                                        |
    +----------+-------------------------------------------------------------------------------+
    | Double   | a double precision 64 bit numeric value.                                      |
    +----------+-------------------------------------------------------------------------------+
    | Integer  | a 32 bit signed whole number.                                                 |
    +----------+-------------------------------------------------------------------------------+
    | Long     | a 64 bit signed whole number.                                                 |
    +----------+-------------------------------------------------------------------------------+
    | DateTime | an ISO-8601 compatible time instance, with optional time zone and UTZ offset. |
    +----------+-------------------------------------------------------------------------------+
    | Boolean  | a Boolean value, either true or false.                                        |
    +----------+-------------------------------------------------------------------------------+

**Meta Properties**

    +----------+-------------------------------------------------------------------------+
    | Property |                               Description                               |
    +----------+-------------------------------------------------------------------------+
    | []       | declares that the property is an array                                  |
    +----------+-------------------------------------------------------------------------+
    | optional | declares that the property is not required for the instance to be valid |
    +----------+-------------------------------------------------------------------------+
    | default  | declares a default value for the property, if no value is specified     |
    +----------+-------------------------------------------------------------------------+
    | range    | declares a valid range for numeric properties                           |
    +----------+-------------------------------------------------------------------------+
    | regex    | declares a validation regex for string properties                       |
    +----------+-------------------------------------------------------------------------+

``Examples:``

.. code-block:: js

    o Integer intLowerUpper range=[-1,1] // greater than or equal to -1 and less than 1
    o Integer intLower range=[-1,] // greater than or equal to -1
    o Integer intUpper range=[,1] // less than 1

    asset Vehicle {
    o String model default="F150"
    o String make default="FORD"
    o Integer year default=2016 range=[1990,] optional // model year must be 1990 or higher
    o String V5cID regex=/^[A-z][A-z][0-9]{7}/
    }

**Relationships**

A relationship in Concerto Modeling Language (CML) is a tuple composed of:

    #. The namespace of the type being referenced
    #. The type name of the type being referenced
    #. The identifier of the instance being referenced

    ``Example:``

    .. code-block:: js

        asset OrderLine identified by orderLineId {
        o String orderLineId
        o String sku
        }

        asset Order identified by orderId {
        o String orderId
        --> OrderLine[] orderlines
        }

    .. note:: In this example, the model declares that an `Order` has-an array of reference to `OrderLines`. Deleting the `Order` has no impact on the `OrderLine`. When the `Order` is serialized the JSON only the IDs of the `OrderLines` are stored within the `Order`, not the `OrderLines` themselves.