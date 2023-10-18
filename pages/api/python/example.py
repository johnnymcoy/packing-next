from py3dbp import Packer, Bin, Item

packer = Packer()

packer.add_bin(Bin('small-envelope', 11.5, 6.125, 0.25, 10))
packer.add_bin(Bin('large-envelope', 15.0, 12.0, 0.75, 15))
packer.add_bin(Bin('small-box', 8.625, 5.375, 1.625, 70.0))
packer.add_bin(Bin('medium-box', 11.0, 8.5, 5.5, 70.0))
packer.add_bin(Bin('medium-2-box', 13.625, 11.875, 3.375, 70.0))
packer.add_bin(Bin('large-box', 12.0, 12.0, 5.5, 70.0))
packer.add_bin(Bin('large-2-box', 23.6875, 11.75, 3.0, 70.0))

# class Item(
#     name: Any,
#     width: Any,
#     height: Any,
#     depth: Any,
#     weight: Any,
#     partno: Any,
#     typeof: Any,
#     priority: Any,
#     loadbear: Any,
#     upsidedown: bool = False,
#     color: str = 'red'
# )

packer.add_item(Item('50g [powder 1]', 3.9370, 1.9685, 1.9685, 1, "testName", "cube", 1, 100, True, "red"))
packer.add_item(Item('50g [powder 2]', 3.9370, 1.9685, 1.9685, 2, "testName", "cube", 1, 100, True, "red"))
packer.add_item(Item('50g [powder 3]', 3.9370, 1.9685, 1.9685, 3, "testName", "cube", 1, 100, True, "red"))
packer.add_item(Item('250g [powder 4]', 7.8740, 3.9370, 1.9685, 4, "testName", "cube", 1, 100, True, "red"))
packer.add_item(Item('250g [powder 5]', 7.8740, 3.9370, 1.9685, 5, "testName", "cube", 1, 100, True, "red"))
packer.add_item(Item('250g [powder 6]', 7.8740, 3.9370, 1.9685, 6, "testName", "cube", 1, 100, True, "red"))
packer.add_item(Item('250g [powder 7]', 7.8740, 3.9370, 1.9685, 7, "testName", "cube", 1, 100, True, "red"))
packer.add_item(Item('250g [powder 8]', 7.8740, 3.9370, 1.9685, 8, "testName", "cube", 1, 100, True, "red"))
packer.add_item(Item('250g [powder 9]', 7.8740, 3.9370, 1.9685, 9, "testName", "cube", 1, 100, True, "red"))

packer.pack()

for bin in packer.bins:
    print(":::::::::::", bin.string())

    print("FITTED ITEMS:")
    for item in bin.items:
        print("====> ", item.string())

    print("UNFITTED ITEMS:")
    for item in bin.unfitted_items:
        print("====> ", item.string())

    print("***************************************************")
    print("***************************************************")
