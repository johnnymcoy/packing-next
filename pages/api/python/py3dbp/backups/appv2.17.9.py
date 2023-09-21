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
            # packer.add_bin(Bin(name, width, height, depth, weight))
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
        
    packer.pack(False, False)
    for bin in packer.bins:
        print()
        # print("Items: ",bin.items)
    
    return packer.bins



def check_leftovers(extras):
    
    print()

def pack_items(data):
    # Get data from input
    bins, items = convert_data(data)
    
    # repack_attempts = 0
    max_attempts = 5
    all_results = []
    
    # itemsLeft = len(items)
    # print("Items Left", itemsLeft)
    # ! First pack box
    for attempt in range(max_attempts):
        packed_bins = pack_orders(items, bins)
        for bin in packed_bins:
            single_result = []
            results, leftovers = generate_result(bin)
            single_result.append(results)
            
            result_bin = results.get('bin', [])
            bin_emptyVolume = result_bin.get('emptyVolume', [])
            print(bin_emptyVolume)
            
            min_empty_volume = float('inf')
            smallest_empty_volume_bin = None
            
            # ! if there's leftovers
            while leftovers and attempt < max_attempts:
                repacked_bins = pack_orders(leftovers, bins)
                for b in repacked_bins:
                    repack_results, more_leftovers = generate_result(b)
                    
                    repack_result_bin = repack_results.get('bin', [])
                    emptyVolume = repack_result_bin.get('emptyVolume', [])
                    
                    totalVolume = bin_emptyVolume + emptyVolume
                    
                    print(totalVolume)
                    if totalVolume < min_empty_volume:
                        min_empty_volume = totalVolume
                        smallest_empty_volume_bin = repack_results
                    # ! works for getting the 2nd box the smallest, but not if there's still more
                    # ! need to figure out when it does another box
                    if more_leftovers:
                        print("continue Packing")
                        leftovers = more_leftovers
                    else:
                        leftovers = 0
                    # single_result.append(repack_results)
                        
                attempt += 1
            
            if smallest_empty_volume_bin:
                single_result.append(smallest_empty_volume_bin)
                
            all_results.append(single_result)
            print()
        if not leftovers:
            break
        
    
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
    # leftovers.append(b.unfitted_items)
    
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
            # "leftoverItems": leftItems               
    },
        "items": items
    })
    
    return results, leftItems


def generate_results(bins):
    results = []
    bins_used = 0
    for b in bins:
        # print(b)
        # Check if the bin has items in it
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
        # leftovers.append(b.unfitted_items)
        
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
                # "leftoverItems": leftItems               
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
    #! Expanded orders
    # # Add all amounts seperaly for the orders 
    # expanded_orders = []
    # for order in orders:
    #     expanded_orders.extend([order] * order["amount"])
    # print(expanded_orders)
    # allCombos = []
    #! All combinations of orders
    # Get all combinations of the orders
    # print(data)
    # needs to take into account amount aswell 
    # index = 0
    # for r in range(2, len(expanded_orders) + 1):
    #     for subset in combinations(expanded_orders, r):
    #         combo= {
    #             "orders": subset,
    #             "packages": packages,
    #             "method" : "single"
    #         }
    #         index = index + 1
            
    #         # print(combo)
    #         # currentResult = pack_items(combo)
    #         # allCombos.append(currentResult)
    #         # print(currentResult)
    # print(index)
    
    # Total amount of combinations of all the orders
    # n = len(expanded_orders)
    # total_combs = sum(comb(n,r) for r in range(1, n+1))
    # print(total_combs)
    # print("All Results", allCombos)
    # with open('pages/api/python/allCombos.json', 'w') as f:
    #     json.dump(allCombos, f, cls=DecimalEncoder, indent=4)
    # for combo in allCombos:
        # print(combo)
    
    
        
    repack_attempts = 0
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
        
    # if(results.bin)
    # print(leftItems)
    # print(results)
    # for r in results:
    #     if not r["bin"]["bFitEverything"]:
    #         print("nn")
    
    with open('pages/api/python/output.json', 'w') as f:
        json.dump(results, f, cls=DecimalEncoder, indent=4)
    with open('pages/api/python/multioutput.json', 'w') as f:
        json.dump(all_results, f, cls=DecimalEncoder, indent=4)