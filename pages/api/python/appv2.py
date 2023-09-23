import json
from py3dbp import Packer, Bin, Item
from py3dbp.constants import RotationType
from decimal import Decimal
from itertools import combinations
from math import comb
import copy

class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return str(obj)
        return super(DecimalEncoder, self).default(obj)

def convert_data(data):
    # Get data from input
    method = data.get('method', "single")
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
            items.append(Item(name, width, height, depth, weight))

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
            if not leftovers:
                all_results.append(copy.deepcopy(single_result))
                continue

            # min_empty_volume = float('inf')
            # smallest_empty_volume_bin = None
                      
            attempt = 0
            # ! if there's leftovers
            while len(leftovers) != 0 and attempt < max_attempts:
                attempt += 1
                print(binName, " has Leftovers", "Repacks:", attempt, "Leftovers:", len(leftovers))
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

    
    # itemsLeft = len(items)
    # print("Items Left", itemsLeft)
    # # ! First pack box
    # # ! need to fix the attepmts.. (it will always do it 5 times)
    # for attempt in range(max_attempts):
    #     packed_bins = pack_orders(items, bins)
    #     for bin in packed_bins:
    #         single_result = []

    #         results, leftovers = generate_result(bin)
    #         result_bin = results.get('bin', [])
    #         bin_empty = result_bin.get('bIsEmpty', [])
    #         bin_emptyVolume = result_bin.get('emptyVolume', [])
    #         binName = result_bin.get('name', [])
        

    #         if not bin_empty:
    #             print(binName, bin_empty)
    #             single_result.append(copy.deepcopy(results))            
    #             min_empty_volume = float('inf')
    #             smallest_empty_volume_bin = None
                
    #             # ! if there's leftovers
    #             # while leftovers and attempt < max_attempts:
    #             #     repacked_bins = pack_orders(leftovers, bins)
    #             #     for b in repacked_bins:
    #             #         repack_results, more_leftovers = generate_result(b)
                        
    #             #         repack_result_bin = repack_results.get('bin', [])
    #             #         emptyVolume = repack_result_bin.get('emptyVolume', [])
    #             #         rebin_empty = repack_result_bin.get('bIsEmpty', [])

    #             #         # totalVolume = bin_emptyVolume + emptyVolume
    #             #         if rebin_empty: 
    #             #             print()
    #             #         else:
    #             #             if emptyVolume < min_empty_volume:
    #             #                 min_empty_volume = emptyVolume
    #             #                 smallest_empty_volume_bin = repack_results
    #             #         # ! works for getting the 2nd box the smallest, but not if there's still more
    #             #         # ! need to figure out when it does another box
    #             #         if more_leftovers:
    #             #             print("continue Packing")
    #             #             leftovers = more_leftovers
    #             #         else:
    #             #             leftovers = []
    #             #         # single_result.append(repack_results)
                            
    #             #     attempt += 1
    #             attempt += 1
    #             # if smallest_empty_volume_bin:
    #             #     single_result.append(smallest_empty_volume_bin)
    #             # single_result.append(repack_results)
    #         all_results.append(single_result)

    #     #! leftovers fails when null 
    #     if not leftovers:
    #         continue
    # print(all_results)
    
    
    
    

    
        # for attempt in range(max_attempts):
        # packed_bins = pack_orders(items, bins)
        # for bin in packed_bins:
        #     single_result = []
        #     results, leftovers = generate_result(bin)
        #     single_result.append(results)
            
        #     while leftovers and attempt < max_attempts:
                
        #     if leftovers:
        #         repacked_bins = pack_orders(leftovers, bins)
        #         for b in repacked_bins:
        #             repack_results, more_leftovers = generate_result(b)
        #             single_result.append(repack_results)
        #             if more_leftovers:
        #                 # Continue  
        #                 print("continue Packing")
                
        #     all_results.append(single_result)
        #     print()

        
        
    # results, leftovers = generate_results(packed_bins)
    # all_results.append(results)
    # print("leftovers", leftovers)
    
    # if leftovers:
    #     repack_attempts = repack_attempts + 1
    #     # print("leftovers")
    #     repacked_bins = pack_orders(leftovers, bins)
    #     new_results, more_leftovers = generate_results(repacked_bins)
    #     # print("more leftovers", new_results)
    #     all_results.append(new_results)
    # # Re-add packages? and packer
    # for bin in packed_bins: 
    # # # Check if the bin has items in it
    # #     # if b.items: 
    # #     #     # bins_used += 1  # Increment the counter
    #     if bin.unfitted_items:
    #         # print()
    #         # for i in bin.unfitted_items:
    #         #     item = {"name": i.name, "width": i.width, "height": i.height, "depth": i.depth, "weight": i.weight, "amount": 1}
    #             # print(i)\
    #         # print("Pack items", items)
    #         # print(bin.unfitted_items)
    #         # print()
    #         unfit_orders = [{"name": i.name, "width": i.width, "height": i.height, "depth": i.depth, "weight": i.weight, "amount": 1} for i in bin.unfitted_items]
    #         # repacked_bins = pack_orders(unfit_orders, bins)
    #         # single_result = generate_results(repacked_bins)
    #         # print(single_result)
    #         # all_results.append(single_result)
    #         # used_bins.append(repacked_bins)
    #         # print("repack Items")

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



# Pack Items - 
# Results
# if - Results.bFitEverything
# Take 1 item with the smallest Volume
# Pack the remainder  
    

# for each item in order
#   for each package in packages
#       Check if orderItem volume Greater than Package
#       


# get results 
#   then do the same calc but now with one item less
# get results
#  so on.. 

# Need a for loop for checking each order item with every combination of order items

if __name__ == '__main__':
    # Read input data from a JSON file
    with open('pages/api/python/input.json', 'r') as f:
        data = json.load(f)
    with open('pages/api/python/packages.json', 'r') as f:
        packages = json.load(f)
    with open('pages/api/python/orders.json', 'r') as f:
        orders = json.load(f)
        
    all_results = []
    
    # leftovers = []
    # ALLORDERS = Orders
    # Remove orders that were packed
    # While len(Orders) !== continue
    # Pack the items (first try)
    results = pack_items(data)
    # print(results)
    # results, leftItems = pack_items(data)
    
    # This should be moved into the function and the function rewritten
    # right now it only gets the leftitems of the last box that failed
    # print(leftItems)
    # all_results.append(results)
    # #  Second Try
    # if len(leftItems) != 0:
    #     repack_attempts = repack_attempts + 1
    #     unfit_orders = [{"name": i.name, "width": i.width, "height": i.height, "depth": i.depth, "weight": i.weight, "amount": 1} for i in leftItems]
    #     format_data = {
    #         "orders": unfit_orders,
    #         "packages": packages,
    #         "method" : "single"
    #     }

    #     if repack_attempts < 2:
    #         print("Keep Packin")
    #         new_results, more_left = pack_items(format_data)
    #         all_results.append(new_results)
            
    # print(repack_attempts)
    
    with open('pages/api/python/output.json', 'w') as f:
        json.dump(results, f, cls=DecimalEncoder, indent=4)
    with open('pages/api/python/multioutput.json', 'w') as f:
        json.dump(all_results, f, cls=DecimalEncoder, indent=4)