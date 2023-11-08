# Python Packing

# Files

## lambda_function.py
A copy of the API function hosted on AWS Lambda

## app.py
This file is where the data gets converted into python objects.

AWS calls the Request

A Local call will run the __main__

#### convert_data 
converts each order, package, to Python objects, and removes any postage options that are smaller than every item.

#### pack_orders 
Adds each postage option as a Bin, and each order item as an Item then packs the orders

#### check_leftovers 
Goes through the results and repacks leftover items into bins, sorting them by the smallest empty volume

#### generate_result
Converts the result of a single Bin back into a useable result for javascript

#### pack_items
Converts all data, Packs the orders, repacks any leftovers, then generates results, and removes all empty results

## main.py
This does all the packing, contains Item, Bin, Packer,

Bin and Items have the same creation params:
```
my_bin = Bin(name, width, height, depth, max_weight)
my_item = Item(name, width, height, depth, weight)
```
#### Packer
Packs all the Items into a Bin
```
packer = Packer()           # PACKER DEFINITION

packer.add_bin(my_bin)      # ADDING BINS TO PACKER
packer.add_item(my_item)    # ADDING ITEMS TO PACKER

packer.pack()               # PACKING - by default (bigger_first=False, distribute_items=False, number_of_decimals=3)
```

## mainv2.py
This is using a combination of other Github 3D packers to try and add some features, not yet working.
Features: 
- Item floating
- Item having a certain load bearing limit
- Item Priority
- Items that need to be together
- Items that can't be placed upside down



## Extras

## Constants
Rotation types

## Visual
Plots result to a visual using python, only usable locally

## Old Files (Depricated files)


Postage.py
- Used for calculating postage, but an actual postage API needed to be more accurate
- Calculates postage based on Zone, Weight, and Parcels
