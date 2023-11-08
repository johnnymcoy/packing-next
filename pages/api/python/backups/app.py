from flask import Flask, jsonify, request
from py3dbp import Packer, Bin, Item
from flask_cors import CORS
import json
from py3dbp.constants import RotationType

app = Flask(__name__)
CORS(app)
CORS(app, origins=["http://localhost:3000"])
@app.route('/pack', methods=['POST'])
def pack_items():
    
    repack_attempts = 0
    # data = request.json
    data = json.loads(request.data)
    # packing logic
    packer = Packer()
    packer.bins = []
    packer.items = []
    # print(data)
    orders = data.get('orders', []);
    packages = data.get('packages', []);
    
    for package in packages:
        name = package.get('name', 'default-bin')
        width = float(package.get('width', 0))
        height = float(package.get('height', 0))
        depth = float(package.get('depth', 0))
        weight = float(package.get('weight', 0))
        packer.add_bin(Bin(name, width, height, depth, weight))
    
    # add an item for each order #check data.orders
    for order in orders:
        name = order.get('name', 'default-name')
        width = float(order.get('width', 0))
        height = float(order.get('height', 0))
        depth = float(order.get('depth', 0))
        weight = float(order.get('weight', 0))
        amount = int(order.get('amount', 1))
        for _ in range(amount):
            packer.add_item(Item(name, width, height, depth, weight))

    
    # Packing => into repacking if the orders don't fit
    def pack_orders(packer, orders):    
        nonlocal repack_attempts
        # Clear previous items
        packer.items = []
        # Add new items to the packer
        for order in orders: 
            name = order.get('name', 'default-name')
            width = float(order.get('width', 0))
            height = float(order.get('height', 0))
            depth = float(order.get('depth', 0))
            weight = float(order.get('weight', 0))
            amount = int(order.get('amount', 1))
            for _ in range(amount):
                packer.add_item(Item(name, width, height, depth, weight))
        
        packer.pack()
        
    
    
    # pack_orders(packer, orders)
    
    packer.pack()


    results = []
    
    bins_used = 0
    
    for b in packer.bins:
        print(b)
        # Check if the bin has items in it
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
                # "leftoverItems": b.unfitted_items if len(b.unfitted_items) != 0 else []                
        },
            "items": items
        })
        
    return jsonify(results)



if __name__ == '__main__':
    app.run(debug=True)
    
    