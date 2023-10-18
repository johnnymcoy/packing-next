from py3dbp import Packer, Bin, Item, Painter
import time
start = time.time()

'''

This example is used to demonstrate the mixed packing of cube and cylinder.

'''

# init packing function
packer = Packer()
#  init bin
box = Bin('example1', 5.6875, 10.75, 15.0, 70.0, "example")
packer.add_bin(box)

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
#  add item
packer.add_item(Item('50g [powder 1]', 2, 2, 4, 1,"test 1", "cube",1,100,True,'red'))
packer.add_item(Item('50g [powder 2]', 2, 2, 4, 2,"test 2", "cube",1,100,True,'blue'))
packer.add_item(Item('50g [powder 3]', 2, 2, 4, 2,"test 3", "cube",1,100,True,'gray'))
packer.add_item(Item('50g [powder 4]', 2, 2, 4, 3,"test 4", "cube",1,100,True,'orange'))
packer.add_item(Item('50g [powder 5]', 2, 2, 4, 3,"test 5", "cylinder",1,100,True,'lawngreen'))
packer.add_item(Item('50g [powder 6]', 2, 2, 4, 3,"test 6", "cylinder",1,100,True,'purple'))
packer.add_item(Item('50g [powder 7]', 1, 1, 5, 3,"test 7", "cylinder",1,100,True,'yellow'))
packer.add_item(Item('250g [powder 8]', 4, 4, 2, 4,"test 8", "cylinder",1,100,True,'pink'))
packer.add_item(Item('250g [powder 9]', 4, 4, 2, 5,"test 9", "cylinder",1,100,True,'brown'))
packer.add_item(Item('250g [powder 10]', 4, 4, 2, 6,"test 10", "cube",1,100,True,'cyan'))
packer.add_item(Item('250g [powder 11]', 4, 4, 2, 7,"test 11", "cylinder",1,100,True,'olive'))
packer.add_item(Item('250g [powder 12]', 4, 4, 2, 8,"test 12", "cylinder",1,100,True,'darkgreen'))
packer.add_item(Item('250g [powder 13]', 4, 4, 2, 9,"test 13", "cube",1,100,True,'orange'))

# calculate packing 
packer.pack(bigger_first=True, distribute_items=False, fix_point=True, check_stable=True,support_surface_ratio=0.75,number_of_decimals=0)

# print result
b = packer.bins[0]
volume = b.width * b.height * b.depth
print(":::::::::::", b.string())

print("FITTED ITEMS:")
volume_t = 0
volume_f = 0
unfitted_name = ''
for item in b.items:
    print("partno : ",item.partno)
    print("color : ",item.color)
    print("position : ",item.position)
    print("rotation type : ",item.rotation_type)
    print("W*H*D : ",str(item.width) +'*'+ str(item.height) +'*'+ str(item.depth))
    print("volume : ",float(item.width) * float(item.height) * float(item.depth))
    print("weight : ",float(item.weight))
    volume_t += float(item.width) * float(item.height) * float(item.depth)
    print("***************************************************")
print("***************************************************")
print("UNFITTED ITEMS:")
for item in b.unfitted_items:
    print("partno : ",item.partno)
    print("color : ",item.color)
    print("W*H*D : ",str(item.width) +'*'+ str(item.height) +'*'+ str(item.depth))
    print("volume : ",float(item.width) * float(item.height) * float(item.depth))
    print("weight : ",float(item.weight))
    volume_f += float(item.width) * float(item.height) * float(item.depth)
    unfitted_name += '{},'.format(item.partno)
    print("***************************************************")
print("***************************************************")
print('space utilization : {}%'.format(round(volume_t / float(volume) * 100 ,2)))
print('residual volumn : ', float(volume) - volume_t )
print('unpack item : ',unfitted_name)
print('unpack item volumn : ',volume_f)
print("gravity distribution : ",b.gravity)
stop = time.time()
print('used time : ',stop - start)

# draw results
painter = Painter(b)
fig = painter.plot_box_and_items(
    title=b.partno,
    alpha=0.2,
    write_num=False,
    fontsize=5
)
fig.show()