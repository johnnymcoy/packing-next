import json
from py3dbp import Packer, Bin, Item, Painter
from py3dbp.constants import RotationType
from decimal import Decimal
# from itertools import combinations
# from math import comb
import copy

import time


class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return str(obj)
        return super(DecimalEncoder, self).default(obj)

def convert_data(data):
    # Get data from input  
    # method = data.get('method', "single")
    orders = data.get('orders', [])
    packages = data.get('packages', [])    
    
    bins = []
    items = []
    
    #  Sort some of the packages, remove any that have volume smaller than orders
    order_volumes = []
    
    # add an item for each order
    for order in orders:
        name = order.get('name', 'default-name')
        width = float(order.get('width', 0))
        height = float(order.get('height', 0))
        depth = float(order.get('depth', 0))
        weight = float(order.get('weight', 0))
        amount = int(order.get('amount', 1))
        for _ in range(amount):
            # packer.add_item(Item(name, width, height, depth, weight))
            # items.append(Item(name, width, height, depth, weight))
            items.append(Item(name, width, height, depth, weight, name))

        volume = (width * height * depth)
        order_volumes.append(volume)
     
    # Turn packages (post options) into "Bins"
    for package in packages:
        name = package.get('name', 'default-bin')
        width = float(package.get('width', 0))
        height = float(package.get('height', 0))
        depth = float(package.get('depth', 0))
        weight = float(package.get('weight', 0))
        volume = (width * height * depth)
        
        # remove any packages smaller than all the orders 
        orders_larger = 0
        for order_volume in order_volumes:
            if volume < order_volume:
                orders_larger = orders_larger + 1
        if orders_larger == len(order_volumes):
            # Don't add the package, it's smaller than every order
            print("don't add the package, it's smaller than every order")
        else:
            bins.append(Bin(name, width, height, depth, weight))
    return bins, items


def pack_orders(orders, bins):
    packer = Packer()
    # Clear previous items
    packer.bins = []
    packer.items = []
    
    for bin in bins:
        packer.add_bin(copy.deepcopy(bin))

    for order in orders:
        packer.add_item(copy.deepcopy(order))
    # print("Packer Items:",packer.items)
        
    packer.pack(True, False)
    # packer.pack(bigger_first=True, distribute_items=True, fix_point=False, check_stable=False,support_surface_ratio=0,number_of_decimals=2)
    # for bin in packer.bins:
    #     print()
        # print("Items: ",bin.items)
        
    # copy.deepcopy(packer.bins)
    return packer.bins



def check_leftovers(extras, bins):
    #! Now try pack the leftover orders
    repacked_bins = pack_orders(extras, bins)
    
    single_result = []
    single_result_leftovers = []
    smallestEmptyVol = 1000000000000
    leftovers = []
    #! Go through each bin
    for bin in repacked_bins:
        repack_results, more_leftovers = generate_result(bin)
        
        # painter = Painter(bin)
        # fig = painter.plot_box_and_items(
        #     title=bin.partno,
        #     alpha=0.2,
        #     write_num=False,
        #     fontsize=5
        # )
        # fig.show()

        repack_result_bin = repack_results.get('bin', [])
        #! Get the emptyVolume in the bin
        emptyVolume = repack_result_bin.get('emptyVolume', [])
        #! Get if the bin is empty
        rebin_empty = repack_result_bin.get('bIsEmpty', [])
        #! Get the Bin name 
        binName = repack_result_bin.get('name', [])

        #! Remove all Empty bins
        if rebin_empty:
            repack_results = []
            leftovers = []
        else:
            #! if there's no more leftovers
            if not more_leftovers:
                #! get the bin with the smallest empty volume
                if emptyVolume < smallestEmptyVol:
                    smallestEmptyVol = emptyVolume
                    print(binName, smallestEmptyVol)
                    single_result = repack_results
            else:
                print(binName, "still has leftovers, continue Packing")
                single_result_leftovers = more_leftovers
                single_result = repack_results
                
        # ! works for getting the 2nd box the smallest, but not if there's still more
        # ! need to figure out when it does another box        
        
    return single_result, single_result_leftovers

def pack_items(data):
    # Get data from input
    bins, items = convert_data(data)
    
    #! The maximum number of times we try to repack into smaller boxes
    max_attempts = 20
    all_results = []
        
    #! First attempt to get all items in 1 bin
    packed_bins = pack_orders(items, bins)
    #! Go through each result of bins
    for bin in packed_bins:

        #! Generate results of that bin
        results, leftovers = generate_result(bin)    
        # print("results:", results)
        #! Get the bin from the results
        result_bin = results.get('bin', [])
        #! Get If the bin is empty
        bin_empty = result_bin.get('bIsEmpty', [])
        #! Get the Bins Empty Volume
        bin_emptyVolume = result_bin.get('emptyVolume', [])
        #! Get the Bin name 
        binName = result_bin.get('name', [])
        
        #! Start a New Single Result, each bin will start a new one
        single_result = []
        

        #! only continue if the bin isn't empty 
        if not bin_empty:
            # print(binName, bin_empty)
            
            #! Add the bin to a Single Result
            single_result.append(results)  
            # print("single_result:", single_result)

            if not leftovers:
                all_results.append(copy.deepcopy(single_result))
                continue

            # min_empty_volume = float('inf')
            # smallest_empty_volume_bin = None
                      
            attempt = 0
            # ! if there's leftovers
            while len(leftovers) != 0 and attempt < max_attempts:
                attempt += 1
                # print(binName, " has Leftovers", "Repacks:", attempt, "Leftovers:", len(leftovers))
                repack_results, leftovers = check_leftovers(leftovers, bins)
                if repack_results:
                    single_result.append(repack_results);

            # while leftovers and attempt < max_attempts:
            #     repacked_bins = pack_orders(leftovers, bins)
            #     for b in repacked_bins:
            #         repack_results, more_leftovers = generate_result(b)
                    
            #         # totalVolume = bin_emptyVolume + emptyVolume
            #         if rebin_empty: 
            #             print()
            #         else:
            #             if emptyVolume < min_empty_volume:
            #                 min_empty_volume = emptyVolume
            #                 smallest_empty_volume_bin = repack_results
            #         # ! works for getting the 2nd box the smallest, but not if there's still more
            #         # ! need to figure out when it does another box
            #         if more_leftovers:
            #             print("continue Packing")
            #             leftovers = more_leftovers
            #         else:
            #             leftovers = []
            #         # single_result.append(repack_results)
                        
                # attempt += 1
            # if smallest_empty_volume_bin:
            #     single_result.append(smallest_empty_volume_bin)
            # single_result.append(repack_results)
        all_results.append(copy.deepcopy(single_result))

    # print("All Results:", all_results)
    return all_results
    
#! For only a single Bin
def generate_result(bin):
    items = [{
        "name": i.name,
        "position": i.position,
        "width": i.width,
        "height": i.height,
        "depth": i.depth,
        "weight": i.weight,
        "volume": i.height * i.depth * i.width,
        "rotation": RotationType.rotation_type_to_euler(i.get_rotation()) 
    } for i in bin.items]
    total_items_volume = sum(item["volume"] for item in items)
    total_items_weight = sum(item["weight"] for item in items)
    leftItems = bin.unfitted_items
    
    results = ({
        "bin": {
            "name": bin.name,
            "width": bin.width,
            "height": bin.height,
            "depth": bin.depth,
            "weight": bin.max_weight,
            "totalWeight":  total_items_weight,
            "volume" : bin.width * bin.height * bin.depth,
            "itemsVolume": total_items_volume,
            "emptyVolume" : (bin.width * bin.height * bin.depth) - total_items_volume,
            "bIsEmpty" : (total_items_volume) == 0,
            "bFitEverything": len(bin.unfitted_items) == 0,
            "itemsLeft": len(bin.unfitted_items),
    },
        "items": items
    })
    
    return results, leftItems

#! old method for multiple bins
def generate_results(bins):
    results = []
    bins_used = 0
    for b in bins:
        # Shows a visual from python -- Rotation is messed up 
        # b.plotBoxAndItems()
        if b.items: 
            bins_used += 1  # Increment the counter
        items = [{
            "name": i.name,
            "position": i.position,
            "width": i.width,
            "height": i.height,
            "depth": i.depth,
            "weight": i.weight,
            "volume": i.height * i.depth * i.width,
            "rotation": RotationType.rotation_type_to_euler(i.get_rotation()) 
        } for i in b.items]
        total_items_volume = sum(item["volume"] for item in items)
        total_items_weight = sum(item["weight"] for item in items)
        # ! is only getting the left items for 1 thing, needs to be array
        leftItems = b.unfitted_items
        
        results.append({
            "bin": {
                "name": b.name,
                "width": b.width,
                "height": b.height,
                "depth": b.depth,
                "weight": b.max_weight,
                "totalWeight":  total_items_weight,
                "volume" : b.width * b.height * b.depth,
                "itemsVolume": total_items_volume,
                "emptyVolume" : (b.width * b.height * b.depth) - total_items_volume,
                "bIsEmpty" : (total_items_volume) == 0,
                "bFitEverything": len(b.unfitted_items) == 0,
                "itemsLeft": len(b.unfitted_items),
        },
            "items": items
        })
    
    return results, leftItems


class Request:
    """""" 
    def __init__(self, package):
        self.package = package
    
    def pack(self):
        start = time.time()
        data = (self.package)
        results = pack_items(data)
        # print("results:", results)
        stop = time.time()
        print('Calculation time : ',stop - start)
        return results
        
    

if __name__ == '__main__':
    start = time.time()
    
    bServerLocation = False
    print("HELLO, From Python")
    
    if bServerLocation: 
        # # Read input data from a JSON file
        input_path = '/tmp/input.json'
        packages_path = '/tmp/packages.json'
        orders_path = '/tmp/orders.json'
        output_path = '/tmp/output.json'
        with open(input_path, 'r') as f:
            data = json.load(f)
        with open(packages_path, 'r') as f:
            packages = json.load(f)
        with open(orders_path, 'r') as f:
            orders = json.load(f)
    else:
    #! old way would write to file
        with open('pages/api/python/input.json', 'r') as f:
            data = json.load(f)
        with open('pages/api/python/packages.json', 'r') as f:
            packages = json.load(f)
        with open('pages/api/python/orders.json', 'r') as f:
            orders = json.load(f)
            
    results = pack_items(data)
    
    
    # painter = Painter(bin)
    # fig = painter.plot_box_and_items(
    #     title=bin.partno,
    #     alpha=0.2,
    #     write_num=False,
    #     fontsize=5
    # )
    # fig.show()


    stop = time.time()
    print('Calculation time : ',stop - start)
    # results.append({"CalculationTime" : stop-start})
    if bServerLocation: 
        with open(output_path, 'w') as f:
            json.dump(results, f, cls=DecimalEncoder, indent=4)
    else:
        with open('pages/api/python/output.json', 'w') as f:
            json.dump(results, f, cls=DecimalEncoder, indent=4)

